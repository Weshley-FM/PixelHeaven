import React, { useRef, useEffect, useState } from 'react';
import pb from '../pb';

// We will now fetch projects from our backend API

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const imageContainerRef = useRef(null);

  useEffect(() => {
    pb.collection('projects').getFullList({ sort: '-created' })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let animationFrameId;
    let currentX = cursorRef.current.x;
    let currentY = cursorRef.current.y;

    const onMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp (Linear Interpolation) for buttery smooth spring-like trailing
      currentX += (cursorRef.current.x - currentX) * 0.1;
      currentY += (cursorRef.current.y - currentY) * 0.1;

      if (imageContainerRef.current) {
        // Offset by half width/height so cursor is dead center of the image
        // 400px width = -200 offset, 500px height = -250 offset
        imageContainerRef.current.style.transform = `translate3d(${currentX - 200}px, ${currentY - 250}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="bg-slate-50 py-32 relative">
      
      {/* Floating Image Cursor Container */}
      <div 
        ref={imageContainerRef}
        className={`fixed top-0 left-0 w-[400px] h-[500px] pointer-events-none z-50 overflow-hidden rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hidden md:block ${
          hoveredIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {projects.map((p, index) => (
          <img 
            key={p.id}
            src={p.image} 
            alt={p.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Subtle glass overlay inside the floating image */}
        <div className="absolute inset-0 bg-slate-900/10"></div>
      </div>

      {/* Sticky Section Header */}
      <div className="sticky top-8 md:top-12 z-20 pointer-events-none px-6 md:px-12 w-full">
        <div className="flex items-center gap-4 w-fit">
          <span className="h-px w-6 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Project</h2>
        </div>
      </div>

      {/* Section Content */}
      <div className="max-w-[90vw] md:max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        
        {/* Minimalist Typography List */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 font-medium">Loading projects...</div>
        ) : (
          <ul className="flex flex-col w-full border-t border-slate-200">
            {projects.map((p, index) => (
              <li 
                key={p.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b border-slate-200 cursor-pointer overflow-hidden"
              >
                
                {/* Animated background fill on hover */}
                <div className="absolute inset-0 bg-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10"></div>

                {/* Title */}
                <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-light text-slate-900 tracking-tighter group-hover:translate-x-8 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  {p.title}
                </h3>

                {/* Meta */}
                <div className="mt-6 md:mt-0 flex gap-6 md:gap-12 items-center opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:-translate-x-8 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <span className="text-lg md:text-2xl font-light text-slate-600 uppercase tracking-widest">
                    {p.category}
                  </span>
                  <span className="text-lg md:text-2xl font-light text-slate-400">
                    /{p.year}
                  </span>
                </div>

              </li>
            ))}
            {projects.length === 0 && (
              <div className="py-20 text-center text-slate-400 font-medium">No projects found. Add some in the CMS!</div>
            )}
          </ul>
        )}

      </div>
    </section>
  );
}
