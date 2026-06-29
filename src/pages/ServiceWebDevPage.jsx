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
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch hero data from PB
    pb.collection('page_webdev_hero').getFirstListItem('')
      .then(record => setHeroData(record))
      .catch(err => console.error("Error fetching web dev hero:", err));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      <main>
        {heroData ? (
          <ServiceHero 
            title={heroData.title}
            subtitle="WEB DEV"
            description={heroData.description}
          />
        ) : (
          <ServiceHero 
            title="Website Development"
            subtitle="Service"
            description="Loading..."
          />
        )}
        
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
