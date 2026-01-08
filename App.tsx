
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PhysicsBrand from './components/PhysicsBrand';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import StrategyModal from './components/StrategyModal';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Blurs */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-400/5 rounded-full custom-blur animate-floating pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/5 rounded-full custom-blur animate-floating-reverse pointer-events-none -z-10" />

      <CustomCursor />
      
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <PhysicsBrand />
        <About />
        <Pricing />
        <Contact />
      </main>

      <footer className="py-16 border-t border-black/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-heading font-bold text-2xl">iGROWTHIC</h3>
            <p className="text-gray-500">Digital Excellence & Future Branding.</p>
          </div>
          <div className="flex gap-8 font-semibold text-gray-700">
            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="text-center mt-12 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} iGROWTHIC. All rights reserved.
        </div>
      </footer>

      {showModal && <StrategyModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
