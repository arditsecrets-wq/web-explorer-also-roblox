import React, { useState, useEffect } from 'react';

export const EmbedGenerator: React.FC = () => {
  const [proxyUrl, setProxyUrl] = useState('https://mathematics.life/');
  const [panicUrl, setPanicUrl] = useState('https://classroom.google.com');
  const [activeView, setActiveView] = useState<'file' | 'snippet'>('file');
  const [customCode, setCustomCode] = useState('');

  const getTemplate = (proxy: string, panic: string) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Drive - Google Drive</title>
    <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; font-family: sans-serif; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; }
        #panic { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        .bar { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 100; background: rgba(0,0,0,0.9); padding: 8px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px; backdrop-filter: blur(10px); }
        input { background: #111; color: #fff; border: 1px solid #222; padding: 8px 16px; border-radius: 20px; outline: none; font-size: 12px; width: 180px; }
        button { background: #2563eb; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 10px; font-weight: 900; text-transform: uppercase; }
        button:hover { background: #3b82f6; }
    </style>
</head>
<body>
    <div id="panic"><iframe src="${panicUrl}" style="width:100%;height:100%"></iframe></div>
    <iframe id="main" src="${proxy}" allow="autoplay; fullscreen; gamepad; clipboard-write"></iframe>
    <div class="bar">
        <input type="text" id="url" placeholder="Enter URL or Search...">
        <button onclick="go()">Launch</button>
        <button style="background:#333" onclick="location.reload()">↺</button>
    </div>
    <script>
        const proxyBase = "${proxy}service/";
        function go() {
            const val = document.getElementById('url').value;
            if(!val) return;
            let target = val.startsWith('http') ? val : ('https://' + val);
            document.getElementById('main').src = proxyBase + btoa(target).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
        }
        window.onkeydown = e => { if(e.key === 'Escape') { const p = document.getElementById('panic'); p.style.display = p.style.display === 'block' ? 'none' : 'block'; } };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none; border-radius:0px;" allow="autoplay; fullscreen; gamepad; clipboard-write"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
  }, [proxyUrl, panicUrl, activeView]);

  return (
    <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-10">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-blue-500 tracking-tighter">Site <span className="text-white">Studio</span></h2>
            <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 tracking-[0.2em] leading-relaxed">Generate 100% standalone code for your own website.</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Full Page</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>iFrame Snippet</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest opacity-50">Node Gateway</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xs outline-none focus:border-blue-500 transition-all font-mono text-blue-400" />
            </div>
            {activeView === 'file' && (
              <div>
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest opacity-50">Panic Key (ESC)</label>
                <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xs outline-none focus:border-blue-500 transition-all font-mono text-red-400" />
              </div>
            )}
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Deployment code copied to clipboard!"); }}
            className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 active:scale-95 transition-all shadow-[0_0_50px_rgba(37,99,235,0.2)]"
          >
            Copy Embed Code
          </button>
        </div>

        <div className="lg:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2rem] overflow-hidden flex flex-col min-h-[450px] shadow-inner">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Code Preview</span>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
              </div>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-10 bg-transparent font-mono text-[11px] text-gray-400 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};