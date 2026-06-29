import React, { useState, useEffect } from 'react';

export default function ServiceHero({ title, subtitle, description }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; 
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  const splitTitle = title.split(' ');
  const firstWord = splitTitle[0] || '';
  const restWords = splitTitle.slice(1).join(' ');

  return (
    <section 
      className="relative h-screen w-full bg-slate-50 text-slate-900 flex items-center justify-center overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full max-w-[90rem] px-8 md:px-16 flex justify-between items-center z-10 h-full">
        
        {/* Left/Center Clean Typography Block */}
        <div className="flex flex-col gap-0 z-20">
           {/* Top Label */}
           <div className="overflow-hidden mb-8 md:mb-12">
             <h2 
                className="text-sm tracking-[0.4em] uppercase font-semibold text-slate-500 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-4"
                style={{ 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(100%)', 
                  opacity: isLoaded ? 1 : 0,
                  transitionDelay: '200ms'
                }}
              >
               <span className="w-8 h-px bg-slate-300"></span>
               {subtitle} SECTION
             </h2>
           </div>
           
           {/* Line 1 */}
           <div className="overflow-hidden">
             <h1 
                className="text-6xl md:text-8xl lg:text-[9rem] font-light leading-[0.9] tracking-tighter text-slate-900 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(100%)', 
                  opacity: isLoaded ? 1 : 0,
                  transitionDelay: '400ms'
                }}
              >
               {firstWord}
             </h1>
           </div>
           
           {/* Line 2 (Staggered) */}
           {restWords && (
             <div className="overflow-hidden flex items-center gap-6 md:gap-12 ml-12 md:ml-32 mt-2">
               <div 
                 className="w-12 md:w-24 h-[2px] bg-slate-300 relative top-[0.5rem] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                 style={{ 
                   transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)', 
                   transformOrigin: 'left',
                   transitionDelay: '500ms'
                 }}
               ></div>
               <h1 
                  className="text-6xl md:text-8xl lg:text-[9rem] font-light leading-[0.9] tracking-tighter text-slate-400 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(100%)', 
                    opacity: isLoaded ? 1 : 0,
                    transitionDelay: '600ms'
                  }}
                >
                 {restWords}
               </h1>
             </div>
           )}
           
           {/* Description */}
           <div className="mt-16 md:mt-20 max-w-lg ml-12 md:ml-32 overflow-hidden">
             <p 
                className="text-lg md:text-xl font-light leading-relaxed text-slate-600 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(100%)', 
                  opacity: isLoaded ? 1 : 0,
                  transitionDelay: '800ms'
                }}
              >
               {description}
             </p>
           </div>
        </div>
        
        {/* Right Vertical Word - Creates the exact depth effect seen in About Us */}
        <div className="hidden lg:flex items-center absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none z-10">
           <div className="overflow-hidden flex items-center h-screen">
             <h1 
                className="text-[14vw] font-thin uppercase tracking-tighter text-slate-200/60 [writing-mode:vertical-rl] leading-none select-none transition-transform duration-[200ms] ease-out"
                style={{ 
                  transform: isLoaded ? `translateY(${mousePos.y * 3}px)` : 'translateY(-50%)',
                  opacity: isLoaded ? 1 : 0,
                  transition: isLoaded ? 'transform 0.1s ease-out, opacity 1.5s ease 0.5s' : 'none'
                }}
              >
               {subtitle}
             </h1>
           </div>
        </div>

      </div>
    </section>
  );
}
