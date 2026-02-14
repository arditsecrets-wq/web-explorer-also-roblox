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
    <title>Google Drive - My Files</title>
    <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; font-family: 'Inter', -apple-system, sans-serif; color: #fff; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; z-index: 1; }
        #panic-screen { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        
        /* Dashboard Styling */
        .ui-dock { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 100; background: rgba(15,15,15,0.9); padding: 15px 30px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); display: flex; gap: 20px; backdrop-filter: blur(25px); box-shadow: 0 30px 80px rgba(0,0,0,0.9); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .ui-dock:hover { border-color: #2563eb; transform: translateX(-50%) scale(1.02); }
        
        input { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 15px 25px; border-radius: 25px; outline: none; font-size: 16px; width: 350px; font-weight: 500; transition: 0.2s; }
        input:focus { border-color: #2563eb; background: rgba(255,255,255,0.1); box-shadow: 0 0 20px rgba(37,99,235,0.1); }
        
        button { background: #2563eb; color: #fff; border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        button:hover { background: #3b82f6; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(37,99,235,0.3); }
        button:active { transform: scale(0.95); }

        .info-tag { position: fixed; top: 30px; left: 30px; z-index: 10; font-size: 11px; font-weight: 900; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 4px; pointer-events: none; }
    </style>
</head>
<body>
    <div class="info-tag">SECURE RELAY ACTIVE // ESC FOR PANIC</div>
    <div id="panic-screen"><iframe src="${panicUrl}" style="width:100%;height:100%"></iframe></div>
    <iframe id="relay-view" src="${proxy}" allow="autoplay; fullscreen; gamepad; keyboard; clipboard-read; clipboard-write"></iframe>
    
    <div class="ui-dock" id="dock-container">
        <input type="text" id="proxy-input" placeholder="Enter URL or Search Query...">
        <button onclick="deploy()">Deploy Node</button>
    </div>

    <script>
        const NODE_URL = "${proxy.endsWith('/') ? proxy : proxy + '/'}";
        
        function deploy() {
            const input = document.getElementById('proxy-input').value; if(!input) return;
            let target = input.trim();
            if (!target.startsWith('http')) {
                if (target.includes('.') && !target.includes(' ')) {
                    target = 'https://' + target;
                } else {
                    target = 'https://www.google.com/search?q=' + encodeURIComponent(target);
                }
            }
            const encoded = btoa(target).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
            document.getElementById('relay-view').src = NODE_URL + "service/" + encoded;
        }

        // Trigger on Enter
        document.getElementById('proxy-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') deploy();
        });

        // Panic Switch
        window.onkeydown = e => { 
            if(e.key === 'Escape') { 
                const p = document.getElementById('panic-screen'); 
                const d = document.getElementById('dock-container');
                if (p.style.display === 'block') {
                    p.style.display = 'none';
                    d.style.display = 'flex';
                } else {
                    p.style.display = 'block';
                    d.style.display = 'none';
                }
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
            <p className="text-xs text-gray-600 font-bold uppercase mt-2 tracking-widest">Build Standalone Bypass File</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Roblox.html</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Embed Snippet</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase text-gray-500 block mb-3 tracking-widest">Panic Destination</label>
              <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-red-500 font-mono outline-none focus:border-red-600 transition-colors" />
              <p className="text-[10px] text-gray-700 mt-2 font-bold uppercase">The site shown when you press ESC</p>
            </div>
            <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
               <p className="text-xs text-blue-400 font-bold leading-relaxed uppercase tracking-widest">
                 The builder will use <span className="text-white">{proxyNode}</span> as the core engine.
               </p>
            </div>
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Build successful! Code copied to clipboard."); }}
            className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-500 transition-all active:scale-95"
          >
            Copy Generated Build
          </button>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col min-h-[450px]">
            <div className="px-8 py-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <span className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Compiler Output</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
              </div>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-10 bg-transparent font-mono text-xs text-gray-500 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};