
import React, { useState } from 'react';
import { RobloxGame } from '../types';

interface GamePlayerProps {
  game: RobloxGame;
  onClose: () => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [activeNode, setActiveNode] = useState('https://mathematics.life/');

  const nodes = [
    { name: 'Mathematics', url: 'https://mathematics.life/' },
    { name: 'Nebula', url: 'https://nebula.rip/' },
    { name: 'Now.GG', url: 'https://now.gg/play/roblox-corporation/5349/roblox' }
  ];

  const unblockLaunch = (url: string) => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("Pop-up blocked! Enable them to play.");
      return;
    }

    // Stealth Metadata
    const doc = win.document;
    doc.title = "My Drive - Google Drive";
    const link = doc.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png';
    doc.head.appendChild(link);

    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
    doc.body.style.height = '100vh';
    doc.body.style.overflow = 'hidden';
    doc.body.style.background = '#000';

    const iframe = doc.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = url;
    iframe.allow = "autoplay; fullscreen; keyboard; gamepad; clipboard-read; clipboard-write";
    
    doc.body.appendChild(iframe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <img src={game.thumbnail} className="w-12 h-12 rounded-lg object-cover" />
             <div>
                <h3 className="font-black uppercase italic leading-none">{game.name}</h3>
                <span className="text-[9px] text-blue-500 font-bold uppercase">{game.playing} playing</span>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="space-y-3 mb-8">
           <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest block">Select Relay Node</label>
           <div className="grid grid-cols-1 gap-2">
              {nodes.map(n => (
                <button 
                  key={n.name}
                  onClick={() => setActiveNode(n.url)}
                  className={`w-full py-4 px-6 rounded-xl border text-left font-black text-xs uppercase tracking-widest transition-all ${activeNode === n.url ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                >
                  {n.name}
                </button>
              ))}
           </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => unblockLaunch(activeNode)}
            className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl"
          >
            Launch Protected
          </button>
          <p className="text-[9px] text-gray-700 text-center font-black uppercase italic">
            Opened in cloaked window (about:blank)
          </p>
        </div>
      </div>
    </div>
  );
};
