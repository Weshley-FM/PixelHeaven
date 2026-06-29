import React, { useEffect, useState } from 'react';
import pb from '../../pb';
import ScrollReveal from '../ScrollReveal';

export default function ServiceWebDevFeatures() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const records = await pb.collection('page_webdev_features').getFullList({ sort: '-created' });
        setFeatures(records);
      } catch (err) {
        console.error("Failed to load web dev features:", err);
      }
    };
    fetchFeatures();
  }, []);

  if (features.length === 0) return null;

  return (
    <section className="bg-slate-900 text-white py-32 md:py-48 relative selection:bg-white selection:text-slate-900">
      
      {/* Corner Label */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 pointer-events-none">
        <div className="flex items-center gap-4 w-fit">
          <span className="h-px w-6 bg-slate-600"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">The Anatomy</h2>
        </div>
      </div>

      <div className="max-w-[90vw] 2xl:max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">
        
        {/* Massive Section Header */}
        <ScrollReveal className="mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24 border-b border-slate-800 pb-16">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-100 tracking-tighter leading-[1.1]">
              Unfair Advantages.
            </h3>
            <p className="text-slate-400 font-light max-w-sm text-lg leading-relaxed lg:text-right shrink-0">
              We don't build generic templates. We engineer digital infrastructure designed to dominate your market.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean, Divided 3-Column Grid matching exactly the style of UI/UX Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-y-24 divide-y md:divide-y-0 lg:divide-x divide-slate-800 border-t lg:border-t-0 border-slate-800 pt-16 lg:pt-0">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.id} threshold={0.2} className="h-full">
              <div className="flex flex-col h-full group pt-8 md:pt-0 lg:px-12">
                
                {/* Fixed height container for Number to force alignment */}
                <div className="h-24 md:h-32 flex items-start mb-8">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-light text-slate-700 group-hover:-translate-y-3 transition-transform duration-500 block leading-none">
                    0{index + 1}
                  </span>
                </div>
                
                <div className="flex flex-col flex-grow">
                  {/* Fixed height container for Title to force alignment even if text wraps */}
                  <div className="h-20 flex items-start mb-6">
                    <h4 className="text-2xl md:text-3xl font-medium text-slate-100 leading-snug">
                      {feature.title}
                    </h4>
                  </div>
                  
                  <p className="text-lg font-light text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
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
