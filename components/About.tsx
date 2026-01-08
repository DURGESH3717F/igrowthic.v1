
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <article>
          <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-4">Who We Are</p>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-heading font-bold mb-8 uppercase">
            THE GROWTH <br /><span className="text-gradient">ARCHITECTS</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6 text-lg">
            We are not just a marketing agency; we are the strategic engineers behind the world's fastest-growing digital brands. iGROWTHIC blends cinematic storytelling with algorithmic precision.
          </p>
          <p className="text-gray-500 leading-relaxed mb-10 text-lg">
            From viral concept engineering to conversion-optimized deployment, we manage your entire digital ecosystem so you can scale without the friction.
          </p>
          <a href="#contact" className="px-8 py-4 bg-[#4a9eff] text-white font-bold rounded-full transition-transform hover:scale-105 inline-block shadow-lg" aria-label="Join our digital marketing partnership program">
            Scale Your Brand
          </a>
        </article>

        <div className="glass-card p-12 rounded-[24px] flex flex-col gap-10">
          <h3 className="text-2xl font-heading font-bold uppercase tracking-tight">Direct Access</h3>
          
          <div className="flex items-center gap-6 pb-6 border-b border-black/5">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl" aria-hidden="true">
              <Phone size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Growth Hotline</span>
              <a href="tel:+919892299010" className="text-2xl font-heading font-bold text-blue-500 hover:text-blue-600 transition-colors" aria-label="Call our Mumbai office">9892299010</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl" aria-hidden="true">
              <Mail size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Strategic Inquiry</span>
              <a href="mailto:the.growthic.official@gmail.com" className="text-lg md:text-xl font-heading font-bold text-blue-500 break-all hover:text-blue-600 transition-colors" aria-label="Email our strategy team">the.growthic.official@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
