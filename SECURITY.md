# Security

## Built into the app

- Strict security headers on every response: Content-Security-Policy, HSTS (preload-ready),
  X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP (`next.config.ts`).
- The CSP allows scripts only from this origin and images only from this origin and Amazon's
  image CDN. It blocks framing, plugins, and form posts to other origins.
- No database, user accounts, or stored personal data, which leaves little to attack.
- API credentials are read server-side only (`server-only` guard) and are never bundled to the client.
- Contact form: server-side validation, length limits, control-character stripping, honeypot,
  time trap, per-IP rate limit, plain-text email only. Next.js server actions reject
  cross-origin posts.
- Structured data is serialised with `<` escaped. Search input is reduced to `[a-z0-9-]` before use.
- Outbound Amazon links use `rel="sponsored nofollow noopener"`.

## Do these at deployment

1. Store secrets only in your host's environment variables. Never commit `.env.local`.
2. Rotate the Amazon credential secret if it has ever been shared in chat, email, or a ticket.
3. On Vercel, enable the Firewall with a rate-limit rule on `POST /contact` and turn on
   Bot Protection. (With Cloudflare, use equivalent WAF rules instead.)
4. Enable two-factor authentication on GitHub, Vercel, Amazon Associates, and your domain registrar.
5. Turn on registrar lock for ClearanceStream.com. Once HTTPS has been stable, submit the
   domain to hstspreload.org.
6. Keep dependencies patched: run `npm audit` and update Next.js regularly.
