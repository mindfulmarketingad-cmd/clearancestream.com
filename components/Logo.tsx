import Link from "next/link";

export function LogoMark(props: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="8" fill="#1f4fd6" />
      <path d="M7 11 L13.5 17.5 L17.5 13.5 L24.5 20.5" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.5 14 V20.5 H18" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="ClearanceStream home">
      <LogoMark />
      <span>
        Clearance<b>Stream</b>
      </span>
    </Link>
  );
}
