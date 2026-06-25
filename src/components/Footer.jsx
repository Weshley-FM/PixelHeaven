import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 md:pt-32 pb-0 border-t border-slate-900 overflow-hidden relative selection:bg-white selection:text-slate-900">
       
       <ScrollReveal className="px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 mb-24 md:mb-32 relative z-10">
          
          {/* Col 1: Brand / Description */}
          <div className="flex flex-col">
             <span className="text-white text-xl font-medium tracking-tight mb-6">Pixel Heaven</span>
             <p className="text-slate-500 font-light leading-relaxed max-w-xs">
               We act as your fractional design and engineering team to get you to market fast and beautifully.
             </p>
          </div>

          {/* Col 2: Links */}
          <div className="flex flex-col">
             <span className="text-xs font-semibold tracking-widest uppercase text-slate-700 mb-8 block">Studio</span>
             <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">Work</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">Services</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">Careers</a></li>
             </ul>
          </div>

          {/* Col 3: Socials */}
          <div className="flex flex-col">
             <span className="text-xs font-semibold tracking-widest uppercase text-slate-700 mb-8 block">Socials</span>
             <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">Twitter</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">Instagram</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">LinkedIn</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 font-light">Dribbble</a></li>
             </ul>
          </div>

          {/* Col 4: Legal & Local */}
          <div className="flex flex-col">
             <span className="text-xs font-semibold tracking-widest uppercase text-slate-700 mb-8 block">Location</span>
             <p className="text-slate-400 font-light mb-8">
               San Francisco, CA<br/>
               Remote Worldwide
             </p>
             <span className="text-slate-600 font-light text-sm">
               © 2026 Pixel Heaven.<br/>
               All rights reserved.
             </span>
          </div>

       </ScrollReveal>

       {/* Massive Typography Anchor (Watermark) */}
       {/* Uses text-slate-900 on bg-slate-950 for a massive but subtle stealth effect */}
       <ScrollReveal className="w-full flex justify-center overflow-hidden pointer-events-none mt-auto select-none" delay={200}>
          <h2 className="text-[17vw] font-bold text-slate-900 tracking-tighter leading-[0.75] uppercase whitespace-nowrap">
            Pixel Heaven
          </h2>
       </ScrollReveal>

    </footer>
  )
}
