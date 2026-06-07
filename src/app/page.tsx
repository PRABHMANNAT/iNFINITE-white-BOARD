import { LandingNav } from '@/components/landing/nav';
import { LandingHero } from '@/components/landing/hero';
import { LandingFeatures } from '@/components/landing/features';
import { LandingAISection } from '@/components/landing/ai-section';
import { LandingPricing } from '@/components/landing/pricing';
import { LandingFooter } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingAISection />
        <LandingPricing />
      </main>
      <LandingFooter />
    </>
  );
}
