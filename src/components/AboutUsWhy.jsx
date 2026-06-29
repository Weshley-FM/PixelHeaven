import React, { useRef, useEffect, useState } from 'react';
import pb from '../pb';

export default function AboutUsWhy() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    pb.collection('page_about_why_reasons').getFullList({ sort: 'sort_order' })
      .then(data => {
        if(data.length > 0) setReasons(data);
      })
      .catch(err => console.error("Why fetch error:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || reasons.length === 0) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Distance scrolled into the container
      const distanceScrolled = -rect.top;
      // Total scrollable distance
      const scrollableDistance = rect.height - windowHeight;
      
      let progress = distanceScrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      const index = Math.min(
        Math.floor(progress * reasons.length),
        reasons.length - 1
      );
      
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reasons.length]);

  if (reasons.length === 0) return null;

  return (
    <section 
      id="about-why"
      ref={containerRef} 
      className="relative w-full bg-slate-950 text-slate-100 selection:bg-slate-100 selection:text-slate-900"
      style={{ height: `${(reasons.length + 1) * 80}vh` }}
    >
      
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row overflow-hidden">
         
         {/* Left Side: Static Massive Title */}
         <div className="w-full md:w-1/2 h-[35vh] md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-[#0a0f1c] border-b md:border-b-0 md:border-r border-slate-800/50 z-10 relative">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="h-px w-6 bg-slate-500"></span>
              <h2 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-slate-500">
                Why Pixel Heaven
              </h2>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-thin tracking-tighter leading-[0.9] text-white">
              The Anatomy<br/>of Excellence.
            </h1>
         </div>

         {/* Right Side: Crossfading Reasons */}
         <div className="w-full md:w-1/2 h-[65vh] md:h-full relative bg-slate-950">
            {reasons.map((reason, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              
              let translateY = 'translateY(6rem)'; // Future items wait below
              if (isActive) translateY = 'translateY(0)';
              if (isPast) translateY = 'translateY(-6rem)'; // Past items drift up

              return (
                <div 
                  key={reason.id}
                  className={`absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: translateY,
                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                  }}
                >
                   <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-thin tracking-tighter leading-[1.05] text-white mb-6 md:mb-12">
                     {reason.title}
                   </h2>
                   <div className="h-px w-24 bg-slate-700 mb-6 md:mb-12"></div>
                   <p className="text-lg md:text-2xl lg:text-3xl font-light leading-relaxed text-slate-400 max-w-xl">
                     {reason.description}
                   </p>
                </div>
              );
            })}
         </div>

      </div>

    </section>
  );
}
