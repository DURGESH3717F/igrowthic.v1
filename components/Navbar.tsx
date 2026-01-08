
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar: React.FC = () => {
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
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#investment' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 100, // Offset for the fixed navbar
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ease-out py-3 rounded-[20px] glass px-8 mt-5 ${scrolled ? 'w-[95%] bg-white/70 shadow-lg' : 'w-[90%] max-w-[1400px]'}`}>
      <nav className="flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={scrollToTop}
        >
          <Rocket className="text-blue-500 w-6 h-6 group-hover:animate-bounce" />
          <span className="font-heading font-extrabold text-2xl tracking-tighter text-gray-800">iGROWTHIC</span>
        </div>

        <ul className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[10px] uppercase tracking-wider font-bold text-gray-800 px-6 py-2.5 rounded-full border border-white/80 border-b-2 border-b-gray-200/50 bg-gradient-to-br from-white/90 to-white/40 shadow-sm transition-all hover:-translate-y-0.5 hover:text-blue-500 active:translate-y-px"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-block px-6 py-2.5 rounded-full border border-black/20 font-semibold text-sm hover:bg-gray-800 hover:text-white transition-all shadow-sm"
          >
            Contact Us
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
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-6 py-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-blue-500 text-center"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
