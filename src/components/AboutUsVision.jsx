import React, { useState, useEffect } from 'react';
import pb from '../pb';

export default function AboutUsVision() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    pb.collection('page_about_vision').getFirstListItem('')
      .then(data => setContent(data))
      .catch(err => console.error("About Vision fetch error:", err));
  }, []);

  return (
    <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        
        {/* Left Side: Typography */}
        <div className="w-full md:w-1/2">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">
            {content?.section_label || 'Our Philosophy'}
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
            {content?.title || 'Design is not just what it looks like. Design is how it works.'}
          </h3>
          <div className="space-y-6 text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            <p>
              {content?.paragraph_1 || 'We believe in stripping away the unnecessary. In a world full of noise and bloated interfaces, clarity is the ultimate sophistication. Our process is rooted in deep understanding, allowing us to build solutions that are not only beautiful but profoundly effective.'}
            </p>
            <p>
              {content?.paragraph_2 || 'Every pixel has a purpose. Every line of code is intentional. We don\'t just deliver projects; we engineer long-lasting digital infrastructure that empowers your brand to scale seamlessly into the future.'}
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              <img className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Team member" />
              <img className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="Team member" />
              <img className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" alt="Team member" />
            </div>
            <div className="text-sm font-light text-slate-300">
              {content?.team_text || 'Join 40+ visionary creators.'}
            </div>
          </div>
        </div>

        {/* Right Side: Abstract Visual */}
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden group">
            <img 
              src={content?.visual_url || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop'} 
              alt="Abstract Vision" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-80"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-8 rounded-2xl shadow-2xl animate-[float_6s_ease-in-out_infinite]">
            <div className="text-4xl font-light mb-1">
              {content?.badge_number || '100%'}
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-slate-400">
              {content?.badge_label || 'Independent'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
