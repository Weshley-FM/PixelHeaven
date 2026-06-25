import React, { useState } from 'react';

const products = [
  {
    id: 1,
    title: 'Brand Identity',
    description: 'We craft comprehensive brand systems that command attention and build lasting equity. From minimalist logos to complete visual languages.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/brand-identity-pack',
  },
  {
    id: 2,
    title: 'Web Experiences',
    description: 'Immersive, high-performance websites that blur the line between software and art. Built for conversion, engineered for awe.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/web-ui-kit',
  },
  {
    id: 3,
    title: 'Pitch Decks',
    description: 'Fundraising is storytelling. We design cinematic pitch decks that help founders raise millions from top-tier VCs.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/pitch-deck-template',
  }
];

export default function ProductsC() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="bg-slate-950 py-32 md:py-48 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl w-full px-4 md:px-8 relative z-10 text-center mb-16 md:mb-24">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400 mb-6">
          Option C: 3D Glass Carousel
        </h2>
        <h3 className="text-5xl md:text-7xl font-light text-white tracking-tight">Our Arsenal</h3>
      </div>
      
      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center perspective-[1200px]">
        {products.map((p, index) => {
          
          const offset = index - activeIndex;
          
          let transformStyles = '';
          let opacityStyle = '';
          let zIndex = 10;
          
          if (offset === 0) {
            transformStyles = 'translateX(0%) translateZ(0px) rotateY(0deg) scale(1)';
            opacityStyle = 'opacity-100';
            zIndex = 30;
          } else if (offset === -1) {
            transformStyles = 'translateX(-60%) translateZ(-200px) rotateY(20deg) scale(0.85)';
            opacityStyle = 'opacity-40 hover:opacity-70 blur-[3px]';
            zIndex = 20;
          } else if (offset === 1) {
            transformStyles = 'translateX(60%) translateZ(-200px) rotateY(-20deg) scale(0.85)';
            opacityStyle = 'opacity-40 hover:opacity-70 blur-[3px]';
            zIndex = 20;
          } else {
            // Fallbacks if you ever add more than 3 products
            transformStyles = `translateX(${offset * 80}%) translateZ(-400px) scale(0.6)`;
            opacityStyle = 'opacity-0 pointer-events-none';
            zIndex = 0;
          }

          return (
            <div 
              key={p.id}
              onClick={() => setActiveIndex(index)}
              className={`absolute w-[85%] md:w-[600px] h-[450px] md:h-[550px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${opacityStyle}`}
              style={{ 
                transform: transformStyles,
                zIndex: zIndex,
                transformStyle: 'preserve-3d'
              }}
            >
               {/* Glass Card */}
               <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col group">
                 {/* Image */}
                 <div className="h-[45%] w-full overflow-hidden relative">
                   <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                 </div>
                 
                 {/* Content */}
                 <div className="h-[55%] w-full p-8 md:p-10 flex flex-col justify-between bg-slate-900/60">
                    <div>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter">{p.title}</h4>
                      <p className="text-slate-400 font-light leading-relaxed line-clamp-3 text-lg md:text-xl">{p.description}</p>
                    </div>
                    
                    <div className="mt-6">
                      <a 
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (offset !== 0) e.preventDefault(); // Don't follow link if clicking a side card
                        }}
                        className={`inline-flex items-center gap-3 font-semibold text-white transition-all duration-300 ${offset === 0 ? 'opacity-100 hover:gap-5' : 'opacity-0 pointer-events-none'}`}
                      >
                        Explore Product
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                 </div>
               </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="flex gap-4 mt-12 md:mt-20 z-10 relative">
        {products.map((_, idx) => (
           <button 
             key={idx}
             onClick={() => setActiveIndex(idx)}
             className={`h-2 rounded-full transition-all duration-500 ease-out ${activeIndex === idx ? 'bg-white w-12' : 'bg-white/20 hover:bg-white/40 w-2'}`}
             title={`Go to slide ${idx + 1}`}
           />
        ))}
      </div>
    </div>
  );
}
