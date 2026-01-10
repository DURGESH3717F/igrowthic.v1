import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Video, Globe, BarChart3, Plus } from 'lucide-react';

const services = [
  { 
    id: '01', 
    title: 'Content Strategy Specialists', 
    desc: 'Data-driven content pillars that align with your audience\'s deepest needs and search intent.',
    icon: Lightbulb
  },
  { 
    id: '02', 
    title: 'Cinematic Video Production', 
    desc: 'High-retention editing and creative scripting for viral Reels, Shorts, and cinematic brand stories.',
    icon: Video
  },
  { 
    id: '03', 
    title: 'Social Media Management', 
    desc: 'Full-service management including posting schedules, community engagement, and brand building.',
    icon: Globe
  },
  { 
    id: '04', 
    title: 'Performance Marketing', 
    desc: 'Advanced analytics and rapid-iteration Meta/Google Ads to maximize your ROI and scale revenue.',
    icon: BarChart3
  }
];

// Explicitly use React.FC to handle internal React props like 'key'
const ServiceSkeleton: React.FC = () => (
  <div className="glass-card p-10 rounded-3xl relative flex flex-col overflow-hidden">
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_2.5s_infinite]" />
    <div className="mb-6 w-14 h-14 bg-gray-100/50 rounded-2xl" />
    <div className="h-7 bg-gray-100/50 rounded-md w-3/4 mb-4" />
    <div className="space-y-2">
      <div className="h-3.5 bg-gray-100/50 rounded-md w-full" />
      <div className="h-3.5 bg-gray-100/50 rounded-md w-5/6" />
    </div>
  </div>
);

// Explicitly use React.FC to handle internal React props like 'key' and define prop types
const ServiceCard: React.FC<{ service: any, isLoading: boolean }> = ({ service, isLoading }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading || window.innerWidth < 1024 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  };

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group glass-card p-10 rounded-[32px] relative flex flex-col cursor-none animate-in fade-in zoom-in-95 duration-700 overflow-hidden"
      style={{ transition: 'transform 0.4s var(--ease-premium), box-shadow 0.4s var(--ease-premium)' }}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(74, 158, 255, 0.12), transparent 40%)`
        }}
      />

      <div className="mb-8 p-4 w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl transition-all duration-700 group-hover:bg-blue-500 group-hover:text-white group-hover:rotate-[360deg] relative z-10" aria-hidden="true">
        <service.icon size={24} />
      </div>
      
      <div className="absolute top-4 right-8 text-7xl font-heading font-black text-blue-500/[0.04] select-none pointer-events-none group-hover:text-blue-500/10 transition-colors duration-500 z-0" aria-hidden="true">
        {service.id}
      </div>

      <h3 className="text-2xl font-heading font-black mb-4 relative z-10 transition-colors group-hover:text-blue-600">
        {service.title}
      </h3>
      
      <p className="text-gray-500 text-sm leading-relaxed relative z-10 font-medium group-hover:text-gray-700 transition-colors">
        {service.desc}
      </p>

      <div className="mt-8 pt-8 border-t border-black/[0.03] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Discover More</span>
        <Plus size={18} className="text-blue-500 animate-pulse" />
      </div>
    </article>
  );
};

const Services: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const setIsLoaded = () => setIsLoading(false);

  return (
    <section id="services" className="py-32 px-6" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Elite Expertise
          </div>
          <h2 id="services-heading" className="text-4xl md:text-6xl font-heading font-bold mb-6 uppercase tracking-tight">
            OUR CORE <span className="text-gradient">SOLUTIONS</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">We provide full-stack growth frameworks designed to eliminate market noise and command attention.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <ServiceSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            services.map((service) => (
              <ServiceCard key={service.id} service={service} isLoading={isLoading} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;