import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay ensures the browser paints the initial invisible state before animating
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className={`relative z-[100] flex items-center justify-between px-8 py-4 max-w-7xl mx-auto transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      mounted ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
    }`}>
      {/* Logo */}
      <div className="flex items-center gap-4 z-10">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Abstract geometric edgy logo */}
          <rect x="4" y="4" width="10" height="10" stroke="#111827" strokeWidth="2"/>
          <rect x="18" y="18" width="10" height="10" stroke="#111827" strokeWidth="2"/>
          <path d="M14 14L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          <path d="M23 9L9 23" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="font-light text-2xl tracking-widest text-slate-900">
          PixelHeaven
        </span>
      </div>

      {/* Links (Absolute Center) */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12">
        <Link to="/" className="group flex flex-col text-slate-500 hover:text-slate-900 font-normal transition-colors">
          <span>Home</span>
          <span className="h-[1px] w-full bg-slate-900 origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left mt-1"></span>
        </Link>
        <Link to="/about" className="group flex flex-col text-slate-500 hover:text-slate-900 font-normal transition-colors">
          <span>About</span>
          <span className="h-[1px] w-full bg-slate-900 origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left mt-1"></span>
        </Link>
        <div className="group relative flex flex-col text-slate-500 hover:text-slate-900 font-normal transition-colors cursor-pointer">
          <div className="flex items-center gap-1">
            <span>Service</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-[2px] transition-transform duration-300 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="h-[1px] w-full bg-slate-900 origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left mt-1"></span>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
            <div className="w-[280px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-3 flex flex-col gap-1">
              <Link to="/services/ui-ux" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-3.879a3 3 0 10-4.242-4.242l-3.879 3.879a15.995 15.995 0 00-4.648 4.764m3.879-3.879l3.42 3.42m0 0l-1.414 1.414" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out">UI/UX Design</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out">Intuitive and modern interfaces</p>
                </div>
              </Link>

              <Link to="/services/web-dev" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out">Website Development</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out">Scalable web solutions</p>
                </div>
              </Link>

              <Link to="/services/custom-software" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out">Custom Software</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out">Tailored to your business</p>
                </div>
              </Link>

              <Link to="/services/social-media" className="group/item flex items-center gap-4 px-3 py-3 hover:bg-slate-50 rounded-xl transition-all duration-300 ease-out">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 group-hover/item:bg-slate-900 transition-colors duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 group-hover/item:text-white transition-colors duration-300 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-slate-900 font-medium text-sm transition-colors duration-300 ease-out">Social Media</h3>
                  <p className="text-slate-500 text-xs mt-0.5 transition-colors duration-300 ease-out">Engaging digital presence</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="z-10 flex justify-end min-w-[150px]">
        <Link to="/contact" className="group relative block h-11 w-36 cursor-pointer">
          {/* Black Background Pill */}
          <div className="absolute top-0 left-0 h-full w-full bg-slate-900 rounded-full transition-all duration-500 ease-out group-hover:w-11 group-hover:left-[100px] shadow-sm"></div>
          
          {/* White Circle */}
          <div className="absolute top-1 left-1 z-20 bg-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-500 ease-out group-hover:left-[104px] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-900 transition-transform duration-500 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          {/* Text */}
          <div className="absolute top-0 left-10 h-full w-[104px] z-10 flex items-center justify-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-x-4">
            <span className="text-white font-light tracking-wide text-sm">Contact</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
