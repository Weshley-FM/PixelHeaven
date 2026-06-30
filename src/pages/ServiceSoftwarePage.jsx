import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ServiceHero from '../components/services/ServiceHero';
import ServiceSoftwarePersuade from '../components/services/ServiceSoftwarePersuade';
import ServiceSoftwareFeatures from '../components/services/ServiceSoftwareFeatures';
import ServiceSoftwareTech from '../components/services/ServiceSoftwareTech';
import ServiceSoftwareProcess from '../components/services/ServiceSoftwareProcess';
import ProductsA from '../components/ProductsA';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import pb from '../pb';

export default function ServiceSoftwarePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      <main>
        <ServiceHero 
          title="Custom Software"
          subtitle="Service"
          description="Tailored applications designed specifically for your business logic."
        />
        
        {/* 2. Persuade Section */}
        <ServiceSoftwarePersuade />
        
        {/* 3. Step by step (How we work) */}
        <ServiceSoftwareProcess />
        
        {/* 4. Features */}
        <ServiceSoftwareFeatures />
        
        {/* 5. Tech Stack */}
        <ServiceSoftwareTech />
        
        {/* 6. Portfolio/Case Studies */}
        <ProductsA 
          title="Case Studies."
          description="We engineer bespoke solutions for complex business challenges. Here are a few examples of software we've successfully deployed."
        />
        
        {/* 7. Testimonials */}
        <Testimonials />
        
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
