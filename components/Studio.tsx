
import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, Video, TrendingUp, BarChart } from 'lucide-react';

interface ContentIdea {
  title: string;
  hook: string;
  type: string;
}

const TEMPLATES: Record<string, ContentIdea[]> = {
  Viral: [
    { title: "The 'Secret Hack' Reveal", hook: "Did you know that 90% of [Niche] professionals are doing this wrong?", type: "Cinematic Reel" },
    { title: "Before vs After Transformation", hook: "How we scaled a [Niche] brand from 0 to 1M in 30 days.", type: "Short-form Story" },
    { title: "The Unpopular Opinion", hook: "Stop focusing on [Common Goal]. Here is what actually drives growth in 2026.", type: "Educational Video" }
  ],
  Sales: [
    { title: "Direct Value Proposition", hook: "If you're tired of [Problem], our [Service] is the only bridge to [Result].", type: "Direct Response Ad" },
    { title: "The Client Proof Breakdown", hook: "How we helped a [Niche] founder save 40 hours a week using our framework.", type: "Case Study Reel" },
    { title: "Limited Availability Tease", hook: "We're opening 3 new spots for our [Niche] scale-up program today.", type: "Conversion Focus" }
  ],
  Engagement: [
    { title: "The Interactive 'Choose' Story", hook: "A vs B: Which [Niche Trend] are you betting on this quarter?", type: "Interactive Story" },
    { title: "Behind The Scenes Reality", hook: "The reality of building a [Niche] brand that nobody shows you on camera.", type: "Founder Vlog" },
    { title: "Weekly Q&A Deep Dive", hook: "You asked, we answered. The top 3 questions from our [Niche] community.", type: "Community Builder" }
  ]
};

const Studio: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState<'Viral' | 'Sales' | 'Engagement'>('Viral');
  const [results, setResults] = useState<ContentIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    
    setIsGenerating(true);
    setResults([]);
    
    // Local processing simulation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Map niche into templates
    const baseIdeas = TEMPLATES[goal];
    const customized = baseIdeas.map(idea => ({
      ...idea,
      hook: idea.hook.replace('[Niche]', niche)
    }));

    setResults(customized);
    setIsGenerating(false);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8 sticky top-32">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} />
              iGROWTHIC STUDIO v1.0 (OFFLINE)
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black leading-tight tracking-tighter mb-4">
              GROWTH <span className="text-gradient">STUDIO</span>
            </h1>
            <p className="text-gray-500 font-medium">
              Plug in your niche. Generate high-retention content roadmaps instantly from our proven frameworks.
            </p>
          </div>

          <form onSubmit={generateIdeas} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Target Niche</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Real Estate"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none font-bold text-gray-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Campaign Goal</label>
              <div className="grid grid-cols-1 gap-2">
                {(['Viral', 'Sales', 'Engagement'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                      goal === g ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {g}
                    {goal === g && <ArrowRight size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isGenerating}
              className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  <Zap size={16} className="fill-current" />
                  Apply Strategy
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Display */}
        <div className="lg:col-span-8">
          {!results.length && !isGenerating ? (
            <div className="glass-card h-[500px] rounded-[40px] flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-black/5">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                <BarChart size={40} />
              </div>
              <h3 className="text-2xl font-heading font-black text-gray-300 uppercase">Awaiting Strategy</h3>
              <p className="text-gray-400 max-w-sm mt-2">Enter your niche to unlock the iGROWTHIC 2026 content framework for your brand.</p>
            </div>
          ) : isGenerating ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card h-32 rounded-[32px] animate-pulse bg-gray-50/50" />
              ))}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="flex items-center justify-between px-4 mb-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                  <TrendingUp size={16} /> Strategy for {niche}
                </h3>
              </div>
              {results.map((res, idx) => (
                <div key={idx} className="group glass-card p-8 rounded-[32px] hover:shadow-xl transition-all border border-transparent hover:border-blue-100 flex flex-col md:flex-row gap-8 items-center cursor-none">
                  <div className="p-5 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Video size={32} />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{res.type}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">PROVEN</span>
                    </div>
                    <h4 className="text-2xl font-heading font-black mb-3">{res.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed italic">"{res.hook}"</p>
                  </div>
                  <a 
                    href={`https://wa.me/919892299010?text=Implement Strategy: ${res.title}`}
                    target="_blank"
                    className="p-4 bg-gray-50 rounded-full text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all hover:scale-110"
                  >
                    <ArrowRight size={24} />
                  </a>
                </div>
              ))}
              
              <div className="mt-12 p-8 bg-blue-500 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-heading font-black mb-2">Ready to implement?</h3>
                  <p className="text-blue-100 font-medium">Our Mumbai HQ handles full production for these exact frameworks.</p>
                </div>
                <a 
                  href="https://wa.me/919892299010"
                  className="px-8 py-4 bg-white text-blue-500 font-black uppercase tracking-widest text-xs rounded-full shadow-lg hover:scale-105 transition-transform whitespace-nowrap"
                >
                  Book Free Consult
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Studio;
