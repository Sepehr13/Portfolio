import Footer from "@/components/footer/footer";
import { HeroSection } from "@/components/hero-section/hero";
import MyWorkSection from "@/components/my-work-section/my-work-section";

export default function Home() {
  return (
    <main className="h-[calc(100vh-4rem)] mt-[calc(4rem)]">
      <HeroSection />
      <MyWorkSection />
      <Footer />
    </main>
  );
}
