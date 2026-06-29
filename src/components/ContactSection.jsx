import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const services = ['UI/UX Design', 'Web Dev', 'Custom Software', 'Social Media'];
  const budgets = ['< $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

  return (
    <section className="bg-white pt-16 pb-16 md:pt-24 md:pb-32 flex flex-col justify-between min-h-screen relative selection:bg-slate-900 selection:text-white text-slate-900">
       
       {/* Top Left Label */}
       <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
         <div className="flex items-center gap-4">
           <span className="h-px w-8 bg-slate-300"></span>
           <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Get in Touch</h2>
         </div>
       </div>

       {/* Asymmetrical Split Layout */}
       <ScrollReveal className="flex-grow flex flex-col lg:flex-row w-full px-6 md:px-12 lg:px-24 gap-16 lg:gap-0 relative z-10">
          
          {/* Left: Huge Typography Hook & Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between lg:pr-16">
            <div>
              <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light tracking-tighter leading-[1.1] max-w-2xl text-slate-900 mb-8">
                Let's build something extraordinary.
              </h3>
              <p className="text-xl md:text-2xl font-light text-slate-500 leading-relaxed max-w-lg mb-16">
                Fill out the form to tell us about your vision. Our engineering team will get back to you within 24 hours.
              </p>
            </div>

            {/* Direct Contact Info */}
            <div className="flex flex-col gap-10 lg:pb-12">
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase text-slate-300 mb-2 block">Direct Email</span>
                <a href="mailto:hello@pixelheaven.com" className="text-2xl font-light text-slate-900 hover:text-slate-500 transition-colors">hello@pixelheaven.com</a>
              </div>
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase text-slate-300 mb-2 block">Office</span>
                <p className="text-xl font-light text-slate-600">
                  123 Pixel Avenue,<br />
                  Creative District, SF 94103
                </p>
              </div>
            </div>
          </div>

          {/* Right: Modern Complex Form Block */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:border-l border-slate-200 lg:pl-20 xl:pl-32 py-8">
             <form className="w-full flex flex-col gap-12" onSubmit={handleSubmit}>
                
                {/* Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="What's your name? *"
                    required
                    className="w-full bg-transparent border-b border-slate-300 pb-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors duration-500 text-2xl font-light peer"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email address *"
                    required
                    className="w-full bg-transparent border-b border-slate-300 pb-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors duration-500 text-2xl font-light peer"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>

                {/* Company */}
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Company name (Optional)"
                    className="w-full bg-transparent border-b border-slate-300 pb-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors duration-500 text-2xl font-light peer"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>

                {/* Services Pills */}
                <div>
                  <span className="text-sm font-semibold tracking-widest uppercase text-slate-400 mb-6 block">How can we help?</span>
                  <div className="flex flex-wrap gap-3">
                    {services.map(svc => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({...formData, service: svc})}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                          formData.service === svc 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                            : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Pills */}
                <div>
                  <span className="text-sm font-semibold tracking-widest uppercase text-slate-400 mb-6 block">Project Budget</span>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map(bg => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setFormData({...formData, budget: bg})}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                          formData.budget === bg 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                            : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea 
                    placeholder="Tell us about your project... *"
                    required
                    rows="3"
                    className="w-full bg-transparent border-b border-slate-300 pb-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition-colors duration-500 text-2xl font-light peer resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-slate-900 transition-all duration-500 ease-out peer-focus:w-full"></div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="group flex items-center gap-6 mt-4 self-start"
                >
                   <span className="text-3xl font-light tracking-tight text-slate-900 group-hover:text-slate-500 transition-colors duration-500">Send Inquiry</span>
                   <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500 overflow-hidden">
                     <svg className="w-6 h-6 text-slate-900 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                   </div>
                </button>

             </form>
          </div>

       </ScrollReveal>

    </section>
  );
}
