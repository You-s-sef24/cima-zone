import HeroSection from "./Components/HeroSection";
import NowPlayingSection from "./Components/NowPlayingSection";
import PopularTVShowsSectionSection from "./Components/PopularTVShowsSection";
import TopRatedSection from "./Components/TopRatedSection";
import TrendingSection from "./Components/TrendingSection";
import UpcomingSection from "./Components/UpcomingSection";

export default function Home() {
  return (
    <div className="p-2 bg-black text-white">
      <HeroSection />
      <TrendingSection />
      <PopularTVShowsSectionSection />
      <NowPlayingSection />
      <TopRatedSection />
      <UpcomingSection />
    </div>
  );
}
