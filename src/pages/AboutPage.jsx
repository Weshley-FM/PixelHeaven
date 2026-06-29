import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import AboutUsHero from '../components/AboutUsHero';
import AboutUsTimeline from '../components/AboutUsTimeline';
import AboutUsWhy from '../components/AboutUsWhy';
import AboutUsTeam from '../components/AboutUsTeam';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export default function AboutPage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Navbar />
      <SideNav />
      
      <main>
        <AboutUsHero />
        <AboutUsTimeline />
        <AboutUsWhy />
        <AboutUsTeam />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
