import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { PageHeader } from "@/components/PageHeader";
import { safeNext } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Create an account",
  description: "Create a free ClearanceStream account to browse gaming PC deals and promotions.",
  path: "/signup",
  noindex: true,
});

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  const supabase = await createClient();
  if (supabase) {
    const { data } = await supabase.auth.getClaims();
    if (data?.claims?.sub) redirect(next);
  }

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Sign up", path: "/signup" }]}
        title="Create a free account"
        lede="Sign up with your email to open the full deals and promotions lists. It is free, and buying through our links does not add a fee."
      />
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 480 }}>
          <AuthForm mode="signup" next={next} />
        </div>
      </section>
    </>
  );
}
