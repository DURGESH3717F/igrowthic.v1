
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      setDotPosition({ x: e.clientX, y: e.clientY });
      
      // Delay effect for the outer ring
      setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('toggle-option')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Ring */}
      <div 
        className="fixed w-10 h-10 border border-blue-400 rounded-full pointer-events-none z-[9999] transition-transform duration-300 hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          backgroundColor: isHovering ? 'rgba(74, 158, 255, 0.1)' : 'transparent',
          mixBlendMode: 'difference'
        }}
      />
      {/* Center Dot */}
      <div 
        className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          left: dotPosition.x,
          top: dotPosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default CustomCursor;
