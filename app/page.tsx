import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/Hero";
import OverviewSection from "@/components/sections/Overview";
import ActivitiesSection from "@/components/sections/Activities";

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <HeroSection />
        <OverviewSection />
        <ActivitiesSection />
      </main>
      <footer>
        <div>Footer</div>
      </footer>
    </div>
  );
}
