import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from '../ScrollReveal';

// Custom Reveal for the Horizontal Slides
function HorizontalReveal({ children, delay = 0, className = '' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 } // Triggers as soon as 10% is visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'} ${className}`}
    >
      {children}
    </div>
  );
}

const solutions = [
  {
    title: 'Website Design',
    description: 'Crafting responsive, high-conversion web experiences that captivate users and elevate your brand.',
    tag: '01',
    features: ['Responsive Layouts', 'Conversion Optimization', 'SEO-friendly Structure'],
    tools: ['Figma', 'Webflow', 'React', 'TailwindCSS'],
    process: ['1. Strategy & Research', '2. Wireframing & UX', '3. Visual Design (UI)', '4. Development & Handoff'],
    outcomes: 'A visually stunning, high-performing website that turns passive visitors into engaged, loyal customers.',
    layout: 1
  },
  {
    title: 'Mobile App Design',
    description: 'Intuitive iOS and Android interfaces designed for engagement, retention, and seamless user journeys.',
    tag: '02',
    features: ['Native iOS & Android', 'Micro-interactions', 'Gesture-based Navigation'],
    tools: ['Figma', 'Framer', 'SwiftUI', 'React Native'],
    process: ['1. User Journey Mapping', '2. Low-Fidelity Prototyping', '3. High-Fidelity UI Design', '4. Motion & Interaction'],
    outcomes: 'An addictive, frictionless mobile experience that users want to keep on their home screens forever.',
    layout: 2
  },
  {
    title: 'Dashboard Design',
    description: 'Simplifying complex data into elegant, actionable, and user-friendly administrative interfaces.',
    tag: '03',
    features: ['Data Visualization', 'User Permissions', 'Real-time Analytics'],
    tools: ['Figma', 'D3.js', 'Chart.js', 'Storybook'],
    process: ['1. Data Architecture', '2. Dashboard Wireframes', '3. Component Library Setup', '4. Visual Data Styling'],
    outcomes: 'A powerful, easy-to-read dashboard that empowers your team to make rapid, data-driven decisions.',
    layout: 3
  },
  {
    title: 'Wireframing',
    description: 'Strategic structural planning that aligns user needs with business goals before visual design begins.',
    tag: '04',
    features: ['User Flows', 'Information Architecture', 'Low-fidelity Mockups'],
    tools: ['Balsamiq', 'Figma', 'Miro', 'Whimsical'],
    process: ['1. Requirement Gathering', '2. User Persona Creation', '3. Structural Mapping', '4. Interactive Greyscale Prototype'],
    outcomes: 'A rock-solid structural foundation that prevents costly redesigns and misalignments during development.',
    layout: 4
  },
  {
    title: 'Design System',
    description: 'Comprehensive UI kits and guidelines ensuring visual consistency and scalable development.',
    tag: '05',
    features: ['Component Libraries', 'Typography Guidelines', 'Token Management'],
    tools: ['Figma', 'Zeroheight', 'Storybook', 'Tokens Studio'],
    process: ['1. UI Audit', '2. Foundation Setup (Colors, Typos)', '3. Component Building', '4. Documentation generation'],
    outcomes: 'A single source of truth that drastically speeds up design and development across your entire organization.',
    layout: 5
  },
  {
    title: 'Interaction Design',
    description: 'Subtle micro-animations and intuitive feedback loops that bring your digital products to life.',
    tag: '06',
    features: ['State Animations', 'Haptic Feedback Cues', 'Seamless Transitions'],
    tools: ['Framer', 'Protopie', 'After Effects', 'Lottie'],
    process: ['1. Interaction Audit', '2. Motion Storyboarding', '3. High-Fidelity Animation', '4. Developer Handoff Specs'],
    outcomes: 'A fluid, highly responsive product that feels alive and deeply satisfies the user with every interaction.',
    layout: 6
  }
];

