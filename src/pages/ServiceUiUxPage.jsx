import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ServiceHero from '../components/services/ServiceHero';
import ServiceUiUxSolutions from '../components/services/ServiceUiUxSolutions';
import ServiceUiUxProducts from '../components/services/ServiceUiUxProducts';
import ServiceUiUxProcess from '../components/services/ServiceUiUxProcess';
import Projects from '../components/Projects';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function ServiceUiUxPage() {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      <main>
        <ServiceHero 
          title="UI/UX Design"
          subtitle="Service"
          description="We craft intuitive, engaging, and beautiful digital experiences that perfectly balance user needs with your business objectives."
        />
        
        <ServiceUiUxSolutions />
        <ServiceUiUxProcess />
        <ServiceUiUxProducts />
        
        {/* We use the Projects component for the Portfolio section */}
        <div className="bg-white">
           <Projects />
        </div>

        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
