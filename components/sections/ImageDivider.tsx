import Image from "next/image";

export default function ImageDividerSection() {
  return (
    <section className="relative w-full h-[560px] sm:h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/Images/hero-banner-1.png"
          alt="Gold Coast Morib International Resort Image Divider"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
