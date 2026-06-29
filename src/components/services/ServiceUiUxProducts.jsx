import React, { useState } from 'react';
import ScrollReveal from '../ScrollReveal';

const products = [
  {
    title: 'UI/UX Audit Report',
    description: 'A comprehensive tear-down of your current product, highlighting friction points, accessibility issues, and actionable optimization strategies.',
  },
  {
    title: 'Wireframes & Prototypes',
    description: 'Interactive low and high-fidelity prototypes that allow you to feel and test the user journey before writing a single line of code.',
  },
  {
    title: 'High-Fidelity Designs',
    description: 'Pixel-perfect, stunning visual layouts for every screen and state, ready to captivate your users and elevate your brand.',
  },
  {
    title: 'Design System & Specs',
    description: 'A fully documented component library and developer handoff file ensuring flawless, scalable engineering implementation.',
  }
];

export default function ServiceUiUxProducts() {
  return (
    <section className="bg-slate-900 text-white py-32 md:py-48 relative selection:bg-white selection:text-slate-900">
      
      {/* Corner Label */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 pointer-events-none">
        <div className="flex items-center gap-4 w-fit">
          <span className="h-px w-6 bg-slate-600"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">Deliverables</h2>
        </div>
      </div>

      <div className="max-w-[90vw] 2xl:max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">
        
        {/* Massive Section Header */}
        <ScrollReveal className="mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24 border-b border-slate-800 pb-16">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-100 tracking-tighter leading-[1.1]">
              What you receive.
            </h3>
            <p className="text-slate-400 font-light max-w-sm text-lg leading-relaxed lg:text-right shrink-0">
              The tangible, high-fidelity outputs delivered at the completion of our architecture phase.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Column Grid, Perfectly Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0 divide-y md:divide-y-0 lg:divide-x divide-slate-800 border-t lg:border-t-0 border-slate-800 pt-16 lg:pt-0">
          {products.map((product, index) => (
            <ScrollReveal key={index} threshold={0.2} className="h-full">
              <div className="flex flex-col h-full group pt-8 md:pt-0 lg:px-12">
                
                {/* Fixed height container for Number to force alignment */}
                <div className="h-24 md:h-32 flex items-start mb-8">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-light text-slate-700 group-hover:-translate-y-3 transition-transform duration-500 block leading-none">
                    0{index + 1}
                  </span>
                </div>
                
                <div className="flex flex-col flex-grow">
                  {/* Fixed height container for Title to force alignment even if text wraps */}
                  <div className="h-24 flex items-start mb-6">
                    <h4 className="text-2xl md:text-3xl font-medium text-slate-100 leading-snug">
                      {product.title}
                    </h4>
                  </div>
                  
                  <p className="text-lg font-light text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {product.description}
                  </p>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

