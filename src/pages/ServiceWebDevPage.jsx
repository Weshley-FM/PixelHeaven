import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ServiceHero from '../components/services/ServiceHero';
import ServiceWebDevFeatures from '../components/services/ServiceWebDevFeatures';
import ServiceWebDevProcess from '../components/services/ServiceWebDevProcess';
import ServiceWebDevPricing from '../components/services/ServiceWebDevPricing';
import ProductsA from '../components/ProductsA';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import pb from '../pb';

export default function ServiceWebDevPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      <main>
        <ServiceHero 
          title="Website Development"
          subtitle="Service"
          description="Blazing fast, responsive, and scalable web solutions."
        />
        
        <ServiceWebDevFeatures />
        
        <ProductsA />
        
        <ServiceWebDevPricing />
        <ServiceWebDevProcess />
        
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
