import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Stats from "@/components/ui/Stats";
import Features from "@/components/ui/Features";
import Testimonials from "@/components/ui/Testimonials";
import Program from "@/components/ui/Program";
import Team from "@/components/ui/Team";
import Pricing from "@/components/ui/Pricing";
import FAQ from "@/components/ui/FAQ";
import Footer from "@/components/ui/Footer";
import StarField from "@/components/ui/StarField";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "transparent", position: "relative", zIndex: 1 }}>
      <StarField />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Program />
      <Team />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
