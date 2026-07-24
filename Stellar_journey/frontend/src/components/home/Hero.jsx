import Container from "../common/Container";

import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:py-22">
      <HeroBackground />

      <Container>
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <HeroContent />
          <HeroPreview />
        </div>
      </Container>
    </section>
  );
}