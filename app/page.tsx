import { HeaderHome, HeroHome } from "./components";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="flex flex-col justify-center items-center relative z-10">
        <HeaderHome />
        <HeroHome />
      </div>
    </div>
  )
}