import React, { useRef, useEffect, useState } from 'react';
import pb from '../pb';

export default function AboutUsTimeline() {
  const [nodes, setNodes] = useState([]);
  
  useEffect(() => {
    pb.collection('page_about_timeline').getFullList({ sort: 'sort_order' })
      .then(data => setNodes(data))
      .catch(err => console.error("Timeline fetch error:", err));
  }, []);

  // Intersection Observer for fade in
  const nodeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    }, { threshold: 0.3 });

    nodeRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [nodes]);

  // Scroll to grow line
  const containerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Line starts growing when the top of the container hits 60% of the screen height
      const start = windowHeight * 0.6;
      let height = start - rect.top;
      
      if (height < 0) height = 0;
      if (height > rect.height) height = rect.height;
      
      setLineHeight(height);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about-timeline" className="relative w-full bg-slate-50 text-slate-900 py-32 md:py-48 px-6 md:px-12 selection:bg-slate-900 selection:text-white overflow-hidden" ref={containerRef}>
      
      {/* Corner Label */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 flex items-center gap-4">
        <span className="h-px w-6 bg-slate-300"></span>
        <h2 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-slate-400">
          Our Journey
        </h2>
      </div>

      <div className="max-w-[90rem] mx-auto relative pt-16 md:pt-0">
         
         {/* The Continuous Line (Background Track) */}
         <div className="absolute left-[20px] md:left-[20%] top-0 bottom-0 w-[1px] bg-slate-200"></div>
         
         {/* The Continuous Line (Active Fill) */}
         <div 
           className="absolute left-[20px] md:left-[20%] top-0 w-[1px] bg-slate-900 will-change-[height]"
           style={{ height: `${lineHeight}px`, transition: 'height 0.1s cubic-bezier(0.16, 1, 0.3, 1)' }}
         ></div>

         <div className="flex flex-col gap-32 md:gap-48 relative z-10 py-12 md:py-32">
            {nodes.map((node, i) => {
              const isLast = i === nodes.length - 1;
              return (
                <div 
                  key={node.id} 
                  ref={el => nodeRefs.current[i] = el}
                  className="flex flex-col md:flex-row gap-6 md:gap-24 opacity-0 translate-y-12 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                   {/* Left side: Year (aligned to line) */}
                   <div className="md:w-[20%] flex md:justify-end items-start pt-1 md:pt-3 relative">
                      {/* The Dot */}
                      <div 
                        className="absolute left-[16px] md:left-auto md:right-[-4px] top-[14px] md:top-[22px] w-2 h-2 rounded-full bg-slate-900 ring-[6px] ring-slate-50 transition-all duration-500 delay-300 scale-0 origin-center z-20" 
                        style={{ transform: lineHeight > (i * 200) ? 'scale(1)' : 'scale(0)' }}
                      ></div>
                      
                      {/* MAGIC LINE MASK: Hides the rest of the line on the last node */}
                      {isLast && (
                        <div className="absolute left-[15px] md:left-auto md:right-[-5px] top-[30px] md:top-[40px] w-4 h-[2000px] bg-slate-50 z-10"></div>
                      )}
                      
                      <h3 className="text-3xl md:text-5xl font-light tracking-tighter text-slate-400 pl-[52px] md:pl-0 md:pr-12 relative z-20">
                        {node.year}
                      </h3>
                   </div>

                   {/* Right side: Content */}
                   <div className="md:w-[80%] pl-[52px] md:pl-0 flex flex-col gap-6 max-w-4xl relative z-20">
                      <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light leading-[1.05] tracking-tight text-slate-900">
                        {node.title}
                      </h2>
                      <p className="text-lg md:text-2xl lg:text-3xl font-light leading-relaxed text-slate-500">
                        {node.description}
                      </p>
                   </div>
                </div>
              );
            })}
         </div>
      </div>
    </section>
  );
}
