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
    <title>Roblox - Discovery</title>
    <link rel="icon" href="https://www.roblox.com/favicon.ico">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; font-family: 'Inter', sans-serif; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; }
        #panic { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        .control-bar { 
            position: fixed; 
            bottom: 25px; 
            left: 50%; 
            transform: translateX(-50%); 
            z-index: 100; 
            background: rgba(15,15,15,0.9); 
            padding: 10px 20px; 
            border-radius: 50px; 
            border: 1px solid rgba(255,255,255,0.1); 
            display: flex; 
            gap: 12px; 
            backdrop-filter: blur(15px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        input { 
            background: rgba(255,255,255,0.05); 
            color: #fff; 
            border: 1px solid rgba(255,255,255,0.1); 
            padding: 10px 18px; 
            border-radius: 25px; 
            outline: none; 
            font-size: 13px; 
            width: 220px; 
            transition: all 0.2s;
        }
        input:focus { border-color: #2563eb; background: rgba(255,255,255,0.1); }
        button { 
            background: #2563eb; 
            color: #fff; 
            border: none; 
            padding: 10px 22px; 
            border-radius: 25px; 
            cursor: pointer; 
            font-size: 11px; 
            font-weight: 900; 
            text-transform: uppercase; 
            letter-spacing: 1px;
            transition: all 0.2s;
        }
        button:hover { background: #3b82f6; transform: translateY(-2px); }
        button.reload { background: #333; }
    </style>
</head>
<body>
    <div id="panic"><iframe src="${panicUrl}" style="width:100%;height:100%"></iframe></div>
    <iframe id="main" src="${proxy}" allow="autoplay; fullscreen; gamepad; keyboard"></iframe>
    <div class="control-bar">
        <input type="text" id="urlInput" placeholder="Enter URL or Search...">
        <button onclick="navigate()">Launch</button>
        <button class="reload" onclick="document.getElementById('main').src = document.getElementById('main').src">Refresh</button>
    </div>
    <script>
        function navigate() {
            const val = document.getElementById('urlInput').value;
            if(!val) return;
            let target = val.startsWith('http') ? val : ('https://' + val);
            const encoded = btoa(target).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
            document.getElementById('main').src = "${proxy}service/" + encoded;
        }
        document.getElementById('urlInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') navigate();
        });
        window.onkeydown = e => { 
            if(e.key === 'Escape') { 
                const p = document.getElementById('panic'); 
                p.style.display = p.style.display === 'block' ? 'none' : 'block'; 
            } 
        };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none;" allow="autoplay; fullscreen; gamepad; keyboard"></iframe>`;

  useEffect(() => {
    setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
  }, [proxyUrl, panicUrl, activeView]);

  const handleCopy = () => {
    navigator.clipboard.writeText(customCode);
    alert("Roblox Embed Code copied to clipboard!");
  };

  return (
    <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 space-y-10">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-blue-500 tracking-tighter">Embed <span className="text-white">Studio</span></h2>
            <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 tracking-[0.2em] leading-relaxed">Create standalone pages for Roblox & Web discovery.</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Roblox.html</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>Iframe Code</button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest">Relay Node</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-blue-500 transition-all font-mono text-blue-400" />
            </div>
            {activeView === 'file' && (
              <div>
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-3 tracking-widest">Panic Redirect (ESC Key)</label>
                <input type="text" value={panicUrl} onChange={(e) => setPanicUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-red-500 transition-all font-mono text-red-400" />
              </div>
            )}
          </div>

          <button 
            onClick={handleCopy}
            className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl active:scale-95"
          >
            Copy {activeView === 'file' ? 'Roblox.html' : 'Embed Snippet'}
          </button>
        </div>

        <div className="lg:w-2/3 flex flex-col">
          <div className="flex-1 bg-black border border-white/10 rounded-[2rem] overflow-hidden flex flex-col min-h-[450px] shadow-inner">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Source Output</span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            </div>
            <textarea 
              value={customCode}
              readOnly
              className="flex-1 w-full p-8 bg-transparent font-mono text-[11px] text-gray-500 outline-none resize-none leading-relaxed"
            />
          </div>
          <p className="mt-4 text-[9px] text-gray-700 font-bold uppercase text-center tracking-widest italic">
            Paste this code into any HTML block or save as a .html file
          </p>
        </div>
      </div>
    </div>
  );
};