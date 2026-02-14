import React, { useState, useEffect } from 'react';
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
  
  // High-reliability proxy nodes list
  const PROXY_NODES = [
    { name: 'Mathematics Node', url: 'https://mathematics.life/' },
    { name: 'Interstellar Node', url: 'https://interstellar.rip/' },
    { name: 'Shuttle Node', url: 'https://shuttle.rip/' }
  ];

  const [activeProxy, setActiveProxy] = useState(() => localStorage.getItem('hub_proxy') || PROXY_NODES[0].url);

  useEffect(() => {
    localStorage.setItem('hub_proxy', activeProxy);
  }, [activeProxy]);

  const CLOUD_MOON_URL = 'https://web.cloudmoonapp.com';

  const encodeUrl = (url: string) => {
    // Robust Base64 encoding for UV proxies
    return btoa(url).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
  };

  const unblockLaunch = (url: string) => {
    if (!url) return;
    let targetUrl = url.trim();
    
    // Improved detection for search vs direct URL
    if (!targetUrl.startsWith('http')) {
      if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
        targetUrl = 'https://' + targetUrl;
      } else {
        // Use DuckDuckGo - better for proxying than Google
        targetUrl = `https://duckduckgo.com/?q=${encodeURIComponent(targetUrl)}`;
      }
    }

    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("POP-UP BLOCKED: Please enable pop-ups to enter the portal.");
      return;
    }

    const encoded = encodeUrl(targetUrl);
    const finalUrl = (targetUrl.includes('cloudmoonapp.com')) 
      ? targetUrl 
      : `${activeProxy.endsWith('/') ? activeProxy : activeProxy + '/'}service/${encoded}`;

    const doc = win.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Google Drive - Personal Files</title>
        <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
        <style>
          html, body { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; }
          iframe { width: 100%; height: 100%; border: none; position: absolute; }
        </style>
      </head>
      <body>
        <iframe src="${finalUrl}" allow="autoplay; fullscreen; keyboard; gamepad; clipboard-read; clipboard-write"></iframe>
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
      {/* Navbar - Balanced Standard Size */}
      <nav className="sticky top-0 z-[60] bg-black/90 backdrop-blur-md border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('vault')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-xl shadow-blue-600/20 text-white text-lg transition-transform group-hover:scale-105">R</div>
          <h1 className="text-xl font-black italic uppercase tracking-widest hidden sm:block">Roblox<span className="text-blue-500">Hub</span></h1>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          <button onClick={() => setActiveTab('vault')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'vault' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Portal</button>
          <button onClick={() => setActiveTab('studio')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'studio' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Build</button>
          <button onClick={() => setActiveTab('discover')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'discover' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Explore</button>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Global Matrix Active</span>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12 max-w-5xl">
        {activeTab === 'vault' && (
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="bg-[#080808] border border-white/10 rounded-[2.5rem] p-12 shadow-2xl">
               <div className="text-center mb-10">
                 <h2 className="text-4xl font-black uppercase italic mb-2 tracking-tighter">Access <span className="text-blue-500">Node</span></h2>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.4em]">High-Speed Encrypted Gateway</p>
               </div>

               <div className="relative mb-10">
                  <input 
                    type="text" 
                    value={webQuery}
                    onChange={(e) => setWebQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && unblockLaunch(webQuery)}
                    placeholder="Search or Enter URL..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-lg text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-gray-800"
                  />
                  <button 
                    onClick={() => unblockLaunch(webQuery)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl font-black text-xs uppercase transition-all text-white shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    Launch
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <button onClick={() => unblockLaunch(CLOUD_MOON_URL)} className="group p-10 bg-white/5 border border-white/5 rounded-[2rem] text-left hover:bg-white/10 hover:border-blue-500/30 transition-all">
                     <div className="flex justify-between items-center mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-base group-hover:scale-110 transition-transform">CM</div>
                        <span className="text-xs font-black text-blue-400 bg-blue-400/10 px-4 py-1 rounded-full uppercase tracking-widest border border-blue-400/20">Fast</span>
                     </div>
                     <h4 className="text-xl font-black uppercase italic group-hover:text-blue-400 transition-colors">Cloud Player</h4>
                     <p className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-widest">External Virtual VM</p>
                  </button>

                  <button onClick={() => unblockLaunch('https://google.com')} className="group p-10 bg-white/5 border border-white/5 rounded-[2rem] text-left hover:bg-white/10 hover:border-gray-500/30 transition-all">
                     <div className="flex justify-between items-center mb-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black text-base group-hover:scale-110 transition-transform">G</div>
                        <span className="text-xs font-black text-gray-500 bg-white/5 px-4 py-1 rounded-full uppercase tracking-widest border border-white/10">Stealth</span>
                     </div>
                     <h4 className="text-xl font-black uppercase italic group-hover:text-gray-200 transition-colors">Private Search</h4>
                     <p className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-widest">Cloaked Browser Tunnel</p>
                  </button>
               </div>

               {/* RE-ADDED CLOUDMOON LINK COPY SECTION */}
               <div className="flex flex-col items-center pt-10 border-t border-white/5">
                 <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-4">Direct Access Link</p>
                 <button 
                   onClick={() => copyToClipboard(CLOUD_MOON_URL)}
                   className={`px-8 py-3 bg-white/5 border border-white/5 rounded-2xl transition-all flex items-center gap-4 hover:bg-white/10 ${copied ? 'border-green-500/30' : ''}`}
                 >
                   <code className="font-mono text-xs text-blue-500 font-bold uppercase">{copied ? 'Link Copied!' : CLOUD_MOON_URL}</code>
                   {!copied && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>}
                 </button>
                 <p className="mt-6 text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em]">Active Proxy: <span className="text-blue-600">{activeProxy}</span></p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'studio' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
             <div className="bg-[#080808] border border-white/10 rounded-[2.5rem] p-12 shadow-2xl max-w-4xl mx-auto">
                <div className="mb-10">
                  <h3 className="text-2xl font-black uppercase italic mb-3 text-blue-500">Matrix <span className="text-white">Settings</span></h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-bold uppercase tracking-widest">Choose a different node if search is blocked.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {PROXY_NODES.map((node) => (
                    <button 
                      key={node.url}
                      onClick={() => setActiveProxy(node.url)}
                      className={`p-8 rounded-3xl border text-left transition-all ${activeProxy === node.url ? 'bg-blue-600 border-blue-400 shadow-xl' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                    >
                      <h5 className="text-sm font-black uppercase italic mb-2">{node.name}</h5>
                      <p className="text-[10px] text-white/40 truncate font-mono">{node.url}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase text-gray-600 block tracking-widest">Custom Node Configuration</label>
                  <input 
                    type="text" 
                    value={activeProxy}
                    onChange={(e) => setActiveProxy(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-4 text-sm font-mono text-blue-400 outline-none focus:border-blue-600 transition-all"
                  />
                </div>
             </div>
             <EmbedGenerator proxyNode={activeProxy} />
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <section className="rounded-[3rem] bg-gradient-to-br from-blue-900/30 to-black border border-white/10 p-20 text-center shadow-2xl">
              <h2 className="text-6xl font-black italic uppercase mb-4 tracking-tighter">Direct <span className="text-blue-500">Matrix</span></h2>
              <p className="text-lg text-gray-400 font-bold uppercase mb-12 tracking-[0.4em]">Integrated Global Gaming System</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button onClick={() => unblockLaunch(CLOUD_MOON_URL)} className="bg-blue-600 hover:bg-blue-500 px-14 py-5 rounded-2xl font-black text-sm uppercase text-white shadow-2xl transition-all hover:scale-105">Launch Cloud VM</button>
                <button onClick={() => unblockLaunch('https://roblox.com')} className="bg-white text-black hover:bg-gray-100 px-14 py-5 rounded-2xl font-black text-sm uppercase shadow-2xl transition-all hover:scale-105">Roblox Website</button>
              </div>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-10 px-4">
                <h3 className="text-xs font-black uppercase text-gray-600 italic tracking-[0.5em]">Active Experiences</h3>
                <button onClick={() => setIsMarketplaceOpen(true)} className="text-xs font-black uppercase text-blue-500 hover:underline tracking-widest">Expand Library</button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_GAMES.slice(0, 4).map((game) => (
                  <div key={game.id} className="group relative aspect-square bg-[#080808] rounded-[2.5rem] overflow-hidden border border-white/10 cursor-pointer hover:border-blue-500/40 transition-all shadow-xl" onClick={() => setSelectedGame(game)}>
                    <img src={game.thumbnail} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" alt={game.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-8 flex flex-col justify-end">
                       <h4 className="font-black text-lg uppercase italic group-hover:text-blue-400 transition-colors leading-tight">{game.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="py-20 text-center border-t border-white/5 opacity-40">
        <p className="text-[10px] font-black text-gray-700 uppercase tracking-[1em]">&copy; 2025 HUB NETWORK SYSTEMS V5</p>
      </footer>

      {isMarketplaceOpen && <Marketplace onSelectGame={setSelectedGame} onClose={() => setIsMarketplaceOpen(false)} />}
      {selectedGame && <GamePlayer game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </div>
  );
};

export default App;