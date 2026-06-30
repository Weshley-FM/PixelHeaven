import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideNav() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const sections = location.pathname === '/' 
    ? ['hero', 'about', 'products', 'services', 'contact']
    : ['about-hero', 'about-timeline', 'about-why', 'about-team'];

  const isHome = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 200px (well past the top nav)
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount to check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname === '/contact') {
    return null;
  }

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
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className={`group relative flex justify-center items-center w-10 h-10 rounded-full transition-colors ${isActive('/') ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
          aria-label="Home"
        >
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            Home
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>

        <Link to="/about" className={`group relative flex justify-center items-center w-10 h-10 rounded-full transition-colors ${isActive('/about') ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`} aria-label="About">
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            About
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </Link>
        <div className="group relative flex justify-center items-center">
          <Link to="/services/web-dev" className="text-slate-400 hover:text-slate-900 transition-colors flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-100" aria-label="Services">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </Link>
          
          {/* Side Popout Menu */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 pr-6 opacity-0 invisible translate-x-4 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-300 ease-out z-50">
            <div className="w-[280px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-3 flex flex-col gap-1">
              <Link to="/services/ui-ux" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out text-left">
                <div className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-3.879a3 3 0 10-4.242-4.242l-3.879 3.879a15.995 15.995 0 00-4.648 4.764m3.879-3.879l3.42 3.42m0 0l-1.414 1.414" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out m-0">UI/UX Design</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out m-0">Intuitive and modern interfaces</p>
                </div>
              </Link>
              <Link to="/services/web-dev" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out text-left">
                <div className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out m-0">Website Development</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out m-0">Scalable web solutions</p>
                </div>
              </Link>
              <Link to="/services/custom-software" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out text-left">
                <div className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out m-0">Custom Software</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out m-0">Tailored to your business</p>
                </div>
              </Link>
              <Link to="/services/social-media" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out text-left">
                <div className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out m-0">Social Media</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out m-0">Engaging digital presence</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <Link 
          to="/contact" 
          className={`group relative flex justify-center items-center w-10 h-10 rounded-full transition-colors ${isActive('/contact') ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`} 
          aria-label="Contact"
        >
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
