import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function ServiceSocialMediaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col selection:bg-slate-900 selection:text-white text-slate-900 relative">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full min-h-[calc(100vh-160px)] bg-gray-50 relative py-20">
        <div className="flex flex-col items-center justify-center relative z-10 w-full">
          
          {/* Laravel-style Minimalist Message */}
          <div className="flex items-center justify-center mb-12 relative z-10">
            <div className="pr-6 text-4xl font-light text-slate-400 border-r border-slate-300 tracking-widest">
              WIP
            </div>
            <div className="pl-6 text-2xl font-light text-slate-500 uppercase tracking-widest">
              Still Ongoing
            </div>
          </div>

          {/* Go Back Button */}
          <Link to="/" className="group relative inline-flex items-center gap-4 text-slate-900 z-10">
             <div className="w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500 shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-900 group-hover:text-white transition-colors duration-500 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l7.5-7.5M4.5 12l7.5 7.5" />
               </svg>
             </div>
             <span className="text-sm font-semibold tracking-widest uppercase transition-colors group-hover:text-slate-500">Return Home</span>
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}
