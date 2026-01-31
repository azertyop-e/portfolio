import { Hero } from "@/components/Home/Hero";
import { HorizontalProjects } from "@/components/Home/HorizontalProjects";
import { AboutSection } from "@/components/Home/AboutSection";
import { PlaygroundSection } from "@/components/Home/PlaygroundSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HorizontalProjects />
      <AboutSection />
      <PlaygroundSection />
    </>
  );
}
