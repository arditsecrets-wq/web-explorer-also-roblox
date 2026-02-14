
import React, { useState } from 'react';
import { MOCK_GAMES } from '../constants';
import { RobloxGame } from '../types';

interface MarketplaceProps {
  onSelectGame: (game: RobloxGame) => void;
  onClose: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onSelectGame, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Popular', 'Horror', 'Simulator', 'Obby', 'Roleplay'];

  const filteredGames = MOCK_GAMES.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || game.description.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#030303] animate-in fade-in duration-300">
      <div className="h-14 glass border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-black/80">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onClose}>
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center font-black italic">R</div>
            <h2 className="font-black text-sm tracking-tighter italic">MARKET</h2>
          </div>
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-64 gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-[10px] w-full font-medium"
            />
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/5 text-gray-500'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGames.map(game => (
            <div key={game.id} onClick={() => onSelectGame(game)} className="group glass rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer shadow-lg">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img src={game.thumbnail} className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all" />
                <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-black text-blue-400 border border-blue-500/10">
                  {game.playing}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-black text-[11px] truncate uppercase">{game.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[8px] text-gray-600 font-bold uppercase">{game.creator}</span>
                  <span className="text-[8px] text-yellow-500 font-black">★ {game.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
