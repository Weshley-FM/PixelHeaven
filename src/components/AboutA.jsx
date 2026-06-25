import React, { useRef, useEffect, useState } from 'react';

export default function AboutA() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the user has scrolled past this element
      const elementHeight = rect.height;
      const totalScrollableDistance = windowHeight + elementHeight;
      const distanceScrolled = windowHeight - rect.top;
      
      let progress = distanceScrolled / totalScrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const text = "We are a creative agency redefining the web. PixelHeaven is where wild imagination meets meticulous engineering. We don't just build websites; we craft digital experiences that leave a lasting impression on your audience.";
  const words = text.split(' ');

  return (
    <div className="bg-white py-32 md:py-64" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-start">
        <div className="flex items-center gap-4 mb-12">
          <span className="h-px w-8 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">About Us</h2>
        </div>
        
        <p className="text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.2] tracking-tight text-slate-900">
          {words.map((word, i) => {
            // Map the generic scroll progress (0 to 1) to a tighter window (e.g. 0.3 to 0.7)
            // so the effect happens nicely when the text is in the middle of the screen.
            const mappedProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) * 2));
            
            const start = i / words.length;
            
            // Calculate opacity for this specific word
            let opacity = 0.15; // Base faded state
            if (mappedProgress > start) {
              opacity = 1; // Fully lit
            }

            return (
              <span 
                key={i} 
                className="transition-opacity duration-300 ease-out"
                style={{ opacity }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
