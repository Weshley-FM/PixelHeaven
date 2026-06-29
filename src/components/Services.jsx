import React, { useRef, useEffect, useState } from 'react';
import pb from '../pb';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [services, setServices] = useState([]);

  useEffect(() => {
    pb.collection('services').getFullList({ sort: '+created' })
      .then(data => setServices(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (services.length === 0) return;

    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          setActiveIndex(index);
        }
      });
    }, options);

    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.scroll-track');
      sections.forEach(section => observer.observe(section));
    }

    return () => observer.disconnect();
  }, [services]);

  return (
    <section className="bg-slate-50 relative" ref={containerRef}>
      
      {/* Invisible Scroll Tracks */}
      <div className="absolute inset-0 w-full pointer-events-none flex flex-col z-0">
        {services.map((_, index) => (
          <div key={index} className="w-full h-[150vh] scroll-track" data-index={index}></div>
        ))}
      </div>

      {/* Sticky Split Screen */}
      <ScrollReveal className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden z-10 pointer-events-none">
        
        {/* Section Header */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 flex items-center gap-4 z-50">
          <span className="h-px w-6 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Our Services</h2>
        </div>

        {/* Left Side: Stationary Typography List */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-6 md:px-24 z-20 pointer-events-auto">
          <div className="flex flex-col gap-8 md:gap-12">
            {services.map((s, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={s.id}>
                  <h3 
                    className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 text-slate-900' : 'opacity-20 text-slate-900'
                    }`}
                  >
                    {s.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Explanation Cards */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center px-6 md:px-24 z-10 pointer-events-auto overflow-hidden">
          
          {/* Massive Watermark Numbers */}
          {services.map((s, index) => {
             const isActive = activeIndex === index;
             return (
               <div 
                 key={`number-${s.id}`}
                 className={`absolute inset-0 flex items-center justify-center transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                   isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                 }`}
               >
                  <span className="text-[25rem] font-bold text-slate-100 tracking-tighter leading-none select-none -translate-y-12">
                    {s.number}
                  </span>
               </div>
             );
          })}

          {/* Cards Layer */}
          {services.map((s, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={s.id} 
                className={`absolute inset-0 flex items-center justify-center p-6 md:p-12 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-95'
                }`}
              >
                {/* Clean, Premium Monochromatic Card */}
                <div className="w-full max-w-xl bg-white border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10 md:p-16">
                  
                  <p className="text-2xl md:text-3xl text-slate-800 font-light leading-relaxed mb-12 tracking-tight">
                    {s.description}
                  </p>
                  
                  <div className="h-px w-12 bg-slate-200 mb-8"></div>
                </div>
              </div>
            );
          })}
        </div>

      </ScrollReveal>

      <div style={{ height: `${services.length * 150}vh` }} className="pointer-events-none z-0"></div>

    </section>
  );
}
