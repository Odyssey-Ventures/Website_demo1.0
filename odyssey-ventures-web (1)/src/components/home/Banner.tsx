import Image from "next/image";
import { images } from "@/config/images";

export function Banner() {
  return (
    <section aria-hidden={images.banner.alt === "" ? true : undefined}>
      <Image
        src={images.banner.src}
        alt={images.banner.alt}
        width={images.banner.width}
        height={images.banner.height}
        sizes="100vw"
        className="h-[280px] w-full object-cover sm:h-[420px] lg:h-[520px]"
      />
    </section>
  );
}
