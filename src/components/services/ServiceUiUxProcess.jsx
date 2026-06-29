import React, { useRef, useEffect, useState } from 'react';
import ScrollReveal from '../ScrollReveal';

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Research',
    description: 'We immerse ourselves in your business, understanding your goals, target audience, and market landscape to establish a solid foundation.',
  },
  {
    step: '02',
    title: 'Wireframing & Strategy',
    description: 'Translating research into structural layouts. We define the user journey and information architecture before adding visual flair.',
  },
  {
    step: '03',
    title: 'UI Design & Prototyping',
    description: 'Applying aesthetics, typography, and micro-interactions. We build high-fidelity prototypes that look and feel like the final product.',
  },
  {
    step: '04',
    title: 'Testing & Refinement',
    description: 'Validating the design with real users. We gather feedback, refine interactions, and ensure the experience is flawlessly intuitive.',
  }
];

export default function ServiceUiUxProcess() {
  return (
    <section className="bg-white py-32 relative">
      
      {/* Corner Label */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 pointer-events-none">
        <div className="flex items-center gap-4 w-fit">
          <span className="h-px w-6 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Our Process</h2>
        </div>
      </div>

      <div className="max-w-[90vw] md:max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        
        {/* Section Header */}
        <ScrollReveal className="mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24 border-b border-slate-200 pb-16">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tighter leading-[1.1]">
              How we build it.
            </h3>
            <p className="text-slate-500 font-light max-w-sm text-lg leading-relaxed lg:text-right shrink-0">
              A methodical four-step approach designed to remove guesswork and deliver uncompromising quality.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative w-full">
          {/* Center Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 hidden md:block -translate-x-1/2"></div>

          <div className="flex flex-col gap-24">
            {processSteps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <ScrollReveal key={index} threshold={0.2}>
                  <div className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Half */}
                    <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-16 md:text-right' : 'md:justify-start md:pl-16 md:text-left'}`}>
                      <div className="max-w-md">
                        <div className="md:hidden flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 font-mono text-lg">
                            {item.step}
                          </div>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-light text-slate-900 mb-6 group-hover:text-slate-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-lg font-light text-slate-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Node (Desktop) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-16 h-16 bg-white border-2 border-slate-200 rounded-full group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white text-slate-400 transition-all duration-500 font-light text-xl shadow-[0_0_0_12px_white]">
                      {item.step}
                    </div>

                    {/* Empty Space for the other half */}
                    <div className="hidden md:block w-full md:w-1/2"></div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

