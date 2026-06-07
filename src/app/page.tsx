import { LandingNav } from '@/components/landing/nav';
import { LandingHero } from '@/components/landing/hero';
import { LandingFeatures } from '@/components/landing/features';
import { LandingAISection } from '@/components/landing/ai-section';
import { LandingTestimonials } from '@/components/landing/testimonials';
import { LandingPricing } from '@/components/landing/pricing';
import { LandingFAQ } from '@/components/landing/faq';
import { LandingFooter } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingAISection />
        <LandingTestimonials />
        <LandingPricing />
        <LandingFAQ />
      </main>
      <LandingFooter />
    </>
  );
}
