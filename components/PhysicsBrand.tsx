
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
    if (!Matter) return;

    const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, Events, Body } = Matter;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (width === 0 || height === 0) return;

    const isMobile = window.innerWidth < 768;
    const displayTags = isMobile ? tags.slice(0, 12) : tags;

    const engine = Engine.create({ 
      enableSleeping: true,
      positionIterations: isMobile ? 6 : 10,
      velocityIterations: isMobile ? 6 : 10
    });
    engineRef.current = engine;
    engine.gravity.y = isMobile ? 0.3 : 0.35; 

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: isMobile ? 1 : Math.min(window.devicePixelRatio, 2)
      }
    });
    renderRef.current = render;

    const createTag = (x: number, y: number, text: string) => {
      const fontMultiplier = isMobile ? 6 : 8.5;
      const horizontalPadding = isMobile ? 22 : 38;
      const tagWidth = text.length * fontMultiplier + horizontalPadding;
      const tagHeight = isMobile ? 30 : 40;
      
      const isDark = Math.random() > 0.5;
      const color = isDark ? '#1a1d21' : '#ffffff';
      const textColor = isDark ? '#ffffff' : '#1a1d21';

      const body = Bodies.rectangle(x, y, tagWidth, tagHeight, {
        friction: 0.05,
        frictionAir: 0.02, 
        restitution: 0.7, 
        chamfer: { radius: tagHeight / 2 },
        render: {
          fillStyle: color,
          strokeStyle: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1
        }
      });

      body.labelData = { text, textColor };
      Body.setAngle(body, (Math.random() - 0.5));
      return body;
    };

    const wallThickness = 100; 
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 3, wallThickness, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 3, wallThickness, { isStatic: true, render: { visible: false } });
    
    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    let spawnIndex = 0;
    const spawnInterval = setInterval(() => {
      if (spawnIndex >= displayTags.length) {
        clearInterval(spawnInterval);
        return;
      }
      const x = (width * 0.2) + (Math.random() * (width * 0.6));
      Composite.add(engine.world, createTag(x, -50, displayTags[spawnIndex]));
      spawnIndex++;
    }, isMobile ? 400 : 250);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    });

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.font = `${isMobile ? '600 10px' : '700 12px'} 'Inter', sans-serif`;
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
      Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
      Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      clearInterval(spawnInterval);
      resizeObserver.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <section id="brand-physics" className="py-12 md:py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            OUR <span className="text-gradient">SERVICE</span> PILLARS
          </h2>
          <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl mx-auto px-4">
            A digital playground. Interact with our expertise through physics.
          </p>
        </div>
        
        <div className="relative group max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="w-full h-[400px] md:h-[480px] relative rounded-[32px] md:rounded-[40px] overflow-hidden bg-white/60 glass border border-white/50 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          />
        </div>
      </div>
    </section>
  );
};

export default PhysicsBrand;
