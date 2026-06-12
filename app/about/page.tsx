import AboutNav from "@/components/AboutNav";
import AboutHeroSection from "@/components/AboutHeroSection";
import ScientificApproachSection from "@/components/ScientificApproachSection";
import FutureMessageSection from "@/components/FutureMessageSection";
import FooterSection from "@/components/FooterSection";

export default function AboutPage() {
  return (
    <div id="scroll-root">
      <AboutNav />
      <AboutHeroSection />
      <ScientificApproachSection />
      <FutureMessageSection />
      <FooterSection />
    </div>
  );
}
