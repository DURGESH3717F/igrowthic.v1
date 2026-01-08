
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "DIGITAL GROWTH.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 768) return;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.35;
    btn.style.transition = 'none';
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    btn.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    btn.style.transform = 'translate(0, 0) scale(1)';
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-start pt-28 md:pt-44 px-6 text-center overflow-hidden">
      <div className="max-w-[1000px] w-full z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/70 glass border border-white/80 rounded-full text-[9px] md:text-[10px] font-bold text-gray-800 mb-6 md:mb-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="w-2 h-2 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88]" />
          <Sparkles size={12} className="text-blue-500" />
          SYSTEM ACTIVE / READY TO SCALE
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-heading font-bold leading-[1.1] md:leading-[1] tracking-tighter text-gray-800 mb-6 md:mb-8">
          EMPOWER YOUR <br />
          <span className="text-gradient inline-block min-h-[1.2em]">{displayText}<span className="animate-pulse">|</span></span>
        </h1>

        <p className="text-base md:text-xl text-gray-500 max-w-[550px] mx-auto mb-10 md:mb-12 font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          A complete ecosystem for content creation, management, and analytics.
          If you're ready to scale, we're ready to build.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-1000 delay-500">
          <a 
            href="#contact" 
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="w-full sm:w-auto group px-10 py-4 bg-[#4a9eff] text-white font-bold rounded-full shadow-[0_10px_20px_rgba(74,158,255,0.2)] flex items-center justify-center gap-2 transition-all"
          >
            Start Your Journey
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#about" 
            className="w-full sm:w-auto px-10 py-4 bg-white/40 glass border border-white font-bold rounded-full hover:bg-white/60 transition-all duration-300"
          >
            How it Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
