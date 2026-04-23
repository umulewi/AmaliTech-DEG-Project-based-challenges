(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const W={canvas_size:{w:1200,h:800}},R=[{id:"1",type:"start",text:"Welcome to Support. What is your issue?",position:{x:500,y:50},options:[{label:"Internet is down",nextId:"2"},{label:"Billing Question",nextId:"3"}]},{id:"2",type:"question",text:"Have you tried restarting your router?",position:{x:250,y:250},options:[{label:"Yes, didn't work",nextId:"4"},{label:"No, let me try",nextId:"5"}]},{id:"3",type:"question",text:"Is this for a Personal or Business account?",position:{x:750,y:250},options:[{label:"Personal",nextId:"6"},{label:"Business",nextId:"6"}]},{id:"4",type:"end",text:"Please call 555-0199 for a technician visit.",position:{x:100,y:500},options:[]},{id:"5",type:"end",text:"Restarting usually fixes it! Come back if it fails.",position:{x:400,y:500},options:[]},{id:"6",type:"end",text:"Connecting you to a Billing Agent...",position:{x:750,y:500},options:[]}],H={meta:W,nodes:R},T=()=>JSON.parse(JSON.stringify(H.nodes)),o={nodes:T(),mode:"editor",selectedNodeId:null,editingNodeId:null,previewCurrentId:null,previewHistory:[],pan:{x:0,y:0},zoom:1,dragging:null,highlightedPath:[],canvasSize:H.meta.canvas_size},k=new Set;function _(t){return k.add(t),()=>k.delete(t)}function v(){k.forEach(t=>t({...o}))}function I(t){return o.nodes.find(e=>e.id===t)}function P(t,e){const n=o.nodes.find(i=>i.id===t);n&&(n.text=e,v())}function j(t,e,n){const i=o.nodes.find(s=>s.id===t);i&&i.options[e]&&(i.options[e].label=n,v())}function F(t,e,n){const i=o.nodes.find(s=>s.id===t);i&&(i.options.push({label:e,nextId:n}),v())}function U(t,e){const n=o.nodes.find(i=>i.id===t);n&&n.options.length>e&&(n.options.splice(e,1),v())}function J(t,e,n){const i=o.nodes.find(s=>s.id===t);i&&(i.position.x=e,i.position.y=n,v())}function Q(t){o.selectedNodeId=t,o.editingNodeId=null,v()}function V(t){o.editingNodeId=t,o.selectedNodeId=t,v()}function q(){o.editingNodeId=null,v()}function D(t){if(o.mode=t,t==="preview"){const e=o.nodes.find(n=>n.type==="start");o.previewCurrentId=e?e.id:o.nodes[0].id,o.previewHistory=[o.previewCurrentId],o.highlightedPath=[o.previewCurrentId],o.selectedNodeId=null,o.editingNodeId=null}else o.highlightedPath=[];v()}function Z(t){o.previewHistory.push(t),o.previewCurrentId=t,o.highlightedPath=[...o.previewHistory],v()}function G(){const t=o.nodes.find(e=>e.type==="start");o.previewCurrentId=t?t.id:o.nodes[0].id,o.previewHistory=[o.previewCurrentId],o.highlightedPath=[o.previewCurrentId],v()}function Y(t,e){o.pan.x=t,o.pan.y=e,v()}function N(t){o.zoom=Math.max(.3,Math.min(2,t)),v()}function K(){const t=String(Date.now()),e={id:t,type:"question",text:"New Question",position:{x:200+Math.random()*400,y:200+Math.random()*200},options:[]};o.nodes.push(e),o.selectedNodeId=t,o.editingNodeId=t,v()}function M(t){o.nodes=o.nodes.filter(e=>e.id!==t),o.nodes.forEach(e=>{e.options=e.options.filter(n=>n.nextId!==t)}),o.selectedNodeId===t&&(o.selectedNodeId=null),o.editingNodeId===t&&(o.editingNodeId=null),v()}function tt(){o.nodes=T(),o.selectedNodeId=null,o.editingNodeId=null,o.pan={x:0,y:0},o.zoom=1,v()}const et=220,O={start:{label:"START",accent:"#22c55e",icon:"▶"},question:{label:"QUESTION",accent:"#7c3aed",icon:"?"},end:{label:"END",accent:"#f97316",icon:"■"}};function nt(t,e,n,i,s){const r=new Set(e.map(c=>c.id));t.querySelectorAll(".node-card").forEach(c=>{r.has(c.dataset.id)||c.remove()}),e.forEach(c=>{let l=t.querySelector(`.node-card[data-id="${c.id}"]`);const d=c.id===n,a=c.id===i,p=O[c.type]||O.question;l||(l=document.createElement("div"),l.className="node-card",l.dataset.id=c.id,t.appendChild(l),dt(l,c.id)),l.style.left=c.position.x+"px",l.style.top=c.position.y+"px",l.style.width=et+"px",l.style.setProperty("--accent",p.accent),l.classList.toggle("selected",d),l.classList.toggle("editing",a),l.classList.toggle("preview-mode",s==="preview"),l.innerHTML=it(c,p,a,s),st(l,c,a,s)})}function it(t,e,n,i){const s=i==="editor"&&t.type!=="start"?'<button class="node-delete-btn" title="Delete node">×</button>':"";return n?`
      <div class="node-header">
        <span class="node-badge" style="background:${e.accent}22;color:${e.accent};border-color:${e.accent}44">${e.icon} ${e.label}</span>
        ${s}
      </div>
      <div class="node-body editing">
        <textarea class="node-text-input" rows="3">${E(t.text)}</textarea>
        <div class="node-options-edit">
          ${t.options.map((r,c)=>`
            <div class="option-edit-row" data-opt-idx="${c}">
              <span class="option-arrow">→</span>
              <input class="option-label-input" value="${E(r.label)}" placeholder="Option label" data-opt-idx="${c}" />
              <select class="option-next-select" data-opt-idx="${c}">
                ${ot(r.nextId)}
              </select>
              <button class="option-remove-btn" data-opt-idx="${c}">−</button>
            </div>
          `).join("")}
          <button class="add-option-btn">+ Add Option</button>
        </div>
        <button class="node-done-btn">✓ Done</button>
      </div>
    `:`
    <div class="node-header">
      <span class="node-badge" style="background:${e.accent}22;color:${e.accent};border-color:${e.accent}44">${e.icon} ${e.label}</span>
      ${s}
    </div>
    <div class="node-body">
      <p class="node-text">${E(t.text)}</p>
      ${t.options.length>0?`
        <div class="node-options">
          ${t.options.map(r=>`
            <span class="node-option-chip">${E(r.label)}</span>
          `).join("")}
        </div>
      `:'<div class="node-end-indicator">Terminal Node</div>'}
    </div>
    ${i==="editor"?'<div class="node-edit-hint">Click to select • Double-click to edit</div>':""}
  `}function ot(t){return o.nodes.map(e=>`
    <option value="${e.id}" ${e.id===t?"selected":""}>${e.id}: ${rt(e.text,20)}</option>
  `).join("")}function st(t,e,n,i){var s,r,c,l;if(i!=="preview")if(n){const d=t.querySelector(".node-text-input");d==null||d.addEventListener("input",a=>P(e.id,a.target.value)),d==null||d.addEventListener("mousedown",a=>a.stopPropagation()),t.querySelectorAll(".option-label-input").forEach(a=>{a.addEventListener("input",p=>{const b=parseInt(p.target.dataset.optIdx);j(e.id,b,p.target.value)}),a.addEventListener("mousedown",p=>p.stopPropagation())}),t.querySelectorAll(".option-next-select").forEach(a=>{a.addEventListener("change",p=>{const b=parseInt(p.target.dataset.optIdx),u=I(e.id);u&&u.options[b]&&(u.options[b].nextId=p.target.value,P(e.id,u.text))}),a.addEventListener("mousedown",p=>p.stopPropagation())}),t.querySelectorAll(".option-remove-btn").forEach(a=>{a.addEventListener("click",p=>{p.stopPropagation();const b=parseInt(a.dataset.optIdx);U(e.id,b)})}),(s=t.querySelector(".add-option-btn"))==null||s.addEventListener("click",a=>{var b;a.stopPropagation();const p=((b=o.nodes.find(u=>u.id!==e.id))==null?void 0:b.id)||e.id;F(e.id,"New option",p)}),(r=t.querySelector(".node-done-btn"))==null||r.addEventListener("click",a=>{a.stopPropagation(),q()}),(c=t.querySelector(".node-delete-btn"))==null||c.addEventListener("click",a=>{a.stopPropagation(),M(e.id)})}else t.addEventListener("click",d=>{d.target.classList.contains("node-delete-btn")||Q(e.id)}),t.addEventListener("dblclick",d=>{d.stopPropagation(),V(e.id)}),(l=t.querySelector(".node-delete-btn"))==null||l.addEventListener("click",d=>{d.stopPropagation(),M(e.id)})}function dt(t,e){t.addEventListener("mousedown",n=>{if(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||n.target.tagName==="BUTTON"||o.mode==="preview")return;const i=o.nodes.find(p=>p.id===e);if(!i)return;const s=n.clientX,r=n.clientY,c=i.position.x,l=i.position.y;t.classList.add("dragging"),n.preventDefault();const d=p=>{const b=(p.clientX-s)/o.zoom,u=(p.clientY-r)/o.zoom;J(e,c+b,l+u)},a=()=>{t.classList.remove("dragging"),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",a)})}function E(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function rt(t,e){return t.length>e?t.slice(0,e)+"…":t}const X=220,at=110;function ct(t){return{x:t.position.x+X/2,y:t.position.y}}function lt(t,e,n){const i=X/(n+1);return{x:t.position.x+i*(e+1),y:t.position.y+at}}function pt(t,e,n,i){const s=i-e,r=Math.max(Math.abs(s)*.5,60);return`M ${t} ${e} C ${t} ${e+r}, ${n} ${i-r}, ${n} ${i}`}function ut(t,e,n){for(;t.firstChild;)t.removeChild(t.firstChild);const i=document.createElementNS("http://www.w3.org/2000/svg","defs"),s=S("arrow-normal","#3a3a4a"),r=S("arrow-highlight","#00e5ff"),c=S("arrow-active","#7c3aed");i.appendChild(s),i.appendChild(r),i.appendChild(c),t.appendChild(i);const l={};e.forEach(d=>l[d.id]=d),e.forEach(d=>{const a=d.options.length;d.options.forEach((p,b)=>{const u=l[p.nextId];if(!u)return;const w=lt(d,b,a),x=ct(u),y=n.includes(d.id)&&n.includes(u.id)&&n.indexOf(u.id)===n.indexOf(d.id)+1,m=document.createElementNS("http://www.w3.org/2000/svg","path");m.setAttribute("d",pt(w.x,w.y,x.x,x.y)),m.setAttribute("fill","none"),y?(m.setAttribute("stroke","#00e5ff"),m.setAttribute("stroke-width","2.5"),m.setAttribute("marker-end","url(#arrow-highlight)"),m.setAttribute("class","connector-highlighted")):(m.setAttribute("stroke","#3a3a4a"),m.setAttribute("stroke-width","1.5"),m.setAttribute("marker-end","url(#arrow-normal)"),m.setAttribute("class","connector")),m.setAttribute("stroke-dasharray",y?"none":"4 3");const C=(w.x+x.x)/2,B=(w.y+x.y)/2,f=document.createElementNS("http://www.w3.org/2000/svg","rect");f.setAttribute("x",C-40),f.setAttribute("y",B-10),f.setAttribute("width",80),f.setAttribute("height",18),f.setAttribute("rx",4),f.setAttribute("fill",y?"#00e5ff22":"#1a1a2a"),f.setAttribute("stroke",y?"#00e5ff55":"#2a2a3a"),f.setAttribute("stroke-width","1");const g=document.createElementNS("http://www.w3.org/2000/svg","text");g.setAttribute("x",C),g.setAttribute("y",B+3),g.setAttribute("text-anchor","middle"),g.setAttribute("font-size","9"),g.setAttribute("font-family","JetBrains Mono, monospace"),g.setAttribute("fill",y?"#00e5ff":"#5a5a7a"),g.textContent=vt(p.label,10),t.appendChild(m),t.appendChild(f),t.appendChild(g)})})}function vt(t,e){return t.length>e?t.slice(0,e)+"…":t}function S(t,e){const n=document.createElementNS("http://www.w3.org/2000/svg","marker");n.setAttribute("id",t),n.setAttribute("viewBox","0 0 10 10"),n.setAttribute("refX","9"),n.setAttribute("refY","5"),n.setAttribute("markerWidth","6"),n.setAttribute("markerHeight","6"),n.setAttribute("orient","auto-start-reverse");const i=document.createElementNS("http://www.w3.org/2000/svg","path");return i.setAttribute("d","M 0 0 L 10 5 L 0 10 z"),i.setAttribute("fill",e),n.appendChild(i),n}function bt(t,e){var c,l;const n=I(e.previewCurrentId);if(!n)return;const i=n.type==="end"||n.options.length===0,s=e.previewHistory.slice(0,-1).map(d=>I(d)).filter(Boolean);t.innerHTML=`
    <div class="preview-panel">
      <div class="preview-header">
        <div class="preview-title">
          <span class="preview-bot-icon">◈</span>
          <span>SupportBot Preview</span>
        </div>
        <button class="preview-exit-btn" id="preview-exit">Exit Preview</button>
      </div>

      <div class="preview-chat" id="preview-chat">
        ${s.map((d,a)=>mt(d,e,a)).join("")}
        <div class="chat-bubble bot-bubble current-bubble">
          <div class="bubble-avatar">◈</div>
          <div class="bubble-content">
            <p>${$(n.text)}</p>
          </div>
        </div>
        ${i?`
          <div class="preview-end-actions">
            <button class="preview-restart-btn" id="preview-restart">↺ Start Over</button>
          </div>
        `:`
          <div class="preview-options">
            ${n.options.map((d,a)=>`
              <button class="preview-option-btn" data-next="${d.nextId}" data-idx="${a}">
                ${$(d.label)}
              </button>
            `).join("")}
          </div>
        `}
      </div>

      <div class="preview-path-indicator">
        ${e.previewHistory.map((d,a)=>{const p=I(d);return`<span class="path-dot ${d===e.previewCurrentId?"active":""}" title="${p?p.text:d}"></span>`}).join('<span class="path-line"></span>')}
      </div>
    </div>
  `,(c=document.getElementById("preview-exit"))==null||c.addEventListener("click",()=>D("editor")),(l=document.getElementById("preview-restart"))==null||l.addEventListener("click",()=>G()),t.querySelectorAll(".preview-option-btn").forEach(d=>{d.addEventListener("click",()=>{const a=d.dataset.next;Z(a)})});const r=document.getElementById("preview-chat");r&&(r.scrollTop=r.scrollHeight)}function mt(t,e,n){const i=e.previewHistory[n+1],s=i?t.options.find(r=>r.nextId===i):null;return`
    <div class="chat-bubble bot-bubble">
      <div class="bubble-avatar">◈</div>
      <div class="bubble-content">
        <p>${$(t.text)}</p>
      </div>
    </div>
    ${s?`
      <div class="chat-bubble user-bubble">
        <div class="bubble-content user-content">
          <p>${$(s.label)}</p>
        </div>
        <div class="bubble-avatar user-avatar">U</div>
      </div>
    `:""}
  `}function $(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}let h,A,L;function ft(){document.getElementById("root").innerHTML=xt(),h=document.getElementById("canvas"),A=document.getElementById("nodes-container"),L=document.getElementById("connectors-svg"),document.getElementById("preview-container"),document.getElementById("toolbar"),ht(),wt(),_(()=>z()),z()}function z(){const t=o,e=document.getElementById("editor-view"),n=document.getElementById("preview-container");if(t.mode==="preview"){e.style.display="none",n.style.display="flex",bt(n,t);return}else e.style.display="flex",n.style.display="none";const i=`translate(${t.pan.x}px, ${t.pan.y}px) scale(${t.zoom})`;A.style.transform=i,L.style.transform=i,nt(A,t.nodes,t.selectedNodeId,t.editingNodeId,t.mode),ut(L,t.nodes,t.highlightedPath),gt(t)}function gt(t){const e=document.getElementById("btn-play");e&&(e.textContent=t.mode==="preview"?"✕ Exit":"▶ Preview");const n=document.getElementById("zoom-label");n&&(n.textContent=Math.round(t.zoom*100)+"%")}function ht(){var t,e,n,i,s,r;(t=document.getElementById("btn-play"))==null||t.addEventListener("click",()=>{D(o.mode==="editor"?"preview":"editor")}),(e=document.getElementById("btn-add-node"))==null||e.addEventListener("click",()=>K()),(n=document.getElementById("btn-reset"))==null||n.addEventListener("click",()=>{confirm("Reset flow to original? All changes will be lost.")&&tt()}),(i=document.getElementById("btn-zoom-in"))==null||i.addEventListener("click",()=>{N(o.zoom+.15)}),(s=document.getElementById("btn-zoom-out"))==null||s.addEventListener("click",()=>{N(o.zoom-.15)}),(r=document.getElementById("btn-zoom-fit"))==null||r.addEventListener("click",yt)}function yt(){if(!o.nodes.length)return;const t=80,e=h.clientWidth,n=h.clientHeight,i=Math.min(...o.nodes.map(u=>u.position.x)),s=Math.min(...o.nodes.map(u=>u.position.y)),r=Math.max(...o.nodes.map(u=>u.position.x+220)),c=Math.max(...o.nodes.map(u=>u.position.y+120)),l=r-i,d=c-s,a=Math.min((e-t*2)/l,(n-t*2)/d,1.5),p=(e-l*a)/2-i*a,b=(n-d*a)/2-s*a;N(a),Y(p,b)}function wt(){let t=!1,e,n;h.addEventListener("mousedown",i=>{(i.target===h||i.target===A||i.target===L)&&i.button===0&&(q(),t=!0,e=i.clientX,n=i.clientY,h.style.cursor="grabbing",i.preventDefault())}),document.addEventListener("mousemove",i=>{if(!t)return;const s=i.clientX-e,r=i.clientY-n;e=i.clientX,n=i.clientY,Y(o.pan.x+s,o.pan.y+r)}),document.addEventListener("mouseup",()=>{t&&(t=!1,h.style.cursor="")}),h.addEventListener("wheel",i=>{i.preventDefault();const s=i.deltaY>0?-.1:.1;N(o.zoom+s)},{passive:!1})}function xt(){return`
    <div id="app">
      <header id="toolbar">
        <div class="toolbar-brand">
          <span class="brand-mark">◈</span>
          <span class="brand-name">SupportFlow</span>
          <span class="brand-sub">Visual Builder</span>
        </div>
        <div class="toolbar-actions">
          <div class="toolbar-group">
            <button class="tb-btn" id="btn-add-node" title="Add Node">+ Node</button>
            <button class="tb-btn tb-btn-danger" id="btn-reset" title="Reset">↺ Reset</button>
          </div>
          <div class="toolbar-divider"></div>
          <div class="toolbar-group">
            <button class="tb-btn" id="btn-zoom-out" title="Zoom Out">−</button>
            <span id="zoom-label" class="zoom-label">100%</span>
            <button class="tb-btn" id="btn-zoom-in" title="Zoom In">+</button>
            <button class="tb-btn" id="btn-zoom-fit" title="Fit View">⊡</button>
          </div>
          <div class="toolbar-divider"></div>
          <button class="tb-btn tb-btn-primary" id="btn-play">▶ Preview</button>
        </div>
      </header>

      <div id="editor-view">
        <div id="canvas">
          <svg id="connectors-svg" style="position:absolute;top:0;left:0;width:4000px;height:4000px;overflow:visible;pointer-events:none;transform-origin:0 0;"></svg>
          <div id="nodes-container" style="position:absolute;top:0;left:0;transform-origin:0 0;"></div>
        </div>
        <div id="canvas-hint">Drag to pan • Scroll to zoom • Double-click node to edit</div>
      </div>

      <div id="preview-container" style="display:none;"></div>
    </div>
  `}window.addEventListener("DOMContentLoaded",ft);
