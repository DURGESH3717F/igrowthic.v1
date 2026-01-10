
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PhysicsBrand from './components/PhysicsBrand';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import StrategyModal from './components/StrategyModal';
import Blog from './components/Blog';
import Studio from './components/Studio';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'studio'>('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentView === 'home') {
        setShowModal(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [currentView]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="relative min-h-screen">
      {/* Background Blurs */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-400/5 rounded-full custom-blur animate-floating pointer-events-none -z-10" aria-hidden="true" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/5 rounded-full custom-blur animate-floating-reverse pointer-events-none -z-10" aria-hidden="true" />

      <CustomCursor />
      
      <Navbar setView={setCurrentView} currentView={currentView} />
      
      <main id="main-content" role="main" className="pt-10 md:pt-14">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero />
            <Services />
            <PhysicsBrand />
            <About />
            <Pricing />
            <Contact />
          </div>
        )}
        
        {currentView === 'blog' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <Blog />
          </div>
        )}

        {currentView === 'studio' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <Studio />
          </div>
        )}
      </main>

      <footer role="contentinfo" className="py-16 border-t border-black/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img 
              src="https://i.ibb.co/n8gFP3d2/2.png" 
              alt="iGROWTHIC - Premier Digital Marketing Agency" 
              className="h-16 w-auto object-contain"
              loading="lazy" 
            />
            <p className="text-gray-500 font-medium">Digital Excellence & Viral Branding Specialists.</p>
          </div>
          <nav className="flex gap-8 font-semibold text-gray-700" aria-label="Social Media">
            <a href="https://twitter.com/igrowthic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Twitter</a>
            <a href="https://instagram.com/igrowthic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Instagram</a>
            <a href="https://linkedin.com/company/igrowthic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
          </nav>
        </div>
        <div className="text-center mt-12 text-sm text-gray-400 uppercase tracking-widest font-black">
          &copy; 2026 iGROWTHIC. THE GLOBAL BENCHMARK FOR GROWTH.
        </div>
      </footer>

      {showModal && currentView === 'home' && <StrategyModal onClose={() => setShowModal(false)} />}
      
      <SpeedInsights />
    </div>
  );
};

export default App;
