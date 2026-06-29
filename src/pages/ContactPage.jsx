import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideNav from '../components/SideNav';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <SideNav />
      <div className="flex-grow">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