const Slide2Features = ({ solution }) => {
  const { layout, features, tools } = solution;

  if (layout === 1) {
    return (
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center h-full">
        <div className="lg:w-1/2">
          <HorizontalReveal delay={100}><h3 className="text-5xl md:text-7xl font-light mb-12 text-slate-900">Key Features</h3></HorizontalReveal>
          <div className="flex flex-col gap-6">
            {features.map((feature, i) => (
              <HorizontalReveal delay={200 + (i * 100)} key={i}>
                <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 transition-transform duration-500 hover:translate-x-2">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-light flex-shrink-0">0{i + 1}</div>
                  <h4 className="text-2xl font-light text-slate-900">{feature}</h4>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <HorizontalReveal delay={100}><h3 className="text-5xl md:text-7xl font-light mb-12 text-slate-900">Tech & Tools</h3></HorizontalReveal>
          <div className="grid grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <HorizontalReveal delay={300 + (i * 100)} key={i}>
                <div className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-sm border border-slate-100 transition-transform duration-500 hover:scale-105">
                  <div className="w-16 h-16 bg-slate-50 rounded-full mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span className="text-xl font-light text-slate-700">{tool}</span>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (layout === 2) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <HorizontalReveal delay={100}><h3 className="text-5xl md:text-7xl font-light mb-16 text-slate-900 text-center">Core Mechanics</h3></HorizontalReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="h-[22rem] bg-white rounded-[2rem] p-10 flex flex-col justify-between border border-slate-100 shadow-xl hover:-translate-y-4 transition-transform duration-500 group">
                <div className="text-6xl font-light text-slate-100 transition-colors group-hover:text-slate-300">0{i + 1}</div>
                <h4 className="text-3xl font-light text-slate-900">{feature}</h4>
              </div>
            </HorizontalReveal>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool, i) => (
            <HorizontalReveal delay={500 + (i * 100)} key={i}>
              <div className="px-8 py-4 rounded-full border border-slate-200 bg-white text-slate-600 text-xl font-light hover:bg-slate-900 hover:text-white transition-colors cursor-default shadow-sm">{tool}</div>
            </HorizontalReveal>
          ))}
        </div>
      </div>
    );
  }

  if (layout === 3) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="col-span-2 p-12 md:p-20 bg-white">
            <HorizontalReveal delay={100}><h3 className="text-4xl md:text-5xl font-light text-slate-900 mb-12">Data Intelligence</h3></HorizontalReveal>
            <div className="grid grid-cols-3 gap-12">
              {features.map((feature, i) => (
                <HorizontalReveal delay={200 + (i * 100)} key={i}>
                  <div className="border-t-2 border-slate-900 pt-6">
                    <h4 className="text-2xl font-light text-slate-900">{feature}</h4>
                  </div>
                </HorizontalReveal>
              ))}
            </div>
          </div>
          <div className="col-span-2 p-12 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between">
            <HorizontalReveal delay={400}><span className="text-xl font-light text-slate-400">Powered By</span></HorizontalReveal>
            <div className="flex flex-wrap gap-12">
              {tools.map((tool, i) => (
                <HorizontalReveal delay={500 + (i * 100)} key={i}><span className="text-2xl font-medium">{tool}</span></HorizontalReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 4) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <HorizontalReveal delay={100}><h3 className="text-6xl md:text-8xl font-light mb-16 text-slate-900 uppercase tracking-tighter">Blueprint Structure</h3></HorizontalReveal>
        <div className="border-y border-slate-300 divide-y divide-slate-300 mb-16">
          {features.map((feature, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="py-8 flex items-center justify-between group hover:bg-white transition-colors px-4">
                <span className="text-2xl font-mono text-slate-400">[{i + 1}]</span>
                <h4 className="text-3xl md:text-5xl font-light text-slate-900">{feature}</h4>
                <div className="w-12 h-12 border border-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-2 h-2 bg-slate-900 rounded-full"></span>
                </div>
              </div>
            </HorizontalReveal>
          ))}
        </div>
        <HorizontalReveal delay={500}>
          <div className="flex gap-8 items-center font-mono text-slate-500 uppercase tracking-widest text-sm">
            <span>Stack:</span>
            {tools.map((tool, i) => (
              <span key={i} className="border border-slate-300 px-4 py-2">{tool}</span>
            ))}
          </div>
        </HorizontalReveal>
      </div>
    );
  }

  if (layout === 5) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <HorizontalReveal delay={100}><h3 className="text-5xl md:text-7xl font-light mb-12 text-slate-900 text-center">Modular Components</h3></HorizontalReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="p-10 bg-white border border-slate-200 rounded-3xl flex items-center justify-center h-48 hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl text-center">
                <h4 className="text-2xl font-light">{feature}</h4>
              </div>
            </HorizontalReveal>
          ))}
        </div>
        <HorizontalReveal delay={400}><h3 className="text-2xl font-light mb-8 text-slate-500 text-center uppercase tracking-widest">Asset Management</h3></HorizontalReveal>
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, i) => (
            <HorizontalReveal delay={500 + (i * 100)} key={i}>
              <div className="px-10 py-6 rounded-3xl bg-slate-200 flex items-center justify-center text-slate-700 font-medium hover:scale-105 transition-transform">
                {tool}
              </div>
            </HorizontalReveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center items-center text-center">
      <HorizontalReveal delay={100}><h3 className="text-5xl md:text-7xl font-light mb-16 text-slate-900">Dynamic Motion</h3></HorizontalReveal>
      <div className="flex flex-col gap-6 w-full max-w-2xl mb-16">
        {features.map((feature, i) => (
          <HorizontalReveal delay={200 + (i * 100)} key={i}>
            <div className={`bg-white border border-slate-100 shadow-md rounded-full px-12 py-6 relative w-fit transition-transform duration-500 hover:scale-105 ${i % 2 === 0 ? 'mr-auto translate-x-4 md:translate-x-12' : 'ml-auto -translate-x-4 md:-translate-x-12'}`}>
              <h4 className="text-2xl font-light text-slate-900">{feature}</h4>
            </div>
          </HorizontalReveal>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {tools.map((tool, i) => (
          <HorizontalReveal delay={500 + (i * 100)} key={i}>
            <div className="bg-slate-900 text-white rounded-full px-8 py-4 shadow-xl hover:-translate-y-2 transition-transform font-medium tracking-wide">
              {tool}
            </div>
          </HorizontalReveal>
        ))}
      </div>
    </div>
  );
};

const Slide3Process = ({ solution }) => {
  const { layout, process, outcomes } = solution;

  if (layout === 1) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <HorizontalReveal delay={100}>
          <div className="mb-16"><h3 className="text-sm tracking-widest uppercase font-medium text-slate-400 mb-4">Our Approach</h3><h2 className="text-4xl md:text-6xl font-light text-slate-900 tracking-tight">The Process</h2></div>
        </HorizontalReveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {process.map((step, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}><div className="p-8 border border-slate-100 rounded-3xl bg-slate-50 transition-colors hover:bg-slate-900 hover:text-white group h-full"><h4 className="text-xl font-light text-slate-900 group-hover:text-white">{step}</h4></div></HorizontalReveal>
          ))}
        </div>
        <HorizontalReveal delay={400}>
          <div className="p-12 md:p-16 bg-slate-900 rounded-3xl text-white"><h3 className="text-sm tracking-widest uppercase font-medium text-slate-400 mb-6">The Outcome</h3><p className="text-3xl md:text-5xl font-light leading-tight">{outcomes}</p></div>
        </HorizontalReveal>
      </div>
    );
  }

  if (layout === 2) {
    return (
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-center h-full">
        <HorizontalReveal delay={100}><h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-20 text-center">Pipeline Sequence</h2></HorizontalReveal>
        <div className="relative mb-24 hidden md:block">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300 -translate-y-1/2"></div>
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {process.map((step, i) => (
              <HorizontalReveal delay={200 + (i * 100)} key={i}>
                <div className="flex flex-col items-center gap-6 text-center bg-transparent">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-medium border-4 border-slate-50 shadow-lg">0{i + 1}</div>
                  <h4 className="text-xl font-light text-slate-800 bg-slate-50 px-4 py-2">{step.replace(/^\d+\.\s*/, '')}</h4>
                </div>
              </HorizontalReveal>
            ))}
          </div>
        </div>
        
        {/* Mobile fallback for pipeline */}
        <div className="flex flex-col gap-8 mb-20 md:hidden">
            {process.map((step, i) => (
              <HorizontalReveal delay={200 + (i * 100)} key={i}>
                <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-medium flex-shrink-0">0{i + 1}</div>
                  <h4 className="text-xl font-light text-slate-800">{step.replace(/^\d+\.\s*/, '')}</h4>
                </div>
              </HorizontalReveal>
            ))}
        </div>

        <HorizontalReveal delay={500}>
          <div className="text-center max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-lg tracking-widest uppercase text-slate-400 mb-6 font-medium">The Impact</h3>
            <p className="text-3xl md:text-5xl font-light leading-tight text-slate-900">"{outcomes}"</p>
          </div>
        </HorizontalReveal>
      </div>
    );
  }

  if (layout === 3) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between py-12">
        <HorizontalReveal delay={100}><h2 className="text-5xl font-light text-slate-900 mb-12">Implementation Matrix</h2></HorizontalReveal>
        <div className="grid grid-cols-2 gap-4 mb-12">
          {process.map((step, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="p-10 bg-slate-50 border border-slate-200">
                <h4 className="text-2xl font-light text-slate-900">{step}</h4>
              </div>
            </HorizontalReveal>
          ))}
        </div>
        <HorizontalReveal delay={500}>
          <div className="border-t-4 border-slate-900 pt-8 flex justify-between items-end"><h3 className="text-xl text-slate-500 uppercase tracking-widest">Delivery</h3><p className="text-3xl font-light text-slate-900 max-w-3xl text-right">{outcomes}</p></div>
        </HorizontalReveal>
      </div>
    );
  }

  if (layout === 4) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between gap-16">
        <div className="w-1/2 flex flex-col gap-12 border-l-2 border-slate-200 pl-12 py-8">
          {process.map((step, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="relative"><div className="absolute -left-[58px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div><h4 className="text-3xl font-light text-slate-900">{step}</h4></div>
            </HorizontalReveal>
          ))}
        </div>
        <div className="w-1/2">
          <HorizontalReveal delay={500}>
            <div className="border-2 border-slate-900 p-12 relative"><div className="absolute top-0 right-0 p-2 bg-slate-900 text-white text-xs font-mono">TARGET OUTCOME</div><p className="text-4xl font-light leading-tight text-slate-900 mt-8">{outcomes}</p></div>
          </HorizontalReveal>
        </div>
      </div>
    );
  }

  if (layout === 5) {
    return (
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
        <HorizontalReveal delay={100}><h2 className="text-5xl font-light text-slate-900 mb-16 text-center">Integration Process</h2></HorizontalReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {process.map((step, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="aspect-square rounded-3xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center bg-white hover:bg-slate-900 hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-sm">
                <span className="text-4xl font-light mb-4 opacity-30">0{i+1}</span>
                <h4 className="text-xl font-medium">{step.replace(/^\d+\.\s*/, '')}</h4>
              </div>
            </HorizontalReveal>
          ))}
        </div>
        <HorizontalReveal delay={500}>
          <div className="bg-slate-900 text-white p-12 text-center rounded-[2rem] mx-auto max-w-4xl shadow-2xl">
            <h3 className="text-sm tracking-widest uppercase text-slate-400 mb-6 font-medium">End Result</h3>
            <p className="text-3xl font-light leading-relaxed">{outcomes}</p>
          </div>
        </HorizontalReveal>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <HorizontalReveal delay={100}><h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-12">Evolution Phase</h2></HorizontalReveal>
          {process.map((step, i) => (
            <HorizontalReveal delay={200 + (i * 100)} key={i}>
              <div className="bg-slate-50 border border-slate-100 px-10 py-6 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-500 w-full flex items-center justify-between group shadow-sm">
                <h4 className="text-xl font-light">{step}</h4>
                <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </HorizontalReveal>
          ))}
        </div>
        <div className="w-full lg:w-1/2">
          <HorizontalReveal delay={500}>
            <div className="aspect-[4/3] rounded-[3rem] bg-slate-900 text-white flex flex-col items-center justify-center p-12 text-center hover:scale-105 transition-transform duration-700 shadow-2xl">
              <h3 className="text-sm tracking-widest uppercase font-medium text-slate-400 mb-8">Interaction Impact</h3>
              <p className="text-3xl md:text-4xl font-light leading-tight">{outcomes}</p>
            </div>
          </HorizontalReveal>
        </div>
      </div>
    </div>
  );
};

