import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { PageHeader } from "@/components/PageHeader";
import { safeNext } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Log in",
  description: "Log in to ClearanceStream to browse the full list of gaming PC deals and promotions.",
  path: "/login",
  noindex: true,
});

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const supabase = await createClient();
  if (supabase) {
    const { data } = await supabase.auth.getClaims();
    if (data?.claims?.sub) redirect(next);
  }

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Log in", path: "/login" }]}
        title="Log in"
        lede="A free account opens the full deals list, today’s promotions, and coupon pages. Product pages linked from search stay available without signing in."
      />
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 480 }}>
          {params.error === "confirm" ? (
            <p className="form-status err" role="alert">
              That confirmation link was not accepted. Request a new one by signing up again, or log in if you already confirmed.
            </p>
          ) : null}
          <AuthForm mode="login" next={next} />
        </div>
      </section>
    </>
  );
}
