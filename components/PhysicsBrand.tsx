import React, { useEffect, useRef, useState } from 'react';

const tags = [
  "Social Media Management", "Branding & Strategy",
  "Video Production", "Performance Marketing",
  "UI/UX Design", "SEO Optimization",
  "Lead Generation", "Content Creation",
  "Analytics", "Meta Ads", "Google Ads",
  "App Development", "Web Design",
  "Influencer Marketing", "Growth Hacking",
  "Email Marketing", "Copywriting",
  "CRM Solutions", "E-commerce",
  "AI Strategy", "Market Research", "Brand Identity"
];

const PhysicsBrand: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);
  const runnerRef = useRef<any>(null);
  const spawnIntervalRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let resizeObserver: ResizeObserver;

    const initPhysics = () => {
      if (!containerRef.current) return;
      
      const Matter = (window as any).Matter;
      if (!Matter) {
        timeoutId = window.setTimeout(initPhysics, 100);
        return;
      }

      const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, Body } = Matter;

      // Clean up any existing instances before re-initializing
      if (engineRef.current) {
        Render.stop(renderRef.current);
        Runner.stop(runnerRef.current);
        Engine.clear(engineRef.current);
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove();
        }
      }

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Ensure we have dimensions. If not, wait for the next layout pass.
      if (width === 0 || height === 0) {
        timeoutId = window.setTimeout(initPhysics, 200);
        return;
      }

      const isMobile = window.innerWidth < 768;
      const displayTags = isMobile ? tags.slice(0, 10) : tags;

      const engine = Engine.create();
      engineRef.current = engine;
      engine.gravity.y = 0.8; // Stronger gravity for more dynamic movement

      const render = Render.create({
        element: containerRef.current,
        engine: engine,
        options: {
          width,
          height,
          background: 'transparent',
          wireframes: false,
          pixelRatio: Math.min(window.devicePixelRatio, 2)
        }
      });
      renderRef.current = render;

      const createTag = (x: number, y: number, text: string) => {
        const fontMultiplier = isMobile ? 7 : 9;
        const horizontalPadding = isMobile ? 30 : 50;
        const tagWidth = text.length * fontMultiplier + horizontalPadding;
        const tagHeight = isMobile ? 38 : 52;
        
        const isBlue = Math.random() > 0.7; // Mix in some brand blue tags
        const color = isBlue ? '#4a9eff' : (Math.random() > 0.5 ? '#1a1d21' : '#ffffff');
        const textColor = (isBlue || color === '#1a1d21') ? '#ffffff' : '#1a1d21';

        const body = Bodies.rectangle(x, y, tagWidth, tagHeight, {
          friction: 0.1,
          frictionAir: 0.03, 
          restitution: 0.6, 
          chamfer: { radius: tagHeight / 2 },
          render: {
            fillStyle: color,
            strokeStyle: 'rgba(0,0,0,0.05)',
            lineWidth: 2
          }
        });

        body.labelData = { text, textColor };
        Body.setAngle(body, (Math.random() - 0.5) * 0.5);
        return body;
      };

      const wallThickness = 200; 
      const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 5, wallThickness, { isStatic: true, render: { visible: false } });
      const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true, render: { visible: false } });
      const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true, render: { visible: false } });
      const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 5, wallThickness, { isStatic: true, render: { visible: false } });
      
      Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

      // Handle spawning in a more robust way
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      
      let spawnIndex = 0;
      spawnIntervalRef.current = setInterval(() => {
        if (spawnIndex >= displayTags.length) {
          clearInterval(spawnIntervalRef.current);
          return;
        }
        
        // Spawn from the top area across the width
        const x = (width * 0.1) + (Math.random() * (width * 0.8));
        const y = -100; // Start off-screen
        const tag = createTag(x, y, displayTags[spawnIndex]);
        Composite.add(engine.world, tag);
        spawnIndex++;
      }, isMobile ? 300 : 150);

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { 
          stiffness: 0.1, 
          render: { visible: false } 
        }
      });

      // Avoid blocking page scroll - only capture mouse events on the canvas itself
      mouseConstraint.mouse.element.removeEventListener("mousewheel", (mouseConstraint.mouse as any).mousewheel);
      mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", (mouseConstraint.mouse as any).mousewheel);
      
      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      Events.on(render, 'afterRender', () => {
        const context = render.context;
        context.font = `${isMobile ? '700 12px' : '800 15px'} 'Inter', sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";

        Composite.allBodies(engine.world).forEach((body: any) => {
          if (body.labelData) {
            const { x, y } = body.position;
            context.save();
            context.translate(x, y);
            context.rotate(body.angle);
            context.fillStyle = body.labelData.textColor;
            context.fillText(body.labelData.text, 0, 0);
            context.restore();
          }
        });
      });

      const runner = Runner.create();
      runnerRef.current = runner;
      Runner.run(runner, engine);
      Render.run(render);
      
      // Delay setting isLoaded to ensure the canvas has actually been painted
      setTimeout(() => setIsLoaded(true), 100);

      resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || !renderRef.current) return;
        const { width: newWidth, height: newHeight } = entries[0].contentRect;
        if (newWidth === 0 || newHeight === 0) return;
        
        render.canvas.width = newWidth;
        render.canvas.height = newHeight;
        render.options.width = newWidth;
        render.options.height = newHeight;
        
        Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
        Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
        Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
      });

      resizeObserver.observe(containerRef.current);
    };

    timeoutId = window.setTimeout(initPhysics, 300);

    return () => {
      clearTimeout(timeoutId);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (resizeObserver) resizeObserver.disconnect();
      const Matter = (window as any).Matter;
      if (Matter) {
        if (renderRef.current) Matter.Render.stop(renderRef.current);
        if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
        if (engineRef.current) Matter.Engine.clear(engineRef.current);
      }
      if (renderRef.current?.canvas) renderRef.current.canvas.remove();
    };
  }, []);

  return (
    <section id="brand-physics" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Interactive Ecosystem
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight uppercase">
            OUR <span className="text-gradient">SERVICE</span> PILLARS
          </h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto px-4">
            A dynamic showcase of our core specializations. Physics-driven, highly interactive, and engineered for impact. Grab, throw, and explore our capabilities.
          </p>
        </div>
        
        <div className="relative group max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div 
            ref={containerRef}
            className={`w-full h-[500px] md:h-[650px] relative rounded-[40px] md:rounded-[56px] overflow-hidden bg-white/30 glass border border-white/60 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing touch-none z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60 animate-pulse">Initializing Physics...</p>
            </div>
          )}
          
          <div className="absolute bottom-10 left-10 md:left-14 pointer-events-none opacity-40 flex items-center gap-3 z-20">
             <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-black">?</div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Drag to interact</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicsBrand;