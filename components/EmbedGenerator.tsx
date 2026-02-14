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
    <title>My Drive - Google Drive</title>
    <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; font-family: sans-serif; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; }
        #panic { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        .overlay { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 100; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px; }
        input { background: #222; color: #fff; border: 1px solid #333; padding: 8px 15px; border-radius: 20px; outline: none; font-size: 13px; width: 200px; }
        button { background: #2563eb; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-size: 11px; font-weight: bold; }
    </style>
</head>
<body>
    <div id="panic"><iframe src="${panicUrl}"></iframe></div>
    <iframe id="main" src="${proxy}" allow="autoplay; fullscreen; gamepad; clipboard-write"></iframe>
    <div class="overlay">
        <input type="text" id="url" placeholder="Search or URL...">
        <button onclick="go()">GO</button>
        <button style="background:#444" onclick="location.reload()">RELOAD</button>
    </div>
    <script>
        const proxy = "${proxy}service/";
        function go() {
            const v = document.getElementById('url').value;
            if(!v) return;
            const target = v.startsWith('http') ? v : ('https://' + v);
            document.getElementById('main').src = proxy + btoa(target).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
        }
        window.onkeydown = e => { if(e.key === 'Escape') { const p = document.getElementById('panic'); p.style.display = p.style.display === 'block' ? 'none' : 'block'; } };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:600px; border:none; border-radius:15px;" allow="autoplay; fullscreen; gamepad;"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
  }, [proxyUrl, panicUrl, activeView]);

  return (
    <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-10">
          <div>
            <h2 className="text-2xl font-black italic uppercase text-blue-500">Deploy <span className="text-white">Studio</span></h2>
            <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 tracking-widest leading-relaxed">Generated builds are 100% standalone.</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}>HTML Document</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}>iFrame Embed</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest">UV Proxy Source</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-blue-500 transition-all font-mono" />
            </div>
            {activeView === 'file' && (
              <div>
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest">Panic Redirect (ESC)</label>
                <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-blue-500 transition-all font-mono" />
              </div>
            )}
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Deployment code copied!"); }}
            className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Copy Deployment Code
          </button>
        </div>

        <div className="lg:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2rem] overflow-hidden flex flex-col min-h-[400px]">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Production Output</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </div>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-10 bg-transparent font-mono text-[11px] text-blue-500/80 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};