import React, { useState, useEffect, useRef } from 'react';

export default function ScrollReveal({ children, className = "", threshold = 0.1, style = {} }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      // Trigger slightly before the element fully enters to ensure smooth UX
      { threshold, rootMargin: '0px 0px -50px 0px' } 
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
