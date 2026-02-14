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
    <title>Google Drive</title>
    <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #000; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; }
        #panic { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        .bar { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 100; background: rgba(10,10,10,0.9); padding: 8px 15px; border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); display: flex; gap: 10px; backdrop-filter: blur(10px); }
        input { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 8px 15px; border-radius: 20px; outline: none; font-size: 12px; width: 200px; }
        button { background: #2563eb; color: #fff; border: none; padding: 8px 18px; border-radius: 20px; cursor: pointer; font-size: 10px; font-weight: 800; text-transform: uppercase; }
    </style>
</head>
<body>
    <div id="panic"><iframe src="${panicUrl}" style="width:100%;height:100%"></iframe></div>
    <iframe id="main" src="${proxy}"></iframe>
    <div class="bar">
        <input type="text" id="url" placeholder="Search...">
        <button onclick="go()">Go</button>
    </div>
    <script>
        function go() {
            const v = document.getElementById('url').value; if(!v) return;
            let t = v.startsWith('http') ? v : ('https://' + v);
            document.getElementById('main').src = "${proxy}service/" + btoa(t).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
        }
        window.onkeydown = e => { if(e.key === 'Escape') { const p = document.getElementById('panic'); p.style.display = p.style.display === 'block' ? 'none' : 'block'; } };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none;" allow="autoplay; fullscreen; gamepad"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
  }, [proxyUrl, panicUrl, activeView]);

  return (
    <div className="bg-[#080808] border border-white/5 rounded-3xl p-6 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <div>
            <h2 className="text-xl font-black italic uppercase text-blue-500">Site <span className="text-white">Build</span></h2>
            <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Standalone Deployment</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeView === 'file' ? 'bg-white text-black' : 'text-gray-500'}`}>Roblox.html</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeView === 'snippet' ? 'bg-white text-black' : 'text-gray-500'}`}>Snippet</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[8px] font-black uppercase text-gray-500 block mb-2">Relay Node</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-[10px] text-blue-400 font-mono outline-none" />
            </div>
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(customCode); alert("Copied!"); }}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg"
          >
            Copy Code
          </button>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/5 rounded-2xl overflow-hidden flex flex-col min-h-[300px]">
            <div className="px-4 py-2 border-b border-white/5 bg-white/5 text-[8px] font-black text-gray-700 uppercase">Source</div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-6 bg-transparent font-mono text-[10px] text-gray-600 outline-none resize-none leading-normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};