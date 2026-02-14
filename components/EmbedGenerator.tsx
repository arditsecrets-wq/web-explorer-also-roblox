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
        .nav-overlay { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 1000; display: flex; gap: 10px; align-items: center; background: rgba(0,0,0,0.85); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px); opacity: 0; transition: opacity 0.3s, transform 0.3s; transform: translateX(-50%) translateY(10px); }
        body:hover .nav-overlay { opacity: 1; transform: translateX(-50%) translateY(0); }
        input { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 50px; font-size: 13px; outline: none; width: 220px; }
        button { background: #3b82f6; color: #fff; border: none; padding: 8px 16px; border-radius: 50px; cursor: pointer; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; transition: 0.2s; }
        button.sec { background: rgba(255,255,255,0.1); }
        button:hover { transform: scale(1.05); background: #2563eb; }
        button.sec:hover { background: rgba(255,255,255,0.2); }
    </style>
</head>
<body>
    <div id="panic-frame"><iframe src="${panicUrl}"></iframe></div>
    <iframe id="main-view" src="${proxy}" allow="autoplay; fullscreen; keyboard; gamepad; microphone; geolocation; clipboard-read; clipboard-write"></iframe>
    
    <div class="nav-overlay">
        <input type="text" id="url-box" placeholder="URL or Search...">
        <button onclick="go()">Go</button>
        <button class="sec" onclick="setSrc('https://web.cloudmoonapp.com')">Cloud</button>
        <button class="sec" onclick="setSrc('https://roblox.com')">Hub</button>
        <button class="sec" onclick="location.reload()">↺</button>
    </div>

    <script>
        const proxyBase = "${proxy}service/";
        const main = document.getElementById('main-view');

        function encodeUrl(url) {
            return btoa(url).replace(/\\//g, '_').replace(/\\+/g, '-').replace(/=/g, '');
        }

        function setSrc(url) {
            if(url.includes('mathematics.life')) {
                main.src = url;
            } else {
                main.src = proxyBase + encodeUrl(url);
            }
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

  const getEmbedSnippet = (proxy: string) => `<iframe src="${proxy}" style="width:100%; height:600px; border:none; border-radius:12px;" allow="autoplay; fullscreen; keyboard; gamepad;"></iframe>`;

  useEffect(() => {
    if (!isEditing) {
      setCustomCode(activeView === 'file' ? getTemplate(proxyUrl, panicUrl) : getEmbedSnippet(proxyUrl));
    }
  }, [proxyUrl, panicUrl, isEditing, activeView]);

  const copyCode = () => {
    navigator.clipboard.writeText(customCode);
    alert("COPIED! Paste into your site or save as .html file.");
  };

  return (
    <div className="bg-[#080808] rounded-[2.5rem] p-10 border border-white/5 animate-in fade-in duration-500 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h2 className="text-2xl font-black italic uppercase text-blue-500">Studio <span className="text-white">Relay</span></h2>
            <p className="text-[10px] text-gray-600 font-bold uppercase mt-2 leading-relaxed tracking-widest">Deploy your standalone gateway to any platform.</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveView('file')} 
              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeView === 'file' ? 'bg-white text-black' : 'text-gray-500'}`}
            >
              Full HTML
            </button>
            <button 
              onClick={() => setActiveView('snippet')} 
              className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeView === 'snippet' ? 'bg-white text-black' : 'text-gray-500'}`}
            >
              Embed Snippet
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-500 block mb-2 tracking-widest">UV Proxy Node</label>
              <input 
                type="text" 
                value={proxyUrl} 
                onChange={(e) => setProxyUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-blue-500 transition-all"
              />
            </div>
            {activeView === 'file' && (
              <div>
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-2 tracking-widest">Panic Redirect</label>
                <input 
                  type="text" 
                  value={panicUrl} 
                  onChange={(e) => setPanicUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-blue-500 transition-all"
                />
              </div>
            )}
          </div>

          <div className="pt-6 space-y-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${isEditing ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
            >
              {isEditing ? 'Save Changes' : 'Edit Source'}
            </button>
            <button 
              onClick={copyCode}
              className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              Copy Code
            </button>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-black border border-white/10 rounded-[2rem] overflow-hidden h-full flex flex-col min-h-[450px] shadow-inner">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[9px] font-mono text-gray-600 uppercase font-black tracking-widest">
                {activeView === 'file' ? 'roblox_standalone.html' : 'embed_code.txt'}
              </span>
            </div>
            <textarea 
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              readOnly={!isEditing}
              className="flex-1 w-full p-8 bg-transparent font-mono text-[11px] text-blue-400/70 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};