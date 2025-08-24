import Image from "next/image";

export default function ImageDividerSection() {
  return (
    <section
      className="w-full h-[560px] sm:h-[800px] bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/Images/hero-banner-1.png')" }}
    ></section>
  );
}
