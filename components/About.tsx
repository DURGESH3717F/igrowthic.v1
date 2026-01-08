
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-4">Who We Are</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">AGENCY OF THE <br /><span className="text-gradient">FUTURE</span></h2>
          <p className="text-gray-500 leading-relaxed mb-6 text-lg">
            We are not just marketers; we are architects of growth. iGROWTHIC blends creative
            storytelling with data-driven precision to build brands that dominate their niche.
          </p>
          <p className="text-gray-500 leading-relaxed mb-10 text-lg">
            From the first creative concept to the final conversion, we handle the entire digital
            ecosystem so you can focus on leading your business.
          </p>
          <a href="#contact" className="px-8 py-4 bg-[#4a9eff] text-white font-bold rounded-full transition-transform hover:scale-105 inline-block">
            Join the Revolution
          </a>
        </div>

        <div className="glass-card p-12 rounded-[24px] flex flex-col gap-10">
          <h3 className="text-2xl font-heading font-bold">Get In Touch</h3>
          
          <div className="flex items-center gap-6 pb-6 border-b border-black/5">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
              <Phone size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Contact Number</span>
              <span className="text-2xl font-heading font-bold text-blue-500">9892299010</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
              <Mail size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</span>
              <span className="text-lg md:text-xl font-heading font-bold text-blue-500 break-all">the.growthic.official@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
