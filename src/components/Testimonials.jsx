import React from 'react';
import ScrollReveal from './ScrollReveal';

const reviewsRow1 = [
  { id: 1, quote: "They completely re-engineered how we think about our brand. The execution speed was unlike anything we've seen.", author: "Sarah Jenkins", role: "CEO at Vanguard", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { id: 2, quote: "The level of polish and obsession with detail is unmatched. It feels like absolute magic.", author: "David Chen", role: "Founder at Aura", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  { id: 3, quote: "We scaled our entire platform in 3 months. The execution was absolutely flawless.", author: "Elena Rodriguez", role: "VP Product at Lumina", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { id: 4, quote: "Every single deliverable exceeded our expectations. They are true craftsmen.", author: "Michael Chang", role: "CTO at Nexus", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { id: 5, quote: "Pixel Heaven lives up to its name. A truly strategic partner, not just a dev shop.", author: "Olivia Kim", role: "Founder at Stellar", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" },
];

const reviewsRow2 = [
  { id: 6, quote: "Working with them felt like an extension of our own team. Seamless communication.", author: "Jessica Alba", role: "CMO at Honest", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { id: 7, quote: "They transformed our convoluted MVP into a sleek, market-ready enterprise platform.", author: "Robert Fox", role: "Product at Acme", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { id: 8, quote: "I've worked with dozens of agencies. None of them come close to this level of quality.", author: "Leslie Alexander", role: "CEO at Globex", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { id: 9, quote: "An absolute masterclass in digital design. Worth every single penny and then some.", author: "Cameron Williamson", role: "Founder at Stripe", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
  { id: 10, quote: "They didn't just build a website, they built a conversion engine. Revenue is up 40%.", author: "Jenny Wilson", role: "Growth at Shopify", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

const ReviewCard = ({ quote, author, role, image }) => (
  <div className="w-[350px] md:w-[450px] shrink-0 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
    <div>
      <div className="flex gap-1 mb-8 text-slate-900">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-light mb-10">"{quote}"</p>
    </div>
    
    <div className="flex items-center gap-4 mt-auto">
      <img src={image} alt={author} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
      <div>
        <h4 className="font-medium text-slate-900">{author}</h4>
        <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">{role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
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
          {[...reviewsRow1, ...reviewsRow1].map((review, i) => (
            <ReviewCard key={`row1-${i}`} {...review} />
          ))}
        </div>

        {/* Track 2: Moving Right */}
        <div className="marquee-track flex gap-6 w-max animate-scroll-right">
          {[...reviewsRow2, ...reviewsRow2].map((review, i) => (
            <ReviewCard key={`row2-${i}`} {...review} />
          ))}
        </div>

      </div>

    </section>
  )
}
