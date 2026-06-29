import React, { useState, useEffect } from 'react';
import pb from '../pb';
import ScrollReveal from './ScrollReveal';

// FAQs are now loaded from the database

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    pb.collection('faqs').getFullList({ sort: '+created' })
      .then(data => setFaqs(data))
      .catch(console.error);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeFaq) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeFaq]);

  return (
    <section className="bg-slate-50 py-24 md:py-32 relative">
       
       {/* Header Container (Matches other sections perfectly) */}
       <ScrollReveal className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
         <div className="flex items-center gap-4 mb-6">
           <span className="h-px w-8 bg-slate-300"></span>
           <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">FAQ</h2>
         </div>
         <h3 className="text-4xl md:text-5xl lg:text-7xl font-light text-slate-900 tracking-tighter leading-[1.1] max-w-4xl">
           Everything you need to <br className="hidden md:block"/>know before we start.
         </h3>
       </ScrollReveal>

       {/* Highly Structured Editorial Keyword List */}
       <ScrollReveal className="px-6 md:px-12 lg:px-24 flex flex-col w-full pb-32">
          {faqs.map((faq, index) => (
             <button
               key={index}
               onClick={() => setActiveFaq(faq)}
               className="group flex items-center justify-between border-t border-slate-200 py-8 md:py-12 text-left transition-colors duration-500 hover:bg-slate-100/50 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24"
             >
                <div className="flex items-start md:items-center gap-8 md:gap-16 w-full">
                   <span className="text-sm font-semibold tracking-widest text-slate-400 mt-2 md:mt-0">
                     0{index + 1}
                   </span>
                   <span className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-slate-900 group-hover:translate-x-4 transition-transform duration-500 max-w-3xl pr-4">
                     {faq.question}
                   </span>
                </div>
                
                {/* Geometric Button Matching the Testimonials UI */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300 shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </div>
             </button>
          ))}
          <div className="border-t border-slate-200 w-full"></div>
       </ScrollReveal>

       {/* Overlay */}
       <div 
         className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-700 ${
           activeFaq ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
         }`}
         onClick={() => setActiveFaq(null)}
       ></div>

       {/* Full Screen Sliding Bottom Sheet (Clean White Variant) */}
       <div 
         className={`fixed inset-x-0 bottom-0 z-50 flex flex-col h-[90vh] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
           activeFaq ? 'translate-y-0' : 'translate-y-full'
         }`}
       >
          {/* Pristine White Modal Panel */}
          <div className="flex-grow bg-white rounded-t-[2.5rem] shadow-[0_-40px_100px_rgba(0,0,0,0.1)] flex flex-col relative overflow-y-auto">
             
             {/* Sticky Header */}
             <div className="sticky top-0 bg-white/90 backdrop-blur-md flex justify-between items-center p-6 md:p-12 lg:p-16 border-b border-slate-100 z-10">
                <span className="text-xs md:text-sm tracking-widest uppercase text-slate-500 font-semibold">
                  Inquiry // FAQ
                </span>
                <button 
                  onClick={() => setActiveFaq(null)}
                  className="flex items-center gap-4 group text-slate-500 hover:text-slate-900 transition-colors"
                >
                   <span className="hidden md:block text-xs uppercase tracking-widest font-bold">Close</span>
                   <div className="w-10 h-10 rounded-2xl border border-slate-200 flex items-center justify-center group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </div>
                </button>
             </div>

             {/* Content */}
             <div className="flex-grow flex items-center justify-center p-6 md:p-12 lg:p-24">
                <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
                   <div className="w-full lg:w-1/2">
                      <h4 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight leading-[1.1] mb-8 lg:mb-0">
                        {activeFaq?.question}
                      </h4>
                   </div>
                   <div className="w-full lg:w-1/2 flex items-center">
                      <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                        {activeFaq?.answer}
                      </p>
                   </div>
                </div>
             </div>

          </div>
       </div>

    </section>
  )
}
