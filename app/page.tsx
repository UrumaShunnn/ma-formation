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

const sectionStyle = { position: "relative" as const, zIndex: 2 };

export default function Home() {
  return (
    <main style={{ position: "relative", background: "transparent" }}>
      <StarField />
      <div style={{ position: "fixed", zIndex: 100, top: 0, left: 0, right: 0 }}>
        <Navbar />
      </div>
      <div style={sectionStyle}><Hero /></div>
      <div style={sectionStyle}><Stats /></div>
      <div style={sectionStyle}><Features /></div>
      <div style={sectionStyle}><Testimonials /></div>
      <div style={sectionStyle}><Program /></div>
      <div style={sectionStyle}><Team /></div>
      <div style={sectionStyle}><Pricing /></div>
      <div style={sectionStyle}><FAQ /></div>
      <div style={sectionStyle}><Footer /></div>
    </main>
  );
}
