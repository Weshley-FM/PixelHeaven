import React, { useRef, useEffect, useState } from 'react';

export default function About() {
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

  // Compute scroll plateaus for smooth 1:1 scrolling with reading zones
  let targetVW = 0;
  if (scrollProgress < 0.15) {
    targetVW = 0; // Rest at Slide 1
  } else if (scrollProgress < 0.35) {
    // Move from Slide 1 to 2
    const local = (scrollProgress - 0.15) / 0.20;
    targetVW = local * 100;
  } else if (scrollProgress < 0.50) {
    targetVW = 100; // Rest at Slide 2
  } else if (scrollProgress < 0.70) {
    // Move from Slide 2 to 3
    const local = (scrollProgress - 0.50) / 0.20;
    targetVW = 100 + local * 100;
  } else if (scrollProgress < 0.85) {
    targetVW = 200; // Rest at Slide 3
  } else if (scrollProgress < 0.98) {
    // Move from Slide 3 to 4
    const local = (scrollProgress - 0.85) / 0.13;
    targetVW = 200 + Math.min(1, local) * 100;
  } else {
    // Hard snap at the bottom to guarantee no white gap from the previous slide!
    targetVW = 300; 
  }

  // Derive active slide for text animations
  const activeSlide = Math.round(targetVW / 100);
  
  // Convert targetVW (0 to 300) into a percentage of the 400vw track (0% to 75%)
  // This prevents Windows scrollbar-width calculation bugs
  const targetPercent = targetVW / 4;

  return (
    <div className="bg-white relative" ref={containerRef} style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Fixed Header */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 flex items-center gap-4">
          <span className="h-px w-6 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">About Us</h2>
        </div>

        {/* The Track */}
        <div 
          className="flex w-[400vw] h-full transition-transform duration-75 ease-out will-change-transform"
          style={{ transform: `translateX(-${targetPercent}%)` }}
        >
          {/* Slide 1 */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
            <h3 className={`text-5xl md:text-7xl lg:text-[6rem] font-light text-slate-900 max-w-5xl leading-[1.05] tracking-tight transition-all duration-1000 transform ${activeSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              We started with a simple idea.
            </h3>
            <p className={`text-xl md:text-2xl text-slate-500 mt-8 max-w-2xl leading-relaxed font-light transition-all duration-1000 delay-150 transform ${activeSlide === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              To strip away the noise and build digital tools that actually help founders scale their visions without compromising on aesthetics.
            </p>
          </div>

          {/* Slide 2 */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24 relative">
             <div className={`absolute inset-y-24 right-12 md:right-24 w-1/3 bg-slate-100 rounded-[2.5rem] overflow-hidden hidden lg:block shadow-xl transition-all duration-1000 transform ${activeSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'}`}>
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" alt="Modern Abstract 3D Shapes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
             </div>
            <h3 className={`text-5xl md:text-7xl lg:text-[6rem] font-light text-slate-900 max-w-3xl leading-[1.05] tracking-tight z-10 transition-all duration-1000 transform ${activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              Then we broke all the rules.
            </h3>
            <p className={`text-xl md:text-2xl text-slate-500 mt-8 max-w-xl z-10 leading-relaxed font-light transition-all duration-1000 delay-150 transform ${activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              Generic templates don't cut it. We merged high-end engineering with rebellious design to create something entirely new and wildly effective.
            </p>
          </div>

          {/* Slide 3 */}
          <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 max-w-5xl">
               <div className={`border-t border-slate-200 pt-6 transition-all duration-700 transform ${activeSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-5xl md:text-6xl text-slate-900 font-light tracking-tight mb-3">100+</div>
                 <div className="text-slate-500 tracking-wide font-light">Startups Launched</div>
               </div>
               <div className={`border-t border-slate-200 pt-6 transition-all duration-700 delay-100 transform ${activeSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-5xl md:text-6xl text-slate-900 font-light tracking-tight mb-3">$50M</div>
                 <div className="text-slate-500 tracking-wide font-light">Client Revenue</div>
               </div>
               <div className={`border-t border-slate-200 pt-6 transition-all duration-700 delay-200 transform ${activeSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-5xl md:text-6xl text-slate-900 font-light tracking-tight mb-3">14</div>
                 <div className="text-slate-500 tracking-wide font-light">Design Awards</div>
               </div>
               <div className={`border-t border-slate-200 pt-6 transition-all duration-700 delay-300 transform ${activeSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                 <div className="text-5xl md:text-6xl text-slate-900 font-light tracking-tight mb-3">24/7</div>
                 <div className="text-slate-500 tracking-wide font-light">Relentless Grind</div>
               </div>
            </div>
            <h3 className={`text-4xl md:text-6xl font-light text-slate-900 max-w-4xl leading-[1.05] tracking-tight transition-all duration-1000 delay-500 transform ${activeSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              The numbers speak for themselves.
            </h3>
          </div>

          {/* Slide 4 */}
          <div className="w-screen h-full flex flex-col items-center justify-center text-center px-12 md:px-24 bg-slate-950">
            <h3 className={`text-6xl md:text-8xl lg:text-[8rem] font-light tracking-tight leading-none text-white mb-12 transition-all duration-1000 transform ${activeSlide === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              Ready to elevate?
            </h3>
            <button className={`px-10 py-5 bg-white text-slate-900 rounded-full font-semibold tracking-wide text-lg hover:bg-slate-100 hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-500 delay-200 transform ${activeSlide === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Start Your Project
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
