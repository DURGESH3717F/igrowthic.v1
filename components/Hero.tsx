
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "DIGITAL GROWTH.";
  const btnRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    let i = 0;
    const typingInterval = 75; // Slightly faster for snappier feel
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, typingInterval);
    return () => clearInterval(timer);
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 768) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    // Smooth magnetic pull
    const strength = 0.25;
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.04)`;
    btn.style.transition = 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)';
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0, 0) scale(1)';
    btn.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col items-center justify-start pt-16 md:pt-32 px-6 text-center overflow-hidden" aria-label="Introduction">
      <div className="max-w-[1100px] w-full z-10">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/40 glass border border-white/60 rounded-full text-[9px] md:text-[10px] font-black text-gray-800 mb-8 md:mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="w-2 h-2 bg-[#00ff88] rounded-full shadow-[0_0_12px_#00ff88]" aria-hidden="true" />
          <Sparkles size={12} className="text-blue-500" aria-hidden="true" />
          #1 GROWTH ARCHITECTS IN MUMBAI / PUSHING LIMITS 2026
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-[7.5rem] font-heading font-bold leading-[1] md:leading-[0.9] tracking-tighter text-gray-900 mb-8 md:mb-10">
          SCALE YOUR BRAND <br />
          <span className="text-gradient inline-block min-h-[1.1em]">
            {displayText}
            <span className="animate-pulse ml-1 opacity-60" aria-hidden="true">|</span>
          </span>
        </h1>

        <p className="text-base md:text-xl text-gray-500 max-w-[600px] mx-auto mb-12 md:mb-14 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          We build digital empires using cinematic narrative strategy, high-fidelity analytics, and aggressive growth frameworks designed for the 2026 algorithm.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in zoom-in-95 duration-1000 delay-500">
          <a 
            ref={btnRef}
            href="#contact" 
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="w-full sm:w-auto group px-12 py-5 bg-[#4a9eff] text-white font-black uppercase tracking-widest text-xs rounded-full shadow-[0_20px_40px_rgba(74,158,255,0.25)] flex items-center justify-center gap-3 transition-premium"
            aria-label="Book a growth consultation"
          >
            Start Your Journey
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden="true" />
          </a>
          <a 
            href="#about" 
            className="w-full sm:w-auto px-12 py-5 bg-white/50 glass border border-white/80 font-black uppercase tracking-widest text-xs text-gray-800 rounded-full hover:bg-white/80 hover:-translate-y-1 transition-premium"
            aria-label="Learn about our content strategy framework"
          >
            How it Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
