
import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, Video, Target, TrendingUp, BarChart } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const STUDIO_IDEAS: Record<string, any> = {
  Viral: [
    { title: "The 'Secret Hack' Reveal", hook: "Did you know that 90% of [Niche] professionals are doing [Common Task] wrong?", type: "Short-form Video" },
    { title: "Before vs After Transformation", hook: "How we took [Problem] and turned it into [Result] in 24 hours.", type: "Reels / Shorts" },
    { title: "Unpopular Opinion", hook: "Stop doing [Popular Trend]. Here is why it's killing your brand growth.", type: "Educational Video" }
  ],
  Sales: [
    { title: "The Scarcity Tease", hook: "We only have 3 spots left for our [Service] rollout this quarter.", type: "Direct Response" },
    { title: "The 'Why Now' Story", hook: "The 2026 market shift is here. If you aren't using [Product], you're falling behind.", type: "Conversion Focus" },
    { title: "Client Win Breakdown", hook: "How [Client Name] hit [Big Number] using our 3-step framework.", type: "Case Study" }
  ],
  Engagement: [
    { title: "Community Poll", hook: "A vs B: Which [Niche Accessory] are you rocking this season?", type: "Interactive Story" },
    { title: "AMA - Behind the Scenes", hook: "Ever wondered how we build our [Process]? Ask me anything below.", type: "Community Building" },
    { title: "The Daily Grind", hook: "A day in the life of a [Niche] founder. The reality no one sees.", type: "Vlog" }
  ]
};

const Studio: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState<'Viral' | 'Sales' | 'Engagement'>('Viral');
  const [results, setResults] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Use Gemini API to generate dynamic content roadmaps
  const generateIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setIsGenerating(true);
    setResults([]);
    
    // Create Gemini instance right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 3 specific content ideas for a business in the "${niche}" niche with the campaign goal of "${goal}".`,
        config: {
          systemInstruction: "You are the Lead Content Strategist at iGROWTHIC. You specialize in viral, high-retention content hooks and structures for 2026.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Catchy title of the idea" },
                hook: { type: Type.STRING, description: "A high-retention opening line or hook" },
                type: { type: Type.STRING, description: "The content format (e.g., Cinematic Reel, B2B LinkedIn Post, Direct Response Ad)" }
              },
              required: ["title", "hook", "type"]
            }
          }
        }
      });

      const jsonStr = response.text;
      if (jsonStr) {
        setResults(JSON.parse(jsonStr.trim()));
      } else {
        setResults(STUDIO_IDEAS[goal]);
      }
    } catch (error) {
      console.error("iGROWTHIC Studio AI Engine Error:", error);
      // Fallback to pre-defined ideas if API fails
      setResults(STUDIO_IDEAS[goal]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8 sticky top-32">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} />
              AI Studio v2.6
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black leading-tight tracking-tighter mb-4">
              GROWTH <span className="text-gradient">STUDIO</span>
            </h1>
            <p className="text-gray-500 font-medium">
              Plug in your niche. Generate high-retention content frameworks in seconds.
            </p>
          </div>

          <form onSubmit={generateIdeas} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Target Niche</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Luxury Real Estate"
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
                  Calculating...
                </>
              ) : (
                <>
                  <Zap size={16} className="fill-current" />
                  Generate Roadmap
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
              <h3 className="text-2xl font-heading font-black text-gray-300 uppercase">Awaiting Input</h3>
              <p className="text-gray-400 max-w-sm mt-2">Enter your niche and select a goal to unlock your custom 2026 content strategy.</p>
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
                  <TrendingUp size={16} /> Optimized for {niche}
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
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">High Retention</span>
                    </div>
                    <h4 className="text-2xl font-heading font-black mb-3">{res.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed italic">"{res.hook}"</p>
                  </div>
                  <a 
                    href="https://wa.me/919892299010"
                    target="_blank"
                    className="p-4 bg-gray-50 rounded-full text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all hover:scale-110"
                  >
                    <ArrowRight size={24} />
                  </a>
                </div>
              ))}
              
              <div className="mt-12 p-8 bg-blue-500 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-heading font-black mb-2">Need these scripts written?</h3>
                  <p className="text-blue-100 font-medium">Our full-stack team handles scripts, production, and posting.</p>
                </div>
                <a 
                  href="https://wa.me/919892299010"
                  className="px-8 py-4 bg-white text-blue-500 font-black uppercase tracking-widest text-xs rounded-full shadow-lg hover:scale-105 transition-transform whitespace-nowrap"
                >
                  Book Free Audit
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
