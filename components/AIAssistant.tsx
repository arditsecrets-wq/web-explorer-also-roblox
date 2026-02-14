
import React, { useState } from 'react';
import { getGameRecommendations } from '../services/geminiService';
import { RecommendedGame } from '../types';

export const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RecommendedGame[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const recs = await getGameRecommendations(query);
    setResults(recs);
    setLoading(false);
  };

  return (
    <div className="glass rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-blue-500/10">
        <h3 className="font-bold flex items-center gap-2">
          <span className="text-xl">🤖</span> Bloxy AI Assistant
        </h3>
        <p className="text-xs text-gray-400 mt-1">Discover experiences with AI</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {results.length === 0 && !loading && (
          <div className="text-center py-10 opacity-50">
            <p className="text-sm">Describe the kind of game you're in the mood for!</p>
            <p className="text-[10px] mt-2">Example: "I want a horror game with puzzles"</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {results.map((game, idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{game.category}</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">{game.name}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{game.reason}</p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask AI..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
