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
    <main style={{ position: "relative", background: "#0A0A0A", minHeight: "100vh" }}>
      <StarField />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden"
      }}>
        {/* Top left purple glow */}
        <div style={{
          position: "absolute", top: "-10%", left: "-10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: "floatGlow1 8s ease-in-out infinite"
        }} />

        {/* Top right violet glow */}
        <div style={{
          position: "absolute", top: "5%", right: "-5%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          filter: "blur(25px)",
          animation: "floatGlow2 10s ease-in-out infinite"
        }} />

        {/* Center deep glow */}
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%)",
          width: 900, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(91,33,182,0.25) 0%, transparent 70%)",
          filter: "blur(30px)",
          animation: "floatGlow3 12s ease-in-out infinite"
        }} />

        {/* Bottom left glow */}
        <div style={{
          position: "absolute", bottom: "10%", left: "5%",
          width: 550, height: 550, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          filter: "blur(25px)",
          animation: "floatGlow1 9s ease-in-out infinite reverse"
        }} />

        {/* Bottom right glow */}
        <div style={{
          position: "absolute", bottom: "5%", right: "0%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: "floatGlow2 11s ease-in-out infinite reverse"
        }} />
      </div>
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
