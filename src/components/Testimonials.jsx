import React, { useEffect, useState } from 'react';
import pb from '../pb';
import ScrollReveal from './ScrollReveal';

const ReviewCard = ({ text, author, role }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`;
  return (
  <div className="w-[350px] md:w-[450px] shrink-0 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
    <div>
      <div className="flex gap-1 mb-8 text-slate-900">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-light mb-10">"{text}"</p>
    </div>
    
    <div className="flex items-center gap-4 mt-auto">
      <img src={avatarUrl} alt={author} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
      <div>
        <h4 className="font-medium text-slate-900">{author}</h4>
        <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">{role}</p>
      </div>
    </div>
  </div>
  );
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    pb.collection('testimonials').getFullList({ sort: '+created' })
      .then(data => setTestimonials(data))
      .catch(console.error);
  }, []);

  const half = Math.ceil(testimonials.length / 2);
  let row1 = testimonials.slice(0, half);
  let row2 = testimonials.slice(half);

  // Pad the rows to ensure they span the screen width before duplication
  while (row1.length > 0 && row1.length < 8) {
    row1 = [...row1, ...testimonials.slice(0, half)];
  }
  while (row2.length > 0 && row2.length < 8) {
    row2 = [...row2, ...testimonials.slice(half)];
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-slate-50 py-24 md:py-32 overflow-hidden">
      
      <style>{`
        /* 
          We use 12px because it's half of the gap-6 (24px).
          This ensures the duplicated array connects perfectly for a seamless loop.
        */
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); } 
        }
        @keyframes scrollRight {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scrollLeft 35s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 35s linear infinite;
        }
        
        /* Pause only the track that is being hovered */
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Header Container */}
      <ScrollReveal className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-8 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">Client Proof</h2>
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-7xl font-light text-slate-900 tracking-tighter leading-[1.1] max-w-4xl">
          Loved by the best <br className="hidden md:block"/>teams in the world.
        </h3>
      </ScrollReveal>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 md:gap-8 cursor-grab active:cursor-grabbing pb-12">
        
        {/* Track 1: Moving Left */}
        <div className="marquee-track flex gap-6 w-max animate-scroll-left">
          {[...row1, ...row1].map((review, i) => (
            <ReviewCard key={`row1-${i}`} {...review} />
          ))}
        </div>

        {/* Track 2: Moving Right */}
        <div className="marquee-track flex gap-6 w-max animate-scroll-right">
          {[...row2, ...row2].map((review, i) => (
            <ReviewCard key={`row2-${i}`} {...review} />
          ))}
        </div>

      </div>

    </section>
  )
}
