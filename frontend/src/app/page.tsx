'use client';

import HeroSection from '@/sections/HeroSection';
import ServicesSection from '@/sections/ServicesSection';
import AboutSection from '@/sections/AboutSection';
import ProductsSection from '@/sections/ProductsSection';
import WhyChooseUsSection from '@/sections/WhyChooseUsSection';
import EnquirySection from '@/sections/EnquirySection';
import ContactSection from '@/sections/ContactSection';
import TeamSection from '@/sections/teamsection';
import ExportProcessSection from '@/sections/ExportProcessSection';
import GlobalPresenceSection from '@/sections/GlobalPresenceSection';
import CertificationSection from '@/sections/CertificationSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProductsSection />
      <ExportProcessSection />
      <WhyChooseUsSection />
      <EnquirySection />
      <ContactSection />
      <TeamSection />
      <GlobalPresenceSection />
      <CertificationSection />
    </>
  );
}
