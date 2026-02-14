import React, { useState } from 'react';
import { MOCK_GAMES } from './constants';
import { EmbedGenerator } from './components/EmbedGenerator';
import { GamePlayer } from './components/GamePlayer';
import { Marketplace } from './components/Marketplace';
import { RobloxGame } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'vault' | 'studio'>('vault');
  const [selectedGame, setSelectedGame] = useState<RobloxGame | null>(null);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [webQuery, setWebQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const PROXY_NODE = 'https://mathematics.life/';
  const CLOUD_MOON_URL = 'https://web.cloudmoonapp.com';

  const unblockLaunch = (url: string) => {
    if (!url) return;
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) {
      if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
        targetUrl = 'https://' + targetUrl;
      } else {
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`;
      }
    }

    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("POP-UP BLOCKED: Please enable pop-ups to launch the portal.");
      return;
    }

    const encoded = btoa(targetUrl).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
      
    const proxyGateway = (targetUrl.includes('mathematics.life') || targetUrl.includes('cloudmoonapp.com')) 
      ? targetUrl 
      : `${PROXY_NODE}service/${encoded}`;

    const doc = win.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Drive - Google Drive</title>
        <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
        <style>
          html, body { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; }
          iframe { width: 100%; height: 100%; border: none; margin: 0; padding: 0; position: absolute; top: 0; left: 0; }
        </style>
      </head>
      <body>
        <iframe src="${proxyGateway}" allow="autoplay; fullscreen; keyboard; gamepad; clipboard-read; clipboard-write"></iframe>
      </body>
      </html>
    `);
    doc.close();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#020202] text-white ${selectedGame || isMarketplaceOpen ? 'overflow-hidden' : ''}`}>
      <nav className="sticky top-0 z-[60] bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('vault')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20 text-white">R</div>
          <h1 className="text-sm font-black italic uppercase tracking-widest">Roblox<span className="text-blue-500">Hub</span></h1>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab('vault')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'vault' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Web Explorer</button>
          <button onClick={() => setActiveTab('studio')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'studio' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Studio</button>
          <button onClick={() => setActiveTab('discover')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'discover' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Discovery</button>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Status: Active</span>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        {activeTab === 'vault' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#080808] border border-white/10 rounded-[3rem] p-12 shadow-2xl">
               <div className="text-center mb-12">
                 <h2 className="text-4xl font-black uppercase italic mb-3">Web <span className="text-blue-500">Explorer</span></h2>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Encrypted Relay Node</p>
               </div>

               <div className="relative mb-12">
                  <input 
                    type="text" 
                    value={webQuery}
                    onChange={(e) => setWebQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && unblockLaunch(webQuery)}
                    placeholder="Search or enter URL..."
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-gray-700 shadow-inner"
                  />
                  <button 
                    onClick={() => unblockLaunch(webQuery)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase transition-all shadow-lg text-white"
                  >
                    Launch
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <button onClick={() => unblockLaunch(CLOUD_MOON_URL)} className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl text-left hover:bg-blue-600/20 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">CM</div>
                        <span className="text-[9px] font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded">PREMIUM</span>
                     </div>
                     <h4 className="text-xl font-black uppercase italic group-hover:text-blue-400 transition-colors">Cloud Moon</h4>
                     <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase leading-relaxed">Dedicated cloud gaming bridge for performance apps.</p>
                  </button>

                  <button onClick={() => unblockLaunch('https://google.com')} className="p-8 bg-white/5 border border-white/10 rounded-3xl text-left hover:bg-white/10 transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black">G</div>
                        <span className="text-[9px] font-black text-gray-500 bg-white/5 px-2 py-1 rounded">PRIVATE</span>
                     </div>
                     <h4 className="text-xl font-black uppercase italic group-hover:text-white transition-colors">Google Mirror</h4>
                     <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase leading-relaxed">Secure browsing relay for any public web resource.</p>
                  </button>
               </div>

               <div className="flex flex-col items-center pt-8 border-t border-white/5">
                 <span className="text-[9px] font-black text-gray-700 uppercase mb-3 tracking-[0.2em]">Resource Quick-Copy</span>
                 <button 
                   onClick={() => copyToClipboard(CLOUD_MOON_URL)}
                   className={`group relative px-6 py-3 bg-white/5 border border-white/5 rounded-xl transition-all active:scale-95 flex items-center gap-3 ${copied ? 'bg-green-500/10 border-green-500/50' : 'hover:bg-white/10'}`}
                 >
                   <code className={`font-mono text-[11px] font-bold tracking-tight transition-colors ${copied ? 'text-green-500' : 'text-blue-500'}`}>{copied ? 'COPIED TO CLIPBOARD' : CLOUD_MOON_URL}</code>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={copied ? 'text-green-500' : 'text-gray-600'}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                 </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'studio' && <EmbedGenerator />}

        {activeTab === 'discover' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900/40 via-black to-black border border-blue-500/20 p-12 text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-5xl font-black italic uppercase mb-4 tracking-tighter">Secure <span className="text-blue-500">Relay</span></h2>
                <p className="text-gray-400 text-xs font-bold uppercase mb-10 tracking-[0.2em]">Universal Experience Portal</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <button onClick={() => unblockLaunch(CLOUD_MOON_URL)} className="bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl">
                    Launch Cloud Moon
                  </button>
                  <button onClick={() => unblockLaunch('https://roblox.com')} className="bg-white hover:bg-gray-100 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl">
                    Direct Hub
                  </button>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase text-gray-600 italic tracking-[0.3em]">Node Experiences</h3>
                <div className="h-px flex-1 mx-6 bg-white/5"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {MOCK_GAMES.slice(0, 4).map((game) => (
                  <div key={game.id} className="group relative aspect-[4/5] bg-[#080808] rounded-3xl overflow-hidden border border-white/5 cursor-pointer hover:border-blue-500/30 transition-all" onClick={() => setSelectedGame(game)}>
                    <img src={game.thumbnail} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all" alt={game.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
                       <h4 className="font-black text-sm uppercase italic leading-none mb-2">{game.name}</h4>
                       <span className="text-[9px] text-blue-500 font-bold uppercase">{game.playing} Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="p-12 text-center border-t border-white/5">
        <span className="text-[9px] font-black text-gray-800 uppercase tracking-[1.5em]">&copy; 2025 Experience Portal | Universal Hub</span>
      </footer>

      {isMarketplaceOpen && <Marketplace onSelectGame={setSelectedGame} onClose={() => setIsMarketplaceOpen(false)} />}
      {selectedGame && <GamePlayer game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </div>
  );
};

export default App;