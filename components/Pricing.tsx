
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, isFeatured: boolean) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    const baseScale = isFeatured ? 1.05 : 1;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${baseScale + 0.02})`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, isFeatured: boolean) => {
    const card = e.currentTarget;
    const baseScale = isFeatured ? 1.05 : 1;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(${baseScale})`;
  };

  const plans = [
    {
      name: 'STARTER',
      price: isAnnual ? '30,000' : '3,000',
      desc: 'Best for Beginners looking to establish presence.',
      features: ['2 Professional Reels', '4 Strategic Posts', '10 Days Management', 'Basic Engagement'],
      isLight: false
    },
    {
      name: 'GROWTH',
      price: isAnnual ? '60,000' : '6,000',
      desc: 'Accelerate your reach with consistent delivery.',
      features: ['6 Professional Reels', '10 Strategic Posts', 'Content Calendar', 'Platform Optimization', 'Monthly Analytics'],
      isLight: true,
      popular: true
    },
    {
      name: 'FULL STACK',
      price: isAnnual ? '1,20,000' : '12,000',
      desc: 'The total digital takeover for serious scale.',
      features: ['12 Professional Reels', '20 Strategic Posts', 'Advanced Hashtag Research', 'Web/App Dev Support', 'Priority Strategy Calls'],
      isLight: false
    }
  ];

  return (
    <section id="investment" className="py-32 px-6 bg-[#111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-4">Select Your Velocity</p>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">SOCIAL MEDIA MARKETING PLANS</h2>
          
          <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${!isAnnual ? 'bg-white text-black shadow-lg' : 'text-gray-400'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${isAnnual ? 'bg-white text-black shadow-lg' : 'text-gray-400'}`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              onMouseMove={(e) => handleMouseMove(e, plan.isLight)}
              onMouseLeave={(e) => handleMouseLeave(e, plan.isLight)}
              className={`relative p-10 rounded-lg border border-white/10 flex flex-col cursor-none ${plan.isLight ? 'bg-white text-black scale-105 z-10' : 'bg-transparent text-white'}`}
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              {plan.popular && (
                <div className="absolute top-8 right-8 bg-[#ff0055] text-white text-[8px] font-black px-2 py-1 rounded">
                  MOST POPULAR
                </div>
              )}
              <p className={`text-[10px] font-black tracking-widest uppercase mb-4 ${plan.isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                {plan.name}
              </p>
              <div className="text-5xl font-heading font-bold mb-4 flex items-baseline">
                <span className="text-2xl mr-1">₹</span>{plan.price}<span className="text-sm font-medium opacity-60 ml-2">/ {isAnnual ? 'year' : 'mo'}</span>
              </div>
              <p className={`text-sm mb-10 pb-6 border-b ${plan.isLight ? 'text-gray-600 border-black/10' : 'text-gray-400 border-white/10'}`}>
                {plan.desc}
              </p>
              <ul className="flex flex-col gap-4 mb-12 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                    <CheckCircle2 size={16} className={plan.isLight ? 'text-blue-600' : 'text-blue-400'} />
                    {f}
                  </li>
                ))}
              </ul>
              <a 
                href={`https://wa.me/919892299010?text=I'm interested in the ${plan.name} plan`}
                className={`w-full py-4 text-center font-black uppercase text-xs tracking-widest rounded transition-colors ${plan.isLight ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
