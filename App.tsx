
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import PhysicsBrand from './components/PhysicsBrand.tsx';
import About from './components/About.tsx';
import Pricing from './components/Pricing.tsx';
import Contact from './components/Contact.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import StrategyModal from './components/StrategyModal.tsx';
import Blog from './components/Blog.tsx';
import Studio from './components/Studio.tsx';

console.info("iGROWTHIC: Loading App Component...");

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'studio'>('home');

  useEffect(() => {
    console.info("iGROWTHIC: App instance active. Current view:", currentView);
  }, [currentView]);

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
              alt="iGROWTHIC" 
              className="h-16 w-auto object-contain"
              loading="lazy" 
            />
            <p className="text-gray-500 font-medium">Digital Excellence & Viral Branding Specialists.</p>
          </div>
          <nav className="flex gap-8 font-semibold text-gray-700">
            <a href="https://twitter.com/igrowthic" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com/igrowthic" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com/company/igrowthic" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
        <div className="text-center mt-12 text-sm text-gray-400 uppercase tracking-widest font-black">
          &copy; 2026 iGROWTHIC. THE GLOBAL BENCHMARK FOR GROWTH.
        </div>
      </footer>

      {showModal && currentView === 'home' && <StrategyModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
