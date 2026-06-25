import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function CTA() {
  return (
    <section className="bg-slate-950 pt-24 pb-8 md:pt-32 md:pb-12 flex flex-col justify-between min-h-[85vh] relative selection:bg-white selection:text-slate-900">
       
       {/* Top Left Label */}
       <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
         <div className="flex items-center gap-4">
           <span className="h-px w-8 bg-slate-700"></span>
           <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">Get in Touch</h2>
         </div>
       </div>

       {/* Asymmetrical Split Layout */}
       <ScrollReveal className="flex-grow flex flex-col lg:flex-row w-full px-6 md:px-12 lg:px-24 gap-16 lg:gap-0 relative z-10">
          
          {/* Left: Huge Typography Hook */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
             <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-white tracking-tighter leading-[1.1] max-w-2xl">
               Let's build <br className="hidden md:block"/>
               <span className="text-slate-600">something extraordinary.</span>
             </h3>
          </div>

          {/* Right: Modern Form Block */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:border-l border-slate-800 lg:pl-20 xl:pl-32 py-8">
             <p className="text-xl md:text-2xl font-light text-slate-400 leading-relaxed mb-16">
               Enter your email below and our engineering team will get back to you within 24 hours to discuss your vision.
             </p>
             
             <form className="w-full relative group" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="hello@yourcompany.com" 
                  className="w-full bg-transparent border-b border-slate-700 pb-6 text-white placeholder-slate-700 focus:outline-none focus:border-white transition-colors duration-500 text-2xl md:text-3xl font-light pr-16 peer"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 bottom-6 flex items-center justify-center text-slate-600 peer-focus:text-white hover:text-white transition-all duration-500"
                >
                   {/* Clean straight arrow, highly modern */}
                   <svg className="w-8 h-8 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                </button>
                {/* Animated active border line */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 ease-out peer-focus:w-full"></div>
             </form>
          </div>

       </ScrollReveal>

    </section>
  )
}
