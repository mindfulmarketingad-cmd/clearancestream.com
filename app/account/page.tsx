import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/login/actions";
import { PageHeader } from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { authConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Your account",
  description: "Your ClearanceStream account.",
  path: "/account",
  noindex: true,
});

export default async function AccountPage() {
  if (!authConfigured()) {
    return (
      <>
        <PageHeader
          crumbs={[{ name: "Account", path: "/account" }]}
          title="Account"
          lede="Sign-in is wired up and waiting for the Supabase project URL and publishable key."
        />
        <section className="section-tight">
          <div className="container" style={{ maxWidth: 640 }}>
            <p>
              Until those are set, the deals and promotions pages stay public. After they are set, logging in is required
              for the full deals list, today’s promotions, and coupons.
            </p>
            <p style={{ marginTop: 16 }}>
              <Link href="/login" className="btn btn-primary">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </>
    );
  }

  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getClaims() : { data: null };
  const email = typeof data?.claims?.email === "string" ? data.claims.email : null;
  if (!email) redirect("/login?next=/account");

  return (
    <>
      <PageHeader crumbs={[{ name: "Account", path: "/account" }]} title="Your account" lede={email} />
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 640 }}>
          <p>
            <Link href="/deals" className="text-link">
              Browse all deals
            </Link>
          </p>
          <form action={signOut} style={{ marginTop: 20 }}>
            <button type="submit" className="btn btn-secondary">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
