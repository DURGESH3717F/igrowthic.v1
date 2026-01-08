
import React, { useState } from 'react';
import { getMarketingStrategy } from '../services/gemini';
import { Sparkles, Brain, X, ArrowRight } from 'lucide-react';

interface StrategyModalProps {
  onClose: () => void;
}

const StrategyModal: React.FC<StrategyModalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const result = await getMarketingStrategy(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-[450px] min-h-[450px] rounded-[32px] p-8 relative flex flex-col items-center text-center shadow-2xl animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-blue-500 transition-colors"
        >
          <X size={24} />
        </button>

        {!response ? (
          <>
            <div className="mb-6 p-4 bg-blue-50 text-blue-500 rounded-2xl">
              <Brain size={32} />
            </div>
            <h3 className="text-2xl font-heading font-black gold-text mb-4 uppercase flex items-center gap-2">
              <Sparkles size={20} className="text-yellow-500" />
              Unlock Growth
            </h3>
            <p className="text-sm text-gray-700 font-medium leading-relaxed mb-6">
              Enter your business niche or industry and our AI strategist will give you 3 tips to scale.
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="e.g. Luxury Real Estate"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-12 px-5 bg-black/5 border border-black/5 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#4a9eff] text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Analyzing...' : 'Get Strategy'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col h-full w-full">
            <div className="mb-6 p-4 bg-blue-500 text-white rounded-2xl self-center">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-heading font-black text-blue-500 mb-6 uppercase">Your Roadmap</h3>
            <div className="flex-grow text-left text-sm text-gray-600 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
              {response.split('\n').filter(line => line.trim()).map((line, i) => (
                <div key={i} className="flex gap-3 items-start bg-blue-50/50 p-3 rounded-xl">
                  <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  <p className="leading-relaxed font-medium">{line.replace(/^\s*[-*•]\s*/, '')}</p>
                </div>
              ))}
            </div>
            <a 
              href="https://wa.me/919892299010" 
              className="mt-6 py-4 bg-black text-white font-bold rounded-xl text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Scale This With Us
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyModal;
