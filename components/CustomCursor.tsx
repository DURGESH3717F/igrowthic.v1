import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hidden) {
        setHidden(false);
        document.body.classList.add('hide-cursor');
      }
      
      requestAnimationFrame(() => {
        setDotPosition({ x: e.clientX, y: e.clientY });
        setTimeout(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        }, 35);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-none')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('hide-cursor');
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Ring */}
      <div 
        className="fixed w-12 h-12 border-2 border-blue-500 rounded-full pointer-events-none z-[9999] transition-transform hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.7 : isHovering ? 1.6 : 1})`,
          backgroundColor: isHovering ? 'rgba(74, 158, 255, 0.15)' : 'transparent',
          boxShadow: isHovering ? '0 0 30px rgba(74, 158, 255, 0.3)' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.4s ease, box-shadow 0.4s ease',
          opacity: 0.8
        }}
      />
      {/* Center Dot */}
      <div 
        className="fixed w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          left: dotPosition.x,
          top: dotPosition.y,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.5 : 1})`,
          boxShadow: '0 0 10px rgba(74, 158, 255, 0.5)',
          transition: 'transform 0.1s ease-out'
        }}
      />
    </>
  );
};

export default CustomCursor;