import Link from "next/link";

interface LogoProps {
  inverse?: boolean;
}

export function Logo({ inverse }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Odyssey Ventures, home">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill={inverse ? "#FFFFFF" : "#0B1F44"} />
        <path
          d="M8 22 C13 25 16 10 24 9"
          fill="none"
          stroke={inverse ? "#0B1F44" : "#FFFFFF"}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="9" r="2.6" fill={inverse ? "#0B1F44" : "#FFFFFF"} />
      </svg>
      <span className={`font-semibold tracking-tight text-xl tracking-tight ${inverse ? "text-white" : "text-navy"}`}>
        Odyssey Ventures
      </span>
    </Link>
  );
}
