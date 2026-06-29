import React, { useState, useEffect } from 'react';
import pb from '../../pb';
import ScrollReveal from '../ScrollReveal';

export default function ServiceWebDevPricing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pricingTiers, setPricingTiers] = useState([]);

  useEffect(() => {
    pb.collection('page_webdev_pricing').getFullList({ sort: 'created' })
      .then(data => setPricingTiers(data))
      .catch(console.error);
  }, []);

  if (pricingTiers.length === 0) return null;

  return (
    <section className="bg-slate-950 text-white relative h-[100svh] min-h-[700px] flex flex-col overflow-hidden">
      
      {/* Section Header */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 flex items-center gap-4 z-20">
        <span className="h-px w-6 bg-slate-500"></span>
        <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Investment</h2>
      </div>

      {/* Accordion Container */}
      <ScrollReveal className="flex-grow flex flex-col lg:flex-row w-full h-full pt-24 md:pt-32 pb-6 md:pb-12 px-4 md:px-12 gap-4">
        {pricingTiers.map((tier, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={tier.id}
              onMouseEnter={() => setActiveIndex(index)}
              // The active panel gets 8x the space of the inactive ones
              style={{ flexGrow: isActive ? 8 : 1, flexBasis: isActive ? '80%' : '10%' }}
              className={`relative rounded-3xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer border ${
                isActive 
                  ? 'bg-slate-900 border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' 
                  : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/70'
              }`}
            >
              
              {/* --- INACTIVE STATE: Rotated Title --- */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
                }`}
              >
                {/* On desktop it's vertically rotated. On mobile it stays horizontal. */}
                <h3 className="text-xl md:text-3xl text-slate-500 font-light tracking-widest uppercase lg:-rotate-90 whitespace-nowrap">
                  {tier.tier_name}
                </h3>
              </div>

              {/* --- ACTIVE STATE: Full Content --- */}
              <div 
                // Fixed min-width to prevent word-wrap jitter during expansion
                className={`absolute inset-0 p-8 md:p-16 flex flex-col justify-between transition-opacity duration-700 w-full min-w-[80vw] lg:min-w-[60vw] h-full ${
                  isActive ? 'opacity-100 pointer-events-auto delay-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                 <div className="flex flex-col lg:flex-row justify-between gap-12">
                   {/* Left Column: Title & Target */}
                   <div className="lg:w-1/2">
                     <span className="inline-block px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800 text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-6 md:mb-8">
                        Package 0{index + 1}
                     </span>
                     <h4 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter mb-4 md:mb-6">
                        {tier.tier_name}
                     </h4>
                     <p className="text-lg md:text-2xl text-slate-400 font-light max-w-xl leading-relaxed">
                        {tier.target_audience}
                     </p>
                   </div>
                   
                   {/* Right Column: Features List */}
                   <div className="lg:w-1/2 flex flex-col justify-center">
                     <h5 className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-6">What's Included</h5>
                     <ul className="space-y-4">
                       {(tier.features_list || '').split('\n').filter(Boolean).map((featureItem, idx) => (
                         <li key={idx} className="flex items-center gap-4 text-slate-300 font-light text-lg md:text-xl">
                           <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                             <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                             </svg>
                           </div>
                           {featureItem}
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-t border-slate-800 pt-8 md:pt-12 mt-8 lg:mt-auto mr-8 md:mr-16">
                    <div className="mb-8 lg:mb-0">
                      <span className="block text-[10px] md:text-xs uppercase tracking-widest text-slate-500 mb-2">Estimated Investment</span>
                      <span className="text-3xl md:text-5xl text-white font-light tracking-tight">{tier.price}</span>
                    </div>
                    
                    <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl border border-transparent bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors duration-300 w-full lg:w-auto">
                      Start Project
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
