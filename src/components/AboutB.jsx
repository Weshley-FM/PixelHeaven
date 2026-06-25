import React from 'react';

export default function AboutB() {
  return (
    <div className="bg-slate-50 py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-16">
          <span className="h-px w-8 bg-slate-300"></span>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-400">Option B: The Bento Grid</h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px]">
          
          {/* Main Mission Card (Spans 2 columns, 2 rows) */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-[2rem] p-10 md:p-14 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col justify-end relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
            <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out">
              <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-slate-900 max-w-xl z-10">
              We build digital products that people love to use.
            </h3>
            <p className="text-slate-500 mt-8 text-lg md:text-xl max-w-md z-10 leading-relaxed">
              PixelHeaven is a creative agency focused on redefining web experiences through modern design and flawless engineering.
            </p>
          </div>

          {/* Stats Card 1 */}
          <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <span className="text-slate-400 font-medium text-sm tracking-widest uppercase">Projects Delivered</span>
            <span className="text-7xl font-bold tracking-tighter text-slate-900">100+</span>
          </div>

          {/* Stats Card 2 */}
          <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl shadow-slate-900/20 border border-slate-800 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <span className="text-slate-400 font-medium text-sm tracking-widest uppercase">Client Satisfaction</span>
            <div className="flex items-end gap-2">
              <span className="text-7xl font-bold tracking-tighter text-white">99</span>
              <span className="text-4xl font-bold tracking-tighter text-blue-400 pb-2">%</span>
            </div>
          </div>

          {/* Abstract Image/Vibe Card */}
          <div className="md:col-span-3 h-[240px] bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-[2rem] p-10 shadow-inner flex items-center justify-center overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[80px] rounded-[2rem]"></div>
            
            {/* Animated floating orbs in background */}
            <div className="absolute w-64 h-64 bg-blue-400/30 rounded-full blur-3xl -left-10 top-0 group-hover:translate-x-20 transition-transform duration-1000 ease-out"></div>
            <div className="absolute w-64 h-64 bg-purple-400/30 rounded-full blur-3xl -right-10 bottom-0 group-hover:-translate-x-20 transition-transform duration-1000 ease-out"></div>

            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 z-10 drop-shadow-sm flex items-center gap-4">
              Creativity knows no bounds
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-800 group-hover:translate-x-4 transition-transform duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
}
