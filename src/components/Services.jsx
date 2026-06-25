import React, { useRef, useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    id: 1,
    title: 'Brand Architecture',
    tagline: 'Dictating visual and verbal identity across every touchpoint.',
    details: [
      'Visual Identity Systems',
      'Verbal Identity & Copywriting',
      'Brand Guidelines & Playbooks',
      'Market Positioning'
    ],
    number: '01'
  },
  {
    id: 2,
    title: 'UI/UX Engineering',
    tagline: 'Interfaces that blur the line between software and art.',
    details: [
      'High-Fidelity Prototyping',
      'Design Systems',
      'Interaction Design',
      'User Research & Testing'
    ],
    number: '02'
  },
  {
    id: 3,
    title: 'Motion & 3D',
    tagline: 'Kinetic typography and WebGL experiences that captivate instantly.',
    details: [
      'WebGL & Three.js',
      'Kinetic Typography',
      'Micro-interactions',
      '3D Product Rendering'
    ],
    number: '03'
  },
  {
    id: 4,
    title: 'Growth Strategy',
    tagline: 'Data-driven funnels that convert attention into massive revenue.',
    details: [
      'Conversion Rate Optimization',
      'Funnel Architecture',
      'A/B Testing & Analytics',
      'Performance Marketing'
    ],
    number: '04'
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
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
  }, []);

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
                  
                  <p className="text-2xl md:text-4xl text-slate-800 font-light leading-tight mb-12 tracking-tight">
                    {s.tagline}
                  </p>
                  
                  <div className="h-px w-12 bg-slate-200 mb-8"></div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                    {s.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-4 text-base md:text-lg text-slate-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-slate-900 mt-2 shrink-0"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
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
