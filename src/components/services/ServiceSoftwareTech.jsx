import React, { useEffect, useState } from 'react';
import ScrollReveal from '../ScrollReveal';
import pb from '../../pb';

export default function ServiceSoftwareTech() {
  const [headerData, setHeaderData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    pb.collection('page_software_tech_header').getFullList()
      .then(records => {
        if (records.length > 0) setHeaderData(records[0]);
      })
      .catch(console.error);

    pb.collection('page_software_tech_categories').getFullList({ sort: 'sort_order' })
      .then(records => setCategories(records))
      .catch(console.error);
  }, []);

  if (!headerData || categories.length === 0) return null;

  return (
    <section className="bg-slate-950 text-white py-32 md:py-48 relative selection:bg-white selection:text-slate-900">
      
      {/* Corner Label */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 pointer-events-none">
        <div className="flex items-center gap-4 w-fit">
          <span className="h-px w-6 bg-slate-700"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">{headerData.badge}</h2>
        </div>
      </div>

      <div className="max-w-[90vw] md:max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        
        {/* Massive Section Header */}
        <ScrollReveal className="mb-24 lg:mb-40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24 pb-16 border-b border-slate-800">
            <h3 
              className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-100 tracking-tighter leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: headerData.title }}
            ></h3>
            <p className="text-slate-400 font-light max-w-md text-xl leading-relaxed lg:text-right shrink-0">
              {headerData.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Stack Categories - Heavy Architectural Layout */}
        <div className="flex flex-col gap-32">
          {categories.map((cat, i) => (
            <div key={cat.id} className="flex flex-col lg:flex-row gap-12 lg:gap-32 w-full border-b border-slate-900 pb-32 last:border-0 last:pb-0">
              
              {/* Left Side: Category Title (Sticky) */}
              <div className="w-full lg:w-1/3 shrink-0">
                <ScrollReveal className="sticky top-32">
                  <span className="text-slate-700 font-mono text-xl block mb-6">0{i + 1}</span>
                  <h4 className="text-4xl md:text-5xl font-medium text-slate-100 mb-6">{cat.category}</h4>
                  <p className="text-xl text-slate-500 font-light leading-relaxed">{cat.description}</p>
                </ScrollReveal>
              </div>

              {/* Right Side: Huge Tech Cards */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cat.techs.split(',').map((tech, j) => (
                  <ScrollReveal key={tech} threshold={0.2} delay={j * 100}>
                    <div 
                      className="group relative border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-colors duration-500 rounded-3xl p-10 md:p-12 flex flex-col justify-end min-h-[220px]"
                    >
                      <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:text-slate-900 group-hover:border-white transition-all duration-500">
                        <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-7-7l7 7-7 7" />
                        </svg>
                      </div>
                      <h5 className="text-3xl md:text-4xl font-light text-slate-400 group-hover:text-white transition-colors duration-500">
                        {tech}
                      </h5>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
