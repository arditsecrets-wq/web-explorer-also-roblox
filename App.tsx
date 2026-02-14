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
      alert("POP-UP BLOCKED: Please enable pop-ups.");
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
          iframe { width: 100%; height: 100%; border: none; position: absolute; }
        </style>
      </head>
      <body>
        <iframe src="${proxyGateway}" allow="autoplay; fullscreen; keyboard; gamepad"></iframe>
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
      <nav className="sticky top-0 z-[60] bg-black/90 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('vault')}>
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20 text-white text-[10px]">R</div>
          <h1 className="text-xs font-black italic uppercase tracking-widest">Roblox<span className="text-blue-500">Hub</span></h1>
        </div>
        
        <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
          <button onClick={() => setActiveTab('vault')} className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'vault' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}>Portal</button>
          <button onClick={() => setActiveTab('studio')} className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'studio' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}>Embed</button>
          <button onClick={() => setActiveTab('discover')} className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'discover' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}>Discovery</button>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span className="text-[8px] font-black text-gray-600 uppercase">Live</span>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {activeTab === 'vault' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#080808] border border-white/5 rounded-3xl p-8 shadow-xl">
               <div className="text-center mb-6">
                 <h2 className="text-2xl font-black uppercase italic mb-1">Web <span className="text-blue-500">Gateway</span></h2>
                 <p className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.2em]">Secure Proxy Node</p>
               </div>

               <div className="relative mb-8">
                  <input 
                    type="text" 
                    value={webQuery}
                    onChange={(e) => setWebQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && unblockLaunch(webQuery)}
                    placeholder="URL or Search..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-xs text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-gray-700"
                  />
                  <button 
                    onClick={() => unblockLaunch(webQuery)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-black text-[9px] uppercase transition-all text-white"
                  >
                    Go
                  </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <button onClick={() => unblockLaunch(CLOUD_MOON_URL)} className="p-5 bg-white/5 border border-white/5 rounded-2xl text-left hover:bg-white/10 transition-all">
                     <div className="flex justify-between items-center mb-2">
                        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center font-black text-[9px]">CM</div>
                        <span className="text-[7px] font-black text-blue-400 bg-blue-400/5 px-1.5 py-0.5 rounded">PREMIUM</span>
                     </div>
                     <h4 className="text-sm font-black uppercase italic">Cloud Moon</h4>
                     <p className="text-[8px] text-gray-600 font-bold mt-1 uppercase">High Performance</p>
                  </button>

                  <button onClick={() => unblockLaunch('https://google.com')} className="p-5 bg-white/5 border border-white/5 rounded-2xl text-left hover:bg-white/10 transition-all">
                     <div className="flex justify-between items-center mb-2">
                        <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center font-black text-[9px]">G</div>
                        <span className="text-[7px] font-black text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">PRIVATE</span>
                     </div>
                     <h4 className="text-sm font-black uppercase italic">Search</h4>
                     <p className="text-[8px] text-gray-600 font-bold mt-1 uppercase">Standard Web</p>
                  </button>
               </div>

               <div className="flex flex-col items-center pt-6 border-t border-white/5">
                 <button 
                   onClick={() => copyToClipboard(CLOUD_MOON_URL)}
                   className={`px-4 py-2 bg-white/5 border border-white/5 rounded-lg transition-all flex items-center gap-3 ${copied ? 'border-green-500/50' : 'hover:bg-white/10'}`}
                 >
                   <code className="font-mono text-[10px] text-blue-500 font-bold">{copied ? 'COPIED!' : CLOUD_MOON_URL}</code>
                 </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'studio' && <EmbedGenerator />}

        {activeTab === 'discover' && (
          <div className="space-y-8">
            <section className="rounded-3xl bg-gradient-to-br from-blue-900/20 to-black border border-white/5 p-8 text-center">
              <h2 className="text-3xl font-black italic uppercase mb-2 tracking-tighter">Instant <span className="text-blue-500">Access</span></h2>
              <p className="text-gray-500 text-[9px] font-bold uppercase mb-6 tracking-widest">Universal Relay Hub</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => unblockLaunch(CLOUD_MOON_URL)} className="bg-blue-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase text-white shadow-lg">Cloud Gaming</button>
                <button onClick={() => unblockLaunch('https://roblox.com')} className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase">Roblox Direct</button>
              </div>
            </section>

            <section>
              <h3 className="text-[9px] font-black uppercase text-gray-600 italic mb-4 tracking-widest">Node Experiences</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_GAMES.slice(0, 4).map((game) => (
                  <div key={game.id} className="group relative aspect-square bg-[#080808] rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-blue-500/30 transition-all" onClick={() => setSelectedGame(game)}>
                    <img src={game.thumbnail} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all" alt={game.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-4 flex flex-col justify-end">
                       <h4 className="font-black text-[10px] uppercase italic leading-none truncate">{game.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="py-8 text-center border-t border-white/5">
        <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest">&copy; 2025 Experience Portal</span>
      </footer>

      {isMarketplaceOpen && <Marketplace onSelectGame={setSelectedGame} onClose={() => setIsMarketplaceOpen(false)} />}
      {selectedGame && <GamePlayer game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </div>
  );
};

export default App;