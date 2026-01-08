
import React, { useState, useEffect } from 'react';
import { Lightbulb, Video, Globe, BarChart3 } from 'lucide-react';

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

const ServiceSkeleton = () => (
  <div className="glass-card p-10 rounded-2xl relative flex flex-col overflow-hidden animate-pulse">
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
    <div className="mb-6 w-14 h-14 bg-gray-100 rounded-xl" />
    <div className="absolute top-2 right-6 w-16 h-16 bg-gray-50/50 rounded-lg" />
    <div className="h-7 bg-gray-100 rounded-md w-3/4 mb-4" />
    <div className="space-y-2">
      <div className="h-3.5 bg-gray-100 rounded-md w-full" />
      <div className="h-3.5 bg-gray-100 rounded-md w-5/6" />
    </div>
  </div>
);

const Services: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="services" className="py-32 px-6" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h2 id="services-heading" className="text-4xl md:text-5xl font-heading font-bold mb-4 uppercase">
            OUR CORE <span className="text-gradient">SOLUTIONS</span>
          </h2>
          <p className="text-gray-500 font-medium">Full-stack digital growth frameworks to dominate your market.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <ServiceSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            services.map((service) => (
              <article 
                key={service.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group glass-card p-10 rounded-2xl relative flex flex-col cursor-none animate-in fade-in zoom-in-95 duration-700"
                style={{ transition: 'transform 0.1s ease-out, box-shadow 0.3s ease' }}
              >
                <div className="mb-6 p-4 w-14 h-14 bg-blue-50 text-blue-500 rounded-xl transition-colors group-hover:bg-blue-500 group-hover:text-white" aria-hidden="true">
                  <service.icon size={24} />
                </div>
                <div className="absolute top-2 right-6 text-6xl font-heading font-extrabold text-blue-500/5 select-none pointer-events-none group-hover:text-blue-500/10 transition-colors" aria-hidden="true">
                  {service.id}
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{service.desc}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
