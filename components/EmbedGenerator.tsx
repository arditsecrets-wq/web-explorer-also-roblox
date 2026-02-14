import React, { useState, useEffect } from 'react';

export const EmbedGenerator: React.FC = () => {
  const [proxyUrl, setProxyUrl] = useState('https://mathematics.life/');
  const [panicUrl, setPanicUrl] = useState('https://classroom.google.com');
  const [isEditing, setIsEditing] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [activeView, setActiveView] = useState<'file' | 'snippet'>('file');

  const getTemplate = (proxy: string, panic: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Drive - Google Drive</title>
    <link rel="icon" href="https://ssl.gstatic.com/docs/doclist/images/infinite_wallpapers/invitation_24dp.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; background: #000; font-family: system-ui, -apple-system, sans-serif; }
        iframe { width: 100%; height: 100%; border: none; position: absolute; top: 0; left: 0; }
        #panic-frame { position: fixed; inset: 0; background: #fff; z-index: 9999; display: none; }
        .nav-overlay { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 1000; display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.9); padding: 6px 12px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
        input { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 50px; font-size: 12px; outline: none; width: 180px; }
        button { background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 50px; cursor: pointer; font-size: 10px; font-weight: 800; text-transform: uppercase; }
        button:hover { background: #1d4ed8; transform: scale(1.05); }
    </style>
</head>
<body>
    <div id="panic-frame"><iframe src="${panicUrl}"></iframe></div>
    <iframe id="main-view" src="${proxy}" allow="autoplay; fullscreen; keyboard; gamepad; microphone; geolocation; clipboard-read; clipboard-write"></iframe>
    
    <div class="nav-overlay">
        <input type="text" id="url-box" placeholder="Search or URL...">
        <button onclick="go()">Go</button>
        <button style="background:rgba(255,255,255,0.1)" onclick="setSrc('https://web.cloudmoonapp.com')">Cloud</button>
        <button style="background:rgba(255,255,255,0.1)" onclick="location.reload()">↺</button>
    </div>

    <script>
        const proxyBase = "${proxy}service/";
        const main = document.getElementById('main-view');

        function encodeUrl(url) {
            return btoa(url).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
        }

        function setSrc(url) {
            if(url.includes('mathematics.life')) main.src = url;
            else main.src = proxyBase + encodeUrl(url);
        }

        function go() {
            const val = document.getElementById('url-box').value;
            if(!val) return;
            let target = val;
            if(!val.startsWith('http')) {
                if(val.includes('.') && !val.includes(' ')) target = 'https://' + val;
                else target = 'https://www.google.com/search?q=' + encodeURIComponent(val);
            }
            setSrc(target);
        }

        document.getElementById('url-box').onkeydown = e => e.key === 'Enter' && go();

        window.onkeydown = function(e) {
            if (e.key === 'Escape') {
                const p = document.getElementById('panic-frame');
                p.style.display = p.style.display === 'block' ? 'none' : 'block';
            }
        };
    </script>
</body>
</html>`;

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:100vh; border:none;" allow="autoplay; fullscreen; keyboard; gamepad;"></iframe>`;

  useEffect(() => {
    if (!isEditing) {
      setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
    }
  }, [proxyUrl, panicUrl, isEditing, activeView]);

  const copyCode = () => {
    navigator.clipboard.writeText(customCode);
    alert("COPIED! This code is now fully standalone.");
  };

  return (
    <div className="bg-[#080808] rounded-[2.5rem] p-10 border border-white/5 animate-in fade-in duration-500 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h2 className="text-2xl font-black italic uppercase text-blue-500">Studio <span className="text-white">Relay</span></h2>
            <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 tracking-widest">Standalone Build Engine</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button onClick={() => setActiveView('file')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black' : 'text-gray-500'}`}>HTML File</button>
            <button onClick={() => setActiveView('snippet')} className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black' : 'text-gray-500'}`}>iFrame Snippet</button>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-500 block mb-2 tracking-widest">Proxy Node</label>
              <input type="text" value={proxyUrl} onChange={(e) => setProxyUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="pt-6">
            <button onClick={copyCode} className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
              Copy Deployment Code
            </button>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-black border border-white/10 rounded-[2rem] overflow-hidden h-full flex flex-col min-h-[400px] shadow-inner">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <span className="text-[9px] font-mono text-gray-600 uppercase font-black tracking-widest">Build Output</span>
            </div>
            <textarea 
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              readOnly={!isEditing}
              className="flex-1 w-full p-8 bg-transparent font-mono text-[10px] text-blue-400/60 outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};