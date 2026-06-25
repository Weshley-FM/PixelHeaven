import React, { useRef, useEffect, useState } from 'react';

export default function AboutC() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const distanceScrolled = -rect.top; 
      const scrollableDistance = rect.height - windowHeight; 
      
      let progress = distanceScrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4 full-width slides = 400% total width.
  // We need to translate by 300% (3/4 of the total width) to reach the start of the last slide.
  const xOffset = `-${scrollProgress * 75}%`; 

  return (
    <div className="bg-slate-900 relative" ref={containerRef} style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Fixed Header */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 flex items-center gap-4">
          <span className="h-px w-12 bg-slate-700"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Option C: Horizontal Journey</h2>
        </div>

        {/* The Track */}
        <div 
          className="flex w-[400vw] h-full transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: `translateX(${xOffset})` }}
        >
          {/* Slide 1 */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
            <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-medium text-white max-w-5xl leading-[1.1] tracking-tight">
              We started with a simple idea.
            </h3>
            <p className="text-xl md:text-2xl text-slate-400 mt-8 max-w-2xl leading-relaxed">
              To strip away the noise and build digital tools that actually help founders scale their visions without compromising on aesthetics.
            </p>
          </div>

          {/* Slide 2 */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24 relative">
             {/* Decorative Element */}
             <div className="absolute inset-y-24 right-12 md:right-24 w-1/3 bg-slate-800 rounded-[2.5rem] overflow-hidden hidden lg:block shadow-2xl">
               <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" alt="Abstract Tech" className="w-full h-full object-cover opacity-40 mix-blend-luminosity hover:scale-105 transition-transform duration-1000" />
             </div>
            <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-medium text-white max-w-3xl leading-[1.1] tracking-tight z-10">
              Then we broke all the rules.
            </h3>
            <p className="text-xl md:text-2xl text-slate-400 mt-8 max-w-xl z-10 leading-relaxed">
              Generic templates don't cut it. We merged high-end engineering with rebellious design to create something entirely new and wildly effective.
            </p>
          </div>

          {/* Slide 3 */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 max-w-5xl">
               <div className="border-t border-slate-700 pt-6">
                 <div className="text-5xl text-white font-medium mb-3">100+</div>
                 <div className="text-slate-400 tracking-wide">Startups Launched</div>
               </div>
               <div className="border-t border-slate-700 pt-6">
                 <div className="text-5xl text-white font-medium mb-3">$50M</div>
                 <div className="text-slate-400 tracking-wide">Client Revenue</div>
               </div>
               <div className="border-t border-slate-700 pt-6">
                 <div className="text-5xl text-white font-medium mb-3">14</div>
                 <div className="text-slate-400 tracking-wide">Design Awards</div>
               </div>
               <div className="border-t border-slate-700 pt-6">
                 <div className="text-5xl text-white font-medium mb-3">24/7</div>
                 <div className="text-slate-400 tracking-wide">Relentless Grind</div>
               </div>
            </div>
            <h3 className="text-4xl md:text-6xl font-medium text-white max-w-4xl leading-tight tracking-tight">
              The numbers speak for themselves.
            </h3>
          </div>

          {/* Slide 4 */}
          <div className="w-screen h-full flex flex-col items-center justify-center text-center px-12 md:px-24 bg-slate-950">
            <h3 className="text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tight text-white mb-12">
              Ready to elevate?
            </h3>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold tracking-wide text-lg hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300">
              Start Your Project
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
