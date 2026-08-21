import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export function ProjectPreview({ image, alt }: { image: string; alt: string }) {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="rounded-[12px] border border-[#dedede] bg-[#f3f3f3] p-[16px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] sm:p-[28px]"
    >
      <div className="relative h-full w-full origin-center overflow-hidden rounded-[10px] bg-white transition-transform duration-300 ease-out group-hover:z-10 group-hover:scale-[1.015]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 964px"
          className="object-cover object-top"
        />
      </div>
    </AspectRatio>
  );
}
