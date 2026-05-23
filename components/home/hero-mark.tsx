import Image from "next/image";
import logoSrc from "@/public/logos/costa-stacked.png";

export function HeroMark() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <Image
        src={logoSrc}
        alt=""
        priority
        sizes="(min-width: 1024px) 560px, 85vw"
        placeholder="empty"
        className="h-auto w-full select-none"
      />
    </div>
  );
}
