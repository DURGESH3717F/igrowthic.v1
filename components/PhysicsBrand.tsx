
import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (!containerRef.current) return;
    
    const Matter = (window as any).Matter;
    if (!Matter) {
      console.error("Matter.js not found. Ensure it is loaded in index.html");
      return;
    }

    const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, Vector, Body } = Matter;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Safety check: Don't initialize if container has no dimensions yet
    if (width === 0 || height === 0) return;

    const isMobile = window.innerWidth < 768;
    // For a shorter container on PC, we might want slightly fewer tags or smaller ones
    const displayTags = isMobile ? tags.slice(0, 16) : tags;

    const engine = Engine.create({ 
      enableSleeping: false,
      positionIterations: 10,
      velocityIterations: 10
    });
    engineRef.current = engine;
    
    // PC gets lighter gravity for a more premium, floating feel
    engine.gravity.y = isMobile ? 0.4 : 0.35; 

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
      const fontMultiplier = isMobile ? 6.5 : 8.5;
      const horizontalPadding = isMobile ? 26 : 38;
      const tagWidth = text.length * fontMultiplier + horizontalPadding;
      const tagHeight = isMobile ? 32 : 40;
      
      const isDark = Math.random() > 0.5;
      const color = isDark ? '#1a1d21' : '#ffffff';
      const textColor = isDark ? '#ffffff' : '#1a1d21';

      const body = Bodies.rectangle(x, y, tagWidth, tagHeight, {
        friction: 0.02,
        frictionAir: isMobile ? 0.02 : 0.015, 
        restitution: 0.85, 
        chamfer: { radius: tagHeight / 2 },
        render: {
          fillStyle: color,
          strokeStyle: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1,
          opacity: 1
        }
      });

      body.labelData = { text, textColor };
      Body.setAngle(body, (Math.random() - 0.5) * 1.5);
      
      return body;
    };

    // Boundaries
    const wallThickness = 120; 
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 3, wallThickness, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 3, wallThickness, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true, render: { visible: false } });
    
    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // Spawning logic: spawning within the container bounds
    let spawnIndex = 0;
    const spawnInterval = setInterval(() => {
      if (spawnIndex >= displayTags.length) {
        clearInterval(spawnInterval);
        return;
      }
      const x = (width * 0.1) + (Math.random() * (width * 0.8));
      const y = 50; 
      Composite.add(engine.world, createTag(x, y, displayTags[spawnIndex]));
      spawnIndex++;
    }, isMobile ? 300 : 250);

    // Anti-clogging jitter
    const jitterInterval = setInterval(() => {
      const bodies = Composite.allBodies(engine.world);
      bodies.forEach(body => {
        if (!body.isStatic) {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.002
          });
        }
      });
    }, 2000);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    });

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
    
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const handleCanvasClick = () => {
      const bodies = Composite.allBodies(engine.world);
      bodies.forEach(body => {
        if (!body.isStatic) {
          const forceMagnitude = isMobile ? 0.08 : 0.15;
          const deltaX = body.position.x - mouse.position.x;
          const deltaY = body.position.y - mouse.position.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
          
          Body.applyForce(body, body.position, {
            x: (deltaX / distance) * forceMagnitude,
            y: (deltaY / distance) * forceMagnitude - 0.12
          });
        }
      });
    };
    render.canvas.addEventListener('mousedown', handleCanvasClick);

    Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.font = `${isMobile ? '600 11px' : '700 12px'} 'Inter', sans-serif`;
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

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0] || !renderRef.current) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      
      if (newWidth === 0 || newHeight === 0) return;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;

      Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
      Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
      Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(jitterInterval);
      resizeObserver.disconnect();
      render.canvas.removeEventListener('mousedown', handleCanvasClick);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <section id="brand-physics" className="py-16 md:py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            OUR <span className="text-gradient">SERVICE</span> PILLARS
          </h2>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl mx-auto px-4">
            A limitless digital playground. Click anywhere to defy gravity or toss our expertise around.
          </p>
        </div>
        
        <div className="relative group max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div 
            ref={containerRef}
            className="w-full h-[450px] md:h-[480px] relative rounded-[40px] overflow-hidden bg-white/60 glass border border-white/50 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-all hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
              <span className="text-[15vw] font-black tracking-tighter uppercase italic leading-none">iGROWTHIC</span>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black/5 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] pointer-events-none opacity-40 group-hover:opacity-100 transition-all transform group-hover:scale-105">
              Disrupt Gravity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicsBrand;
