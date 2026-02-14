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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; font-family: system-ui, -apple-system, sans-serif; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0; }
        #panic-screen { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        .control-panel { position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); z-index: 1000; display: flex; gap: 10px; align-items: center; background: rgba(10,10,10,0.9); padding: 8px 16px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(15px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        input { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 50px; font-size: 13px; outline: none; width: 220px; transition: all 0.2s; }
        input:focus { border-color: #3b82f6; background: rgba(255,255,255,0.1); }
        button { background: #2563eb; color: #fff; border: none; padding: 8px 20px; border-radius: 50px; cursor: pointer; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.2s; }
        button:hover { background: #3b82f6; transform: translateY(-1px); }
        button.secondary { background: rgba(255,255,255,0.1); }
    </style>
</head>
<body>
    <div id="panic-screen"><iframe src="${panicUrl}" style="width:100%;height:100%;border:none;"></iframe></div>
    <iframe id="viewport" src="${proxy}" allow="autoplay; fullscreen; keyboard; gamepad; microphone; geolocation; clipboard-read; clipboard-write"></iframe>
    
    <div class="control-panel">
        <input type="text" id="nav-input" placeholder="Search Google or enter URL...">
        <button onclick="navigate()">Launch</button>
        <button class="secondary" onclick="location.reload()">↺</button>
    </div>

    <script>
        const proxyBase = "${proxy}service/";
        const view = document.getElementById('viewport');

        function encode(url) {
            return btoa(url).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
        }

        function navigate() {
            const input = document.getElementById('nav-input').value;
            if(!input) return;
            let url = input;
            if(!input.startsWith('http')) {
                if(input.includes('.') && !input.includes(' ')) url = 'https://' + input;
                else url = 'https://www.google.com/search?q=' + encodeURIComponent(input);
            }
            view.src = proxyBase + encode(url);
        }

        document.getElementById('nav-input').onkeydown = e => e.key === 'Enter' && navigate();

        window.onkeydown = e => {
            if (e.key === 'Escape') {
                const p = document.getElementById('panic-screen');
                p.style.display = p.style.display === 'block' ? 'none' : 'block';
            }
        };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none;" allow="autoplay; fullscreen; keyboard; gamepad; clipboard-read; clipboard-write"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
  }, [proxyUrl, panicUrl, activeView]);

  return (
    <div className="bg-[#080808] border border-white/5 rounded-[3rem] p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black italic uppercase text-blue-500 tracking-tighter">Site <span className="text-white">Studio</span></h2>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-relaxed">Generated code is 100% serverless and standalone.</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-gray-300'}`}>Full Page Code</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-gray-300'}`}>Embed Snippet</button>
          </div>

          <div className="space-y-8">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-gray-600 block mb-4 tracking-widest group-hover:text-blue-500 transition-colors">Relay Gateway Node</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-blue-500 transition-all font-mono text-blue-400" />
            </div>
            {activeView === 'file' && (
              <div className="group">
                <label className="text-[10px] font-black uppercase text-gray-600 block mb-4 tracking-widest group-hover:text-red-500 transition-colors">Emergency Redirect (ESC Key)</label>
                <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-red-500 transition-all font-mono text-red-400" />
              </div>
            )}
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Deployment package copied to clipboard!"); }}
            className="w-full py-7 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(37,99,235,0.3)]"
          >
            Copy Standalone Build
          </button>
        </div>

        <div className="lg:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col min-h-[500px] shadow-2xl">
            <div className="px-8 py-5 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Ready for Production</span>
              </div>
              <span className="text-[9px] font-mono text-gray-800">BUILD_V2.5.0</span>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-12 bg-transparent font-mono text-[12px] text-blue-500/60 outline-none resize-none leading-relaxed overflow-y-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};