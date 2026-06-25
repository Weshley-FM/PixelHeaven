import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SideNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 200px (well past the top nav)
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-x-0' : 'translate-x-40'
      }`}
    >
      {/* The Bubble */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] rounded-full py-6 px-3 flex flex-col items-center gap-6 pointer-events-auto">
        
        {/* Abstract Minimal Logo */}
        <Link to="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-10 h-10 bg-slate-100 rounded-full flex justify-center items-center mb-2 group shadow-sm">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="transform group-hover:scale-110 transition-transform text-slate-900">
            <rect x="4" y="4" width="10" height="10" stroke="currentColor" strokeWidth="3"/>
            <rect x="18" y="18" width="10" height="10" stroke="currentColor" strokeWidth="3"/>
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M23 9L9 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </Link>

        {/* Icon Links */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-slate-400 hover:text-slate-900 transition-colors group relative flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-100"
          aria-label="Back to Top"
        >
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            Home
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </button>

        <Link to="/about" className="text-slate-400 hover:text-slate-900 transition-colors group relative flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-100" aria-label="About">
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            About
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </Link>
        
        <Link to="/services" className="text-slate-400 hover:text-slate-900 transition-colors group relative flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-100" aria-label="Services">
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            Services
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        </Link>
        
        <Link to="/contact" className="text-slate-400 hover:text-slate-900 transition-colors group relative flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-100" aria-label="Contact">
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            Contact
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.909A2.25 2.25 0 012.25 6.993V6.75m19.5 0v.243m0 0V6.75" />
          </svg>
        </Link>

      </div>
    </div>
  )
}
