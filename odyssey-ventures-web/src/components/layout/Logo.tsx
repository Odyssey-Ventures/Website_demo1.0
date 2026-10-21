import Image from "next/image";
import Link from "next/link";
import { logo } from "@/config/images";
import { localizedHref, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LogoProps {
  lang: Locale;
  /** Accessible name of the link, e.g. "Odyssey Ventures, home". */
  label: string;
  /** Set on the Header logo so it loads first. */
  priority?: boolean;
  className?: string;
}

/**
 * Official logo. The image already contains the brand name, so no extra text is shown.
 * Use on white or light backgrounds only (the lettering is black).
 */
export function Logo({ lang, label, priority, className }: LogoProps) {
  return (
    <Link href={localizedHref(lang)} aria-label={label} className={cn("inline-flex shrink-0 items-center rounded py-2", className)}>
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes="(min-width: 768px) 182px, 146px"
        className="h-8 w-auto md:h-10"
      />
    </Link>
  );
}
