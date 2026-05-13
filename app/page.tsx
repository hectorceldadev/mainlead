import { HeaderHome, HeroHome } from "./components";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeaderHome />
      <HeroHome />
    </div>
  )
}
