import "server-only";

/**
 * Minimal client for the Amazon Creators API, the successor to PA-API 5.
 * Auth is OAuth2 client credentials; credential versions 2.x use Cognito,
 * 3.x use Login with Amazon (LWA).
 */

const API_HOST = "https://creatorsapi.amazon";
const DEFAULT_PARTNER_TAG = "mindfulmar026-20";

const TOKEN_ENDPOINTS: Record<string, string> = {
  "2.1": "https://creatorsapi.auth.us-east-1.amazoncognito.com/oauth2/token",
  "2.2": "https://creatorsapi.auth.eu-south-2.amazoncognito.com/oauth2/token",
  "2.3": "https://creatorsapi.auth.us-west-2.amazoncognito.com/oauth2/token",
  "3.1": "https://api.amazon.com/auth/o2/token",
  "3.2": "https://api.amazon.co.uk/auth/o2/token",
  "3.3": "https://api.amazon.co.jp/auth/o2/token",
};

export const ITEM_RESOURCES = [
  "images.primary.large",
  "images.variants.large",
  "itemInfo.title",
  "itemInfo.byLineInfo",
  "itemInfo.features",
  "itemInfo.productInfo",
  "itemInfo.technicalInfo",
  "itemInfo.classifications",
  "customerReviews.count",
  "customerReviews.starRating",
  "offersV2.listings.availability",
  "offersV2.listings.condition",
  "offersV2.listings.dealDetails",
  "offersV2.listings.isBuyBoxWinner",
  "offersV2.listings.merchantInfo",
  "offersV2.listings.price",
  "offersV2.listings.type",
] as const;

type Config = {
  credentialId: string;
  credentialSecret: string;
  version: string;
  partnerTag: string;
  marketplace: string;
};

export function getConfig(): Config | null {
  const credentialId = process.env.AMAZON_CREDENTIAL_ID?.trim();
  const credentialSecret = process.env.AMAZON_CREDENTIAL_SECRET?.trim();
  // Associates tracking ID. Public by nature (it appears in every affiliate link).
  const partnerTag = process.env.AMAZON_PARTNER_TAG?.trim() || DEFAULT_PARTNER_TAG;
  if (!credentialId || !credentialSecret) return null;
  return {
    credentialId,
    credentialSecret,
    partnerTag,
    version: process.env.AMAZON_CREDENTIAL_VERSION?.trim() || "3.1",
    marketplace: process.env.AMAZON_MARKETPLACE?.trim() || "www.amazon.com",
  };
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(config: Config): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const endpoint = TOKEN_ENDPOINTS[config.version];
  if (!endpoint) throw new Error(`Unsupported AMAZON_CREDENTIAL_VERSION ${config.version}`);

  const isLwa = config.version.startsWith("3.");
  const fields = {
    grant_type: "client_credentials",
    client_id: config.credentialId,
    client_secret: config.credentialSecret,
    scope: isLwa ? "creatorsapi::default" : "creatorsapi/default",
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": isLwa ? "application/json" : "application/x-www-form-urlencoded" },
    body: isLwa ? JSON.stringify(fields) : new URLSearchParams(fields).toString(),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Creators API token request failed: ${res.status}`);

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Creators API token response missing access_token");

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + ((data.expires_in ?? 3600) - 60) * 1000,
  };
  return cachedToken.value;
}

// The Creators API starts eligible accounts at one request per second (8,640/day).
// Calls from a single server instance are serialised with a gap between them;
// 429s caused by other instances running in parallel are retried with backoff.
const MIN_GAP_MS = 1200;
const MAX_THROTTLE_RETRIES = 4;
let queue: Promise<unknown> = Promise.resolve();
let lastCall = 0;

function throttle<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const wait = lastCall + MIN_GAP_MS - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastCall = Date.now();
    return fn();
  });
  queue = run.catch(() => undefined);
  return run;
}

export class CreatorsApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function call<T>(operation: "searchItems" | "getItems", body: Record<string, unknown>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await callOnce<T>(operation, body);
    } catch (err) {
      if (!(err instanceof CreatorsApiError) || err.status !== 429 || attempt >= MAX_THROTTLE_RETRIES) throw err;
      // Exponential backoff with jitter so parallel instances spread out: ~2s, 4s, 8s, 16s.
      await sleep(2000 * 2 ** attempt + Math.random() * 1000);
    }
  }
}

async function callOnce<T>(operation: "searchItems" | "getItems", body: Record<string, unknown>): Promise<T> {
  const config = getConfig();
  if (!config) throw new Error("Amazon Creators API is not configured");

  return throttle(async () => {
    const token = await getAccessToken(config);
    const res = await fetch(`${API_HOST}/catalog/v1/${operation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: config.version.startsWith("3.")
          ? `Bearer ${token}`
          : `Bearer ${token}, Version ${config.version}`,
        "x-marketplace": config.marketplace,
      },
      body: JSON.stringify({ partnerTag: config.partnerTag, ...body }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (res.status === 401) cachedToken = null;
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      throw new CreatorsApiError(`Creators API ${operation} failed: ${res.status} ${detail}`, res.status);
    }
    return (await res.json()) as T;
  });
}

// ---- Response shapes (only the fields this site reads) ----

type Money = { amount?: number; currency?: string; displayAmount?: string };
type Display<T> = { displayValue?: T; label?: string };

export type ApiItem = {
  asin: string;
  detailPageURL?: string;
  images?: {
    primary?: { large?: { url: string; width: number; height: number } };
    variants?: { large?: { url: string; width: number; height: number } }[];
  };
  itemInfo?: {
    title?: Display<string>;
    byLineInfo?: { brand?: Display<string>; manufacturer?: Display<string> };
    features?: { displayValues?: string[] };
    classifications?: { productGroup?: Display<string>; binding?: Display<string> };
    technicalInfo?: Record<string, unknown>;
    productInfo?: Record<string, unknown>;
  };
  customerReviews?: { count?: number; starRating?: { value?: number } };
  offersV2?: {
    listings?: {
      isBuyBoxWinner?: boolean;
      type?: string;
      condition?: { value?: string };
      availability?: { type?: string; message?: string };
      merchantInfo?: { name?: string };
      dealDetails?: { accessType?: string; badge?: string; endTime?: string; percentClaimed?: number };
      price?: {
        money?: Money;
        savings?: { money?: Money; percentage?: number };
        savingBasis?: { money?: Money; savingBasisType?: string; savingBasisTypeLabel?: string };
      };
    }[];
  };
};

export type SearchParams = {
  keywords: string;
  brand?: string;
  searchIndex?: string;
  itemCount?: number;
  itemPage?: number;
  minSavingPercent?: number;
  sortBy?: "Relevance" | "Featured" | "NewestArrivals" | "AvgCustomerReviews";
};

export async function searchItems(params: SearchParams): Promise<ApiItem[]> {
  const data = await call<{ searchResult?: { items?: ApiItem[] } }>("searchItems", {
    searchIndex: "Computers",
    itemCount: 10,
    ...params,
    resources: ITEM_RESOURCES,
  });
  return data.searchResult?.items ?? [];
}

export async function getItems(asins: string[]): Promise<ApiItem[]> {
  if (asins.length === 0) return [];
  const data = await call<{ itemsResult?: { items?: ApiItem[] } }>("getItems", {
    itemIds: asins.slice(0, 10),
    resources: ITEM_RESOURCES,
  });
  return data.itemsResult?.items ?? [];
}
