import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const models = [
  {
    id: 1,
    title: 'Consulting & Audit',
    price: 'Starting at $2k',
    timeline: '1-3 Weeks',
    desc: 'Strategic direction, UX audits, or brand positioning before diving into full execution.',
    deliverables: ['Comprehensive UX/UI Audit', 'Brand Strategy Deck', 'Technical Feasibility Report']
  },
  {
    id: 2,
    title: 'Project-Based',
    price: 'Starting at $10k',
    timeline: '2-3 Months',
    desc: 'End-to-end execution of a specific scope. We handle everything from the initial discovery to launch.',
    deliverables: ['Full Product Design', 'Webflow/React Development', 'Launch Support']
  },
  {
    id: 3,
    title: 'Dedicated Team',
    price: 'Custom Retainer',
    timeline: 'Ongoing',
    desc: 'An embedded team of world-class designers and engineers working alongside you as a strategic partner.',
    deliverables: ['Continuous Iteration', 'Priority Resource Allocation', 'Direct Slack Channel']
  }
];

export default function Engagement() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="bg-slate-50 relative h-[100svh] flex flex-col overflow-hidden">
      
      {/* Section Header */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 flex items-center gap-4 z-20">
        <span className="h-px w-6 bg-slate-300"></span>
        <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Engagement</h2>
      </div>

      {/* Accordion Container */}
      <ScrollReveal className="flex-grow flex flex-col lg:flex-row w-full h-full pt-24 md:pt-32 pb-6 md:pb-12 px-4 md:px-12 gap-4">
        {models.map((model, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={model.id}
              onMouseEnter={() => setActiveIndex(index)}
              // The active panel gets 8x the space of the inactive ones
              style={{ flexGrow: isActive ? 8 : 1, flexBasis: isActive ? '80%' : '10%' }}
              className={`relative rounded-3xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer border ${
                isActive 
                  ? 'bg-white border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]' 
                  : 'bg-slate-200/40 border-slate-200/50 hover:bg-slate-200/70'
              }`}
            >
              
              {/* --- INACTIVE STATE: Rotated Title --- */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
                }`}
              >
                {/* On desktop it's vertically rotated. On mobile it stays horizontal. */}
                <h3 className="text-xl md:text-3xl text-slate-400 font-light tracking-widest uppercase lg:-rotate-90 whitespace-nowrap">
                  {model.title}
                </h3>
              </div>

              {/* --- ACTIVE STATE: Full Content --- */}
              <div 
                // We use a fixed massive min-width so the text doesn't aggressively word-wrap and jitter while the container expands
                className={`absolute inset-0 p-8 md:p-16 flex flex-col justify-between transition-opacity duration-700 w-full min-w-[80vw] lg:min-w-[60vw] h-full min-h-[50vh] ${
                  isActive ? 'opacity-100 pointer-events-auto delay-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                 <div>
                   <span className="inline-block px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-semibold tracking-widest text-slate-500 uppercase mb-6 md:mb-8">
                      Tier 0{index + 1}
                   </span>
                   <h4 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tighter mb-4 md:mb-6">
                      {model.title}
                   </h4>
                   <p className="text-lg md:text-2xl text-slate-500 font-light max-w-xl leading-relaxed">
                      {model.desc}
                   </p>
                 </div>

                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-t border-slate-100 pt-8 md:pt-12 mt-auto mr-8 md:mr-16">
                    <div className="flex gap-8 md:gap-16 mb-8 lg:mb-0">
                      <div>
                        <span className="block text-[10px] md:text-xs uppercase tracking-widest text-slate-400 mb-2">Investment</span>
                        <span className="text-xl md:text-3xl text-slate-900 font-light tracking-tight">{model.price}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] md:text-xs uppercase tracking-widest text-slate-400 mb-2">Timeline</span>
                        <span className="text-xl md:text-3xl text-slate-900 font-light tracking-tight">{model.timeline}</span>
                      </div>
                    </div>
                    
                    <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium hover:bg-slate-900 hover:text-white transition-colors duration-300 w-full lg:w-auto">
                      Select Model
                    </button>
                 </div>
              </div>

            </div>
          )
        })}
      </ScrollReveal>
    </section>
  )
}