export default function ServiceUiUxSolutions() {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Prevent body scroll on main document when overlay is active
  useEffect(() => {
    if (expandedIdx !== null && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else if (expandedIdx === null) {
      document.body.style.overflow = 'unset';
      setScrollProgress(0); // Reset on close
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [expandedIdx, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setExpandedIdx(null);
      setIsClosing(false);
    }, 450); // wait for animation to complete
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const current = el.scrollTop;
    const progress = (current / maxScroll) * 75; 
    setScrollProgress(progress);
  };

  return (
    <section className="relative py-32 md:py-48 bg-white min-h-[90vh] flex flex-col justify-center overflow-hidden">
      
      {/* Absolute Corner Label */}
      <div className="absolute top-12 left-8 md:top-24 md:left-12 lg:left-24 flex items-center gap-4 z-20">
        <span className="h-px w-8 bg-slate-300"></span>
        <h2 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-slate-400">Our Expertise</h2>
      </div>

      <div className="max-w-7xl mx-auto w-full mt-12 md:mt-0">
        {/* Header Container */}
        <ScrollReveal className="px-4 md:px-12 lg:px-24 mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-24 border-b border-slate-200 pb-16">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tighter leading-[1.1] whitespace-nowrap lg:whitespace-normal">
              Uncompromising digital craft.
            </h3>
            <p className="text-slate-500 font-light max-w-sm text-lg leading-relaxed lg:text-right shrink-0">
              No templates. No fluff. Just world-class design and engineering tailored to scale your vision.
            </p>
          </div>
        </ScrollReveal>

        {/* The Clean Typography Index Selection Menu (Airy & Breathable) */}
        <div className="w-full flex flex-col gap-12 md:gap-20 mt-24 pb-32 px-4 md:px-12 lg:px-24">
          {solutions.map((solution, index) => (
            <ScrollReveal key={index} threshold={0.1}>
              <button 
                onClick={() => setExpandedIdx(index)}
                className="group w-full flex items-center justify-between text-left overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 lg:gap-32 w-full">
                  <span className="text-slate-300 font-mono text-sm md:text-lg transition-colors duration-500 group-hover:text-slate-900 shrink-0">
                    0{index + 1}
                  </span>
                  <h4 className="text-4xl md:text-6xl lg:text-[5.5rem] font-light text-slate-300 group-hover:text-slate-900 transition-all duration-700 ease-out tracking-tight uppercase group-hover:translate-x-8 leading-[1.1]">
                    {solution.title}
                  </h4>
                </div>
                
                {/* Minimalist Long Arrow */}
                <div className="hidden lg:flex opacity-0 -translate-x-16 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out shrink-0">
                  <svg className="w-16 h-16 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* The Expanded Overlay (Scrollable Container) */}
      {expandedIdx !== null && (
        <>
          {/* Floating Close Button - Solid color, only visible at start and end */}
          <button 
            onClick={handleClose}
            className={`fixed top-8 right-8 md:top-12 md:right-12 z-[210] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl hover:rotate-90 hover:scale-110 
              ${(!isClosing && (scrollProgress < 15 || scrollProgress > 60)) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'} 
              ${scrollProgress > 50 ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-700'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className={`fixed inset-0 z-[200] bg-white overflow-y-auto overflow-x-hidden ${isClosing ? 'animate-scale-down pointer-events-none' : 'animate-scale-up'}`}
            onScroll={handleScroll}
          >
            {/* This container gives us the massive height needed to scroll down */}
            <div className="h-[400vh] relative w-full">
              
              {/* The Sticky Track that holds the horizontal slides */}
              <div className="sticky top-0 h-screen w-full overflow-hidden">
                
                <div 
                  className="flex h-full w-[400vw] transition-transform duration-75 ease-out"
                  style={{ transform: `translateX(-${scrollProgress}%)` }}
                >
                  
                  {/* Slide 1: Title & Overview (Consistent for all) */}
                  <div className="w-screen h-full flex items-center justify-center p-8 md:p-24 relative overflow-hidden bg-white">
                    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 opacity-0 animate-fade-in delay-300">
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-slate-900 mb-8">
                        {solutions[expandedIdx].title}
                      </h1>
                      <p className="text-2xl md:text-3xl font-light text-slate-500 max-w-3xl leading-relaxed">
                        {solutions[expandedIdx].description}
                      </p>
                      
                      <div className="mt-24 flex flex-col items-center gap-4 text-slate-400 animate-pulse">
                        <span className="text-sm tracking-widest uppercase">Scroll Down to Explore</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[20rem] md:text-[35rem] font-bold text-slate-50 leading-none absolute -bottom-20 -left-10 -z-10 select-none pointer-events-none">
                      {solutions[expandedIdx].tag}
                    </span>
                  </div>

                  {/* Slide 2: Features & Tools (DYNAMIC ARCHITECTURE) */}
                  <div className="w-screen h-full p-8 md:p-24 bg-slate-50 border-l border-slate-200 overflow-hidden relative">
                    <Slide2Features solution={solutions[expandedIdx]} />
                  </div>

                  {/* Slide 3: Process & Outcomes (DYNAMIC ARCHITECTURE) */}
                  <div className="w-screen h-full p-8 md:p-24 bg-white border-l border-slate-200 overflow-hidden relative">
                    <Slide3Process solution={solutions[expandedIdx]} />
                  </div>

                  {/* Slide 4: Call to action (Consistent for all) */}
                  <div className="w-screen h-full flex flex-col justify-center p-8 md:p-24 bg-slate-900 text-white border-l border-slate-800">
                    <div className="max-w-4xl mx-auto text-center">
                      <HorizontalReveal delay={100}>
                        <h3 className="text-6xl md:text-8xl font-light mb-8 leading-tight">Ready to elevate your {solutions[expandedIdx].title.toLowerCase()}?</h3>
                      </HorizontalReveal>
                      
                      <HorizontalReveal delay={300}>
                        <p className="text-3xl font-light text-slate-400 mb-16">Let's build something extraordinary together.</p>
                      </HorizontalReveal>
                      
                      <HorizontalReveal delay={500}>
                        <button 
                          className="group flex items-center justify-between w-full max-w-sm mx-auto h-20 px-8 bg-white text-slate-900 rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105"
                        >
                          <span className="font-medium tracking-wide text-xl">
                            Start a Project
                          </span>
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </button>
                      </HorizontalReveal>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
