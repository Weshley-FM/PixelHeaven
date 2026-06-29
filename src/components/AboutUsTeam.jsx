import React, { useState, useEffect } from 'react';
import pb from '../pb';

export default function AboutUsTeam() {
  const [team, setTeam] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    async function fetchTeam() {
      try {
        const records = await pb.collection('page_about_team').getFullList({
          sort: 'sort_order',
        });
        setTeam(records);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }
    fetchTeam();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="about-team" 
      className="relative w-full bg-slate-50 text-slate-900 py-32 md:py-48 px-6 md:px-12 selection:bg-slate-900 selection:text-white font-sans overflow-hidden cursor-crosshair"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-sm font-bold tracking-widest uppercase mb-16 md:mb-32 text-slate-400">The Architects</h2>
        
        <div className="flex flex-col border-t border-slate-200">
          {team.map((member, index) => (
            <div 
              key={member.id}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-20 border-b border-slate-200"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-thin tracking-tight transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-12 group-hover:text-slate-900 text-slate-400">
                {member.name}
              </h3>
              <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-translate-x-12">
                <p className="text-xl md:text-3xl text-slate-900 font-light">
                  {member.role}
                </p>
                <p className="text-sm md:text-base text-slate-500 mt-3 max-w-[280px] md:text-right opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Images Container */}
      {team.map((member, index) => (
        <div 
          key={`img-${member.id}`}
          className="fixed pointer-events-none z-50 w-64 md:w-[380px] aspect-[3/4] overflow-hidden shadow-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: `translate(-50%, -50%) scale(${hoveredIndex === index ? 1 : 0.85}) rotate(${hoveredIndex === index ? '0deg' : '3deg'})`,
            opacity: hoveredIndex === index ? 1 : 0,
            visibility: hoveredIndex === index ? 'visible' : 'hidden'
          }}
        >
          <img 
            src={member.image_url} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale transition-transform duration-[1.5s] ease-out scale-110"
            style={{
              transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.1)'
            }}
          />
        </div>
      ))}
    </section>
  );
}
