import React, { useEffect, useState } from 'react';
import ScrollReveal from '../ScrollReveal';
import pb from '../../pb';

export default function ServiceSoftwarePersuade() {
  const [data, setData] = useState(null);

  useEffect(() => {
    pb.collection('page_software_persuade').getFullList()
      .then(records => {
        if (records.length > 0) setData(records[0]);
      })
      .catch(console.error);
  }, []);

  if (!data) return null;
  return (
    <section className="bg-slate-950 relative py-32 md:py-48 overflow-hidden">
      
      {/* Decorative massive background element */}
      <div className="absolute -top-32 -right-12 md:-right-32 text-[40rem] font-black text-slate-900/50 pointer-events-none leading-none select-none">
        +
      </div>

      <div className="max-w-[90vw] md:max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Massive Typography */}
        <div className="w-full lg:w-1/2">
          <ScrollReveal>
            <div className="flex items-center gap-4 w-fit mb-12">
              <span className="h-px w-6 bg-slate-700"></span>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">{data.badge}</h2>
            </div>
            <h3 
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-light text-slate-100 tracking-tighter leading-[1.05]"
            dangerouslySetInnerHTML={{ __html: data.title }}
          ></h3>
          </ScrollReveal>
        </div>

        {/* Right Side: The Pitch in a Glass Box over an image */}
        <div className="w-full lg:w-1/2 relative">
          <ScrollReveal delay={200} className="relative z-10">
            {/* The Image Container */}
            <div className="w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" 
                alt="Engineering" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12">
                <p className="text-xl md:text-2xl font-light text-slate-300 leading-relaxed mb-8">
                  {data.description}
                </p>
                <div className="flex items-center gap-4 text-slate-100 hover:text-white transition-colors cursor-pointer group/btn w-fit">
                  <span className="font-semibold uppercase tracking-widest text-sm">{data.button_text}</span>
                  <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-slate-900 group-hover/btn:border-white transition-all duration-500">
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
      </div>
    </section>
  );
}
