import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ProductsA from '../components/ProductsA';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Engagement from '../components/Engagement';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <ProductsA />
      <Services />
      <Projects />
      <Engagement />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
