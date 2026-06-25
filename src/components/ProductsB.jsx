import React, { useState, useRef, useEffect } from 'react';

const products = [
  {
    id: 1,
    title: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/brand-identity-pack',
  },
  {
    id: 2,
    title: 'Web Experiences',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/web-ui-kit',
  },
  {
    id: 3,
    title: 'Pitch Decks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: 'https://ui8.net/jobnation/products/pitch-deck-template',
  }
];

export default function ProductsB() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  // Custom cursor logic for the floating image
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current || hoveredIndex === null) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Use requestAnimationFrame for buttery smooth tracking
      requestAnimationFrame(() => {
        if (imageRef.current) {
           imageRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredIndex]);

  return (
    <div className="bg-slate-50 py-32 md:py-48 relative overflow-hidden" ref={containerRef}>
      
      {/* Floating Image Cursor */}
      <div 
        ref={imageRef}
        className={`fixed top-0 left-0 w-72 h-96 pointer-events-none z-50 transition-opacity duration-300 ease-out flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
      >
        {products.map((p, index) => (
           <img 
             key={p.id}
             src={p.image}
             alt={p.title}
             className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 transform ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
           />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400 mb-20 text-center">
          Option B: Minimalist Reveal
        </h2>
        
        <div className="flex flex-col border-b border-slate-200">
          {products.map((p, index) => (
            <a 
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-slate-200 py-12 md:py-24 relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center justify-between z-10 relative px-4 md:px-12 transition-transform duration-500 ease-out group-hover:translate-x-8">
                <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-bold text-slate-900 tracking-tighter uppercase transition-colors duration-300 group-hover:text-slate-300">
                  {p.title}
                </h3>
                <span className="hidden md:block text-2xl text-slate-400 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Case
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
