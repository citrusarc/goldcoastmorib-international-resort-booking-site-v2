import HeroSection from "@/components/sections/Hero";
import OverviewSection from "@/components/sections/Overview";
import HighlightSection from "@/components/sections/Highlight";
import GallerySection from "@/components/sections/Gallery";
import ImageDividerSection from "@/components/sections/ImageDivider";
import FacilitiesSection from "@/components/sections/Facilities";
import ReviewSection from "@/components/sections/Review";
import CTASection from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <HighlightSection />
      <GallerySection />
      <ImageDividerSection />
      <FacilitiesSection />
      <ReviewSection />
      <CTASection />
    </>
  );
}
