
import React from 'react';
import { MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-16 rounded-[40px] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl -ml-20 -mb-20" />
          
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">READY TO <span className="text-gradient">START?</span></h2>
          <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-10">Join the top 1% of creators and businesses.</p>
          
          <div className="flex flex-col items-center gap-6">
            <a 
              href="https://wa.me/919892299010" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-5 bg-[#25D366] text-white font-bold text-xl rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <MessageCircle size={28} />
              Chat on WhatsApp
            </a>
            <p className="text-gray-400 text-sm font-semibold">Response time: &lt; 15 mins</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
