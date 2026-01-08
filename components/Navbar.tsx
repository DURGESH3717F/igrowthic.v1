
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  setView: (view: 'home' | 'blog' | 'studio') => void;
  currentView: 'home' | 'blog' | 'studio';
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', type: 'anchor' },
    { name: 'Studio', href: 'studio', type: 'view' },
    { name: 'Blog', href: 'blog', type: 'view' },
    { name: 'Pricing', href: '#investment', type: 'anchor' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string, href: string, type: string }) => {
    e.preventDefault();
    if (link.type === 'view') {
      setView(link.href as 'blog' | 'studio');
    } else {
      if (currentView !== 'home') {
        setView('home');
        setTimeout(() => {
          const targetId = link.href.replace('#', '');
          const elem = document.getElementById(targetId);
          if (elem) {
            window.scrollTo({ top: elem.offsetTop - 100, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const targetId = link.href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          window.scrollTo({ top: elem.offsetTop - 100, behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ease-out py-2 rounded-[24px] glass px-8 mt-5 ${scrolled ? 'w-[95%] bg-white/70 shadow-lg' : 'w-[90%] max-w-[1400px]'}`}>
      <nav className="flex justify-between items-center h-14">
        <div 
          className="flex items-center cursor-pointer group h-full"
          onClick={handleLogoClick}
        >
          <img 
            src="https://i.ibb.co/n8gFP3d2/2.png" 
            alt="iGROWTHIC Logo" 
            className="h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <ul className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-[10px] uppercase tracking-wider font-bold px-6 py-2.5 rounded-full border border-white/80 border-b-2 border-b-gray-200/50 bg-gradient-to-br from-white/90 to-white/40 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-px ${
                  currentView === link.href 
                  ? 'text-blue-500 bg-blue-50/50' 
                  : 'text-gray-800'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a 
            href="studio"
            onClick={(e) => { e.preventDefault(); setView('studio'); }}
            className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full border border-blue-500/20 bg-blue-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20`}
          >
            <Zap size={14} className="fill-current" />
            Launch Studio
          </a>
          <button 
            className="md:hidden p-2 text-gray-800 hover:text-blue-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-2xl rounded-2xl border border-white shadow-2xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="px-6 py-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => { e.preventDefault(); setView('home'); setIsMenuOpen(false); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="mt-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-blue-500 text-center"
          >
            Get Expert Help
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
