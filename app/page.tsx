import HeroSection from "@/components/HeroSection";
import SupSection from "@/components/SupSection";
import PipelineSection from "@/components/PipelineSection";
import PlatformSection from "@/components/PlatformSection";
import RDSection from "@/components/RDSection";
import NewsSection from "@/components/NewsSection";
import FooterSection from "@/components/FooterSection";
import SectionScrollManager from "@/components/SectionScrollManager";

export default function Home() {
  return (
    <div id="scroll-root">
      <SectionScrollManager />
      <HeroSection />
      <SupSection />
      <PipelineSection />
      <PlatformSection />
      <RDSection />
      <NewsSection />
      <FooterSection />
    </div>
  );
}
