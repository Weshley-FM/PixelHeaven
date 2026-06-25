import React, { useRef, useEffect, useState } from 'react';

const products = [
  {
    id: 1,
    title: 'Brand Identity',
    category: 'Design System',
    description: 'We craft comprehensive brand systems that command attention and build lasting equity.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/brand-identity-pack',
  },
  {
    id: 2,
    title: 'Web Experiences',
    category: 'Interactive',
    description: 'Immersive, high-performance websites that blur the line between software and art.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/web-ui-kit',
  },
  {
    id: 3,
    title: 'Pitch Decks',
    category: 'Presentations',
    description: 'Fundraising is storytelling. We design cinematic pitch decks that help founders raise millions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/pitch-deck-template',
  }
];

export default function ProductsA() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    // We observe invisible scroll tracks to update the activeIndex cleanly
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Triggers exactly when the section hits the middle of the screen
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
      const sections = containerRef.current.querySelectorAll('.scroll-section');
      sections.forEach(section => observer.observe(section));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-slate-50 relative pb-20" ref={containerRef}>
      
      {/* Crossfading Sequence Container */}
      {/* Total height = (number of products + 1 intro slide) * 100vh */}
      <div className="relative" style={{ height: `${(products.length + 1) * 100}vh` }}>
        
        {/* Invisible Scroll Tracks */}
        <div className="absolute inset-0 w-full pointer-events-none flex flex-col">
           {/* Intro slide track (-1) */}
           <div className="w-full h-screen scroll-section" data-index={-1}></div>
           
           {/* Product slide tracks (0, 1, 2) */}
           {products.map((_, index) => (
             <div key={index} className="w-full h-screen scroll-section" data-index={index}></div>
           ))}
        </div>

        {/* Sticky Visual Layer */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
           
           {/* Static Section Header Logo/Text */}
           {/* Perfectly matches the About Us header position and size */}
           <div className="absolute top-8 left-6 md:top-12 md:left-12 flex items-center gap-4 z-50">
             <span className="h-px w-6 bg-slate-300"></span>
             <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Our Products</h2>
           </div>

           {/* Intro Typography Layer (Index -1) */}
           {/* It stays completely still. Visible ONLY for -1. As soon as product 1 starts rising, it fades out! */}
           <div 
             className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-700 ${
               activeIndex === -1 ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'
             }`}
           >
             <h3 className="text-6xl md:text-[8rem] font-light text-slate-900 tracking-tighter leading-none mb-8">
               The Arsenal.
             </h3>
             <p className="text-xl md:text-3xl text-slate-500 font-light max-w-3xl leading-relaxed">
               We don't just build things, we engineer unfair advantages. Here is the work we do to elevate your brand.
             </p>
           </div>
           
           {/* Product Cards Layer (Index 0, 1, 2) */}
           {products.map((p, index) => {
             // Logic to determine state of card
             // By default, cards are hidden at the bottom of the screen
             let transformClass = 'translate-y-[120vh]';
             let pointerClass = 'pointer-events-none';
             let zIndex = 'z-10';

             if (activeIndex === index) {
               // Active card: Center
               transformClass = 'translate-y-0';
               pointerClass = 'pointer-events-auto';
               zIndex = 'z-20';
             } else if (activeIndex > index) {
               // Card has been passed: It drops fully down
               transformClass = 'translate-y-[120vh]';
               zIndex = 'z-10';
             } else {
               // Card is coming up: Waiting at the bottom
               transformClass = 'translate-y-[120vh]';
             }

             return (
               <div 
                 key={p.id}
                 // NO opacity transitions. Purely transform!
                 className={`absolute top-20 bottom-4 left-4 right-4 md:top-24 md:bottom-8 md:left-8 md:right-8 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-white/20 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${transformClass} ${pointerClass} ${zIndex}`}
               >
                  {/* Background Image */}
                  <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Top Floating Glass Capsule */}
                  <div className="relative z-20 m-4 md:m-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 p-4 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between shadow-xl gap-4">
                     <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                       <span className="text-xs md:text-sm font-semibold tracking-widest text-white/80 uppercase">
                         [{p.category}]
                       </span>
                     </div>
                     
                     <div className="w-full md:w-1/3 flex justify-center text-center">
                       <h3 className="text-xl md:text-3xl font-light text-white tracking-tight">
                         {p.title}
                       </h3>
                     </div>
                     
                     <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                       <a 
                         href={p.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="px-6 py-2.5 md:py-3 bg-white text-slate-900 rounded-full text-xs md:text-sm font-semibold hover:scale-105 transition-transform shadow-lg text-center"
                       >
                         Discover Case
                       </a>
                     </div>
                  </div>

                  {/* Center Content */}
                  <div className="relative z-20 flex-1 flex items-center justify-center p-6 md:p-20 text-center">
                     <p className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight max-w-4xl drop-shadow-2xl">
                       {p.description}
                     </p>
                  </div>
               </div>
             );
           })}
        </div>

      </div>
    </div>
  );
}
