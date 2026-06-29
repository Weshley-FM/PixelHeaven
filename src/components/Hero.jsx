import React, { useRef, useEffect, useState } from 'react';
import pb from '../pb';

// Stick figure font dictionary (0 to 1 relative grid for each letter)
const font = {
  'a': [ [[0,1], [0.5,0], [1,1]], [[0.2,0.6], [0.8,0.6]] ],
  'b': [ [[0,0], [0,1]], [[0,0], [0.8,0.2], [0,0.5]], [[0,0.5], [1,0.8], [0,1]] ],
  'c': [ [[1,0.2], [0.2,0], [0,0.5], [0.2,1], [1,0.8]] ],
  'd': [ [[0,0], [0,1]], [[0,0], [0.8,0.2], [1,0.5], [0.8,0.8], [0,1]] ],
  'e': [ [[1,0], [0,0], [0,1], [1,1]], [[0,0.5], [0.8,0.5]] ],
  'f': [ [[1,0], [0,0], [0,1]], [[0,0.5], [0.8,0.5]] ],
  'g': [ [[1,0.2], [0.2,0], [0,0.5], [0.2,1], [1,0.8], [1,0.5], [0.5,0.5]] ],
  'h': [ [[0,0], [0,1]], [[1,0], [1,1]], [[0,0.5], [1,0.5]] ],
  'i': [ [[0.5,0], [0.5,1]], [[0.2,0], [0.8,0]], [[0.2,1], [0.8,1]] ],
  'j': [ [[0.8,0], [0.8,0.8], [0.5,1], [0.2,0.8]] ],
  'k': [ [[0,0], [0,1]], [[1,0], [0,0.5], [1,1]] ],
  'l': [ [[0,0], [0,1], [1,1]] ],
  'm': [ [[0,1], [0,0], [0.5,0.5], [1,0], [1,1]] ],
  'n': [ [[0,1], [0,0], [1,1], [1,0]] ],
  'o': [ [[0.5,0], [0,0.5], [0.5,1], [1,0.5], [0.5,0]] ],
  'p': [ [[0,1], [0,0]], [[0,0], [1,0.2], [1,0.4], [0,0.6]] ],
  'q': [ [[0.5,0], [0,0.5], [0.5,1], [1,0.5], [0.5,0]], [[0.8,0.8], [1,1]] ],
  'r': [ [[0,1], [0,0]], [[0,0], [1,0.2], [1,0.4], [0,0.6]], [[0.4,0.6], [1,1]] ],
  's': [ [[1,0.2], [0.5,0], [0,0.2], [1,0.8], [0.5,1], [0,0.8]] ],
  't': [ [[0.5,0], [0.5,1]], [[0,0], [1,0]] ],
  'u': [ [[0,0], [0,0.8], [0.5,1], [1,0.8], [1,0]] ],
  'v': [ [[0,0], [0.5,1], [1,0]] ],
  'w': [ [[0,0], [0.2,1], [0.5,0.5], [0.8,1], [1,0]] ],
  'x': [ [[0,0], [1,1]], [[1,0], [0,1]] ],
  'y': [ [[0,0], [0.5,0.5], [1,0]], [[0.5,0.5], [0.5,1]] ],
  'z': [ [[0,0], [1,0], [0,1], [1,1]] ],
  '?': [ [[0.2,0.2], [0.5,0], [0.8,0.2], [0.5,0.6], [0.5,0.7]], [[0.5,0.9], [0.5,1]] ],
  '!': [ [[0.5,0], [0.5,0.7]], [[0.5,0.9], [0.5,1]] ],
  '\'': [ [[0.5,0], [0.2,0.3]] ],
};

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fakeCursorRef = useRef(null);
  
  const [introFinished, setIntroFinished] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [content, setContent] = useState(null);
  const isDrawing = useRef(false);
  const drawIntervalRef = useRef(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    pb.collection('section_hero').getFirstListItem('')
      .then(data => setContent(data))
      .catch(err => {
        // Silently ignore if no data is found initially
        console.error("Hero content fetch error (might be empty):", err);
      });
  }, []);

  // Live Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(`${formatted} WIB`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Store user drawn paths so we can redraw on resize or clear
  const userPaths = useRef([]);
  const currentPath = useRef([]);
  const introDrawing = useRef([]);

  useEffect(() => {
    isCancelledRef.current = false; // Crucial fix: reset ref on mount so strict-mode doesn't perma-cancel
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const redrawAll = (context) => {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = '#0f172a'; // slate-900
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.lineJoin = 'round';

      userPaths.current.forEach(path => {
        if (path.length === 0) return;
        context.beginPath();
        context.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          context.lineTo(path[i].x, path[i].y);
        }
        context.stroke();
      });
    };

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      redrawAll(ctx);
    };
    window.addEventListener('resize', handleResize);

    const defaultPhrases = [
      "need a good design?",
      "let's build it!",
      "pixel heaven rocks",
      "draw something cool",
      "creative freedom"
    ];
    const phrases = content?.draw_phrases ? content.draw_phrases.split(',').map(s => s.trim()) : defaultPhrases;

    const generateTextPoints = (text) => {
      const points = [];
      const letterWidth = Math.min(width * 0.03, 25); 
      const letterHeight = letterWidth * 1.5;
      const spacing = letterWidth * 0.4;
      
      let currentX = width / 2 - (text.length * (letterWidth + spacing)) / 2;
      if (currentX < width * 0.1) currentX = width * 0.1;
      let currentY = height * 0.4;
      
      const noise = (val) => val + (Math.random() * 0.15 - 0.07); 
      
      const words = text.split(' ');
      
      words.forEach(word => {
          if (currentX + word.length * (letterWidth + spacing) > width * 0.9) {
              currentX = width * 0.1;
              currentY += letterHeight * 1.8;
          }
          
          for (let i = 0; i < word.length; i++) {
              const char = word[i].toLowerCase();
              const paths = font[char];
              if (!paths) {
                  currentX += letterWidth + spacing;
                  continue;
              }
              
              paths.forEach(path => {
                  if (path.length === 0) return;
                  
                  let prevX = currentX + noise(path[0][0]) * letterWidth;
                  let prevY = currentY + noise(path[0][1]) * letterHeight;
                  points.push({ type: 'move', x: prevX, y: prevY });
                  
                  for (let j = 1; j < path.length; j++) {
                      const px = currentX + noise(path[j][0]) * letterWidth;
                      const py = currentY + noise(path[j][1]) * letterHeight;
                      
                      const dx = px - prevX;
                      const dy = py - prevY;
                      const dist = Math.sqrt(dx*dx + dy*dy);
                      const steps = Math.max(Math.floor(dist / 4), 1);
                      
                      for(let s=1; s<=steps; s++){
                          points.push({
                              type: 'line',
                              x: prevX + (dx * (s/steps)),
                              y: prevY + (dy * (s/steps))
                          });
                      }
                      prevX = px;
                      prevY = py;
                  }
              });
              currentX += letterWidth + spacing;
          }
          currentX += letterWidth + spacing; 
      });
      return points;
    };

    const animateDraw = (points) => {
        return new Promise((resolve) => {
            let index = 0;
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            drawIntervalRef.current = setInterval(() => {
                if (isCancelledRef.current || index >= points.length) {
                    clearInterval(drawIntervalRef.current);
                    if (fakeCursorRef.current) fakeCursorRef.current.style.opacity = '0';
                    resolve();
                    return;
                }
                
                const pt = points[index];
                introDrawing.current.push({ x: pt.x, y: pt.y });
                
                if (pt.type === 'move') {
                    ctx.beginPath();
                    ctx.moveTo(pt.x, pt.y);
                } else {
                    ctx.lineTo(pt.x, pt.y);
                    ctx.stroke();
                }
                
                if (fakeCursorRef.current) {
                    fakeCursorRef.current.style.opacity = '1';
                    fakeCursorRef.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
                }
                
                index++;
            }, 12);
        });
    };

    const animateErase = () => {
        return new Promise((resolve) => {
            let wipeX = 0;
            const wipeSpeed = width / 25; 
            
            drawIntervalRef.current = setInterval(() => {
                if (isCancelledRef.current) {
                    clearInterval(drawIntervalRef.current);
                    resolve();
                    return;
                }

                wipeX += wipeSpeed;
                
                ctx.clearRect(0, 0, width, height);
                ctx.save();
                ctx.beginPath();
                ctx.rect(wipeX, 0, width - wipeX, height);
                ctx.clip(); 
                
                ctx.strokeStyle = '#0f172a';
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                userPaths.current.forEach(path => {
                    if (path.length === 0) return;
                    ctx.beginPath();
                    ctx.moveTo(path[0].x, path[0].y);
                    for (let i = 1; i < path.length; i++) {
                        ctx.lineTo(path[i].x, path[i].y);
                    }
                    ctx.stroke();
                });
                
                ctx.restore();
                
                if (wipeX >= width) {
                    clearInterval(drawIntervalRef.current);
                    introDrawing.current = []; 
                    userPaths.current = []; 
                    ctx.clearRect(0, 0, width, height); 
                    resolve();
                }
            }, 16);
        });
    };

    const startSequence = async () => {
        while (!isCancelledRef.current) {
            const text = phrases[Math.floor(Math.random() * phrases.length)];
            const introPoints = generateTextPoints(text);
            
            introDrawing.current = [];
            userPaths.current = [introDrawing.current];
            
            await animateDraw(introPoints);
            if (isCancelledRef.current) break;
            
            await new Promise(r => setTimeout(r, 1500)); 
            if (isCancelledRef.current) break;
            
            await animateErase();
            if (isCancelledRef.current) break;
            
            await new Promise(r => setTimeout(r, 500)); 
        }
    };

    startSequence();

    return () => {
      isCancelledRef.current = true;
      clearInterval(drawIntervalRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clearCanvas = () => {
    userPaths.current = [];
    introDrawing.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleMouseDown = (e) => {
    if (!canvasRef.current) return;
    
    if (!introFinished) {
      isCancelledRef.current = true;
      clearInterval(drawIntervalRef.current);
      setIntroFinished(true);
      if (fakeCursorRef.current) fakeCursorRef.current.style.opacity = '0';
    }

    isDrawing.current = true;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    currentPath.current = [{ x, y }];
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    currentPath.current.push({ x, y });
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    userPaths.current.push([...currentPath.current]);
    currentPath.current = [];
  };

  return (
    <div className="w-full px-4 pb-4 pt-1 md:px-6 md:pb-6 md:pt-2 h-[calc(100vh-90px)] bg-white flex flex-col items-center justify-center">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex-1 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white via-slate-50/80 to-slate-100/80 border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),inset_0_2px_10px_rgba(255,255,255,1)] backdrop-blur-md"
      >
        {/* Interactive Whiteboard */}
        <canvas 
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />

        {/* Fake Cursor for Intro */}
        {!introFinished && (
          <div 
            ref={fakeCursorRef} 
            className="absolute top-0 left-0 pointer-events-none z-50 w-8 h-8 transition-opacity duration-200"
            style={{ marginLeft: '-3px', marginTop: '-28px' }}
          >
            {/* Custom SVG Pen Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 fill-white w-full h-full drop-shadow-md">
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            </svg>
          </div>
        )}

        {/* --- CORNER WIDGETS --- */}

        {/* Top Left Widget */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-3 pointer-events-none">
           <span className="text-sm font-semibold tracking-wide text-slate-800">{content?.brand_name || 'PixelHeaven'}</span>
           <span className="h-1 w-1 rounded-full bg-slate-400"></span>
           <span className="text-sm font-medium text-slate-500 min-w-[80px]">{currentTime}</span>
        </div>

        {/* Top Right Widget (Clear Canvas) */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 pointer-events-auto">
           <button 
             onClick={clearCanvas}
             className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-slate-900 transition-all hover:shadow-md"
             title="Clear Whiteboard"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
             </svg>
           </button>
        </div>

        {/* Bottom Left Widget */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 hidden sm:flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/50 shadow-sm pointer-events-none">
          <div className="flex -space-x-2">
            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User" />
          </div>
          <span className="text-sm font-medium text-slate-700 pr-1">{content?.founders_text || '1.6K+ Founders'}</span>
        </div>

        {/* Bottom Right Widget */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 hidden lg:flex items-center gap-5 pointer-events-none">
           <p className="text-[15px] leading-relaxed font-medium text-slate-500 text-right max-w-[220px]">
             {content?.subtitle || 'We help startups create brands, websites, and decks.'}
           </p>
           <div className="h-10 w-[2px] bg-slate-400/80 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
