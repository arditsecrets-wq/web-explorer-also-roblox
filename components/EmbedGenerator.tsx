import React, { useState, useEffect } from 'react';

export const EmbedGenerator: React.FC = () => {
  const [proxyUrl, setProxyUrl] = useState('https://mathematics.life/');
  const [panicUrl, setPanicUrl] = useState('https://classroom.google.com');
  const [activeView, setActiveView] = useState<'file' | 'snippet'>('file');
  const [customCode, setCustomCode] = useState('');

  const getTemplate = (proxy: string, panic: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Google Drive - My Files</title>
    <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; font-family: system-ui, -apple-system, sans-serif; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0; }
        #panic-layer { position: fixed; inset: 0; background: #fff; z-index: 10000; display: none; }
        #panic-layer iframe { width: 100%; height: 100%; border: none; }
        .nav-dock { 
            position: fixed; 
            bottom: 30px; 
            left: 50%; 
            transform: translateX(-50%); 
            z-index: 999; 
            background: rgba(10,10,10,0.85); 
            padding: 12px 24px; 
            border-radius: 60px; 
            border: 1px solid rgba(255,255,255,0.1); 
            display: flex; 
            gap: 15px; 
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            transition: opacity 0.3s, transform 0.3s;
        }
        .nav-dock:hover { opacity: 1; transform: translateX(-50%) translateY(-5px); }
        input { 
            background: rgba(255,255,255,0.08); 
            color: #fff; 
            border: 1px solid rgba(255,255,255,0.1); 
            padding: 12px 20px; 
            border-radius: 30px; 
            outline: none; 
            font-size: 14px; 
            width: 250px; 
        }
        button { 
            background: #2563eb; 
            color: #fff; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 30px; 
            cursor: pointer; 
            font-size: 12px; 
            font-weight: 800; 
            text-transform: uppercase; 
            letter-spacing: 1px;
        }
        button:hover { background: #3b82f6; }
        .hint { position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.2); font-size: 10px; font-weight: bold; text-transform: uppercase; pointer-events: none; }
    </style>
</head>
<body>
    <div id="panic-layer"><iframe src="${panicUrl}"></iframe></div>
    <iframe id="app-frame" src="${proxy}" allow="autoplay; fullscreen; gamepad; keyboard"></iframe>
    
    <div class="nav-dock">
        <input type="text" id="target-url" placeholder="Search or URL...">
        <button onclick="launch()">Launch</button>
        <button style="background:#333" onclick="location.reload()">Reload</button>
    </div>
    
    <div class="hint">Press ESC for Panic Mode</div>

    <script>
        function launch() {
            const val = document.getElementById('target-url').value;
            if(!val) return;
            let target = val.startsWith('http') ? val : ('https://' + val);
            const encoded = btoa(target).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
            document.getElementById('app-frame').src = "${proxy}service/" + encoded;
        }
        
        document.getElementById('target-url').addEventListener('keypress', e => {
            if(e.key === 'Enter') launch();
        });

        window.addEventListener('keydown', e => {
            if(e.key === 'Escape') {
                const p = document.getElementById('panic-layer');
                p.style.display = p.style.display === 'block' ? 'none' : 'block';
            }
        });
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none;" allow="autoplay; fullscreen; gamepad; keyboard"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
  }, [proxyUrl, panicUrl, activeView]);

  return (
    <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-10">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-blue-500 tracking-tighter">Standalone <span className="text-white">Build</span></h2>
            <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 tracking-[0.2em] leading-relaxed">Generate code to run this on Wix, Google Sites, or as a local file.</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Roblox.html</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Embed Code</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest">Active Relay</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-blue-500 transition-all font-mono text-blue-400" />
            </div>
            {activeView === 'file' && (
              <div>
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest">Panic Redirect</label>
                <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-red-500 transition-all font-mono text-red-400" />
              </div>
            )}
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Build copied to clipboard!"); }}
            className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all"
          >
            Copy Standalone Build
          </button>
        </div>

        <div className="lg:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2rem] overflow-hidden flex flex-col min-h-[450px]">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Source Code</span>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-8 bg-transparent font-mono text-[11px] text-gray-500 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};