import React, { useState, useEffect } from 'react';

interface EmbedGeneratorProps {
  proxyNode?: string;
}

export const EmbedGenerator: React.FC<EmbedGeneratorProps> = ({ proxyNode = 'https://mathematics.life/' }) => {
  const [panicUrl, setPanicUrl] = useState('https://classroom.google.com');
  const [activeView, setActiveView] = useState<'file' | 'snippet'>('file');
  const [customCode, setCustomCode] = useState('');

  const getTemplate = (proxy: string, panic: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Files - Google Drive</title>
    <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; font-family: 'Inter', -apple-system, sans-serif; color: #fff; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; z-index: 1; }
        #panic-screen { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        
        .ui-dock { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); z-index: 100; background: rgba(10,10,10,0.95); padding: 20px 40px; border-radius: 60px; border: 1px solid rgba(255,255,255,0.1); display: flex; gap: 20px; backdrop-filter: blur(30px); box-shadow: 0 40px 100px rgba(0,0,0,0.95); transition: 0.3s; }
        .ui-dock:hover { border-color: #2563eb; }
        
        input { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 18px 30px; border-radius: 30px; outline: none; font-size: 18px; width: 400px; font-weight: 500; transition: 0.2s; }
        input:focus { border-color: #2563eb; background: rgba(255,255,255,0.15); }
        
        button { background: #2563eb; color: #fff; border: none; padding: 18px 40px; border-radius: 30px; cursor: pointer; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        button:hover { background: #3b82f6; transform: translateY(-2px); }

        .hint { position: fixed; top: 30px; right: 30px; z-index: 10; font-size: 11px; font-weight: 900; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 4px; pointer-events: none; }
    </style>
</head>
<body>
    <div class="hint">Press ESC to Exit System</div>
    <div id="panic-screen"><iframe src="${panicUrl}" style="width:100%;height:100%"></iframe></div>
    <iframe id="main-view" src="${proxy}" allow="autoplay; fullscreen; gamepad; keyboard; clipboard-read; clipboard-write"></iframe>
    
    <div class="ui-dock" id="dock">
        <input type="text" id="query-input" placeholder="Search or URL...">
        <button onclick="deploy()">Launch</button>
    </div>

    <script>
        const BASE = "${proxy.endsWith('/') ? proxy : proxy + '/'}";
        
        function deploy() {
            const val = document.getElementById('query-input').value; if(!val) return;
            let url = val.trim();
            if (!url.startsWith('http')) {
                if (url.includes('.') && !url.includes(' ')) {
                    url = 'https://' + url;
                } else {
                    url = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
                }
            }
            const encoded = btoa(url).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
            document.getElementById('main-view').src = BASE + "service/" + encoded;
        }

        document.getElementById('query-input').onkeydown = e => { if(e.key === 'Enter') deploy(); };

        window.onkeydown = e => { 
            if(e.key === 'Escape') { 
                const p = document.getElementById('panic-screen'); 
                const d = document.getElementById('dock');
                const isHiding = p.style.display === 'block';
                p.style.display = isHiding ? 'none' : 'block';
                d.style.display = isHiding ? 'flex' : 'none';
            } 
        };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none;" allow="autoplay; fullscreen; gamepad; keyboard"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyNode, panicUrl) : getEmbedSnippet(proxyNode));
  }, [proxyNode, panicUrl, activeView]);

  return (
    <div className="bg-[#080808] border border-white/10 rounded-[3rem] p-12 shadow-2xl max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3 space-y-10">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-blue-500 tracking-tighter">Site <span className="text-white">Studio</span></h2>
            <p className="text-xs text-gray-600 font-bold uppercase mt-2 tracking-widest">Generate Standalone Roblox.html</p>
          </div>

          <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Roblox.html</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Embed Code</button>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-xs font-black uppercase text-gray-500 block mb-3 tracking-widest">Panic Destination URL</label>
              <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-red-500 font-mono outline-none focus:border-red-600 transition-colors" />
            </div>
            <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-[1.5rem]">
               <p className="text-xs text-blue-400 font-bold leading-relaxed uppercase tracking-widest">
                 The builder is currently locked to the <span className="text-white">{proxyNode}</span> relay engine.
               </p>
            </div>
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Code copied to clipboard!"); }}
            className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/40 hover:bg-blue-500 transition-all active:scale-95"
          >
            Copy Standalone Code
          </button>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col min-h-[500px]">
            <div className="px-10 py-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Source: Roblox.html</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
              </div>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-12 bg-transparent font-mono text-xs text-gray-500 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};