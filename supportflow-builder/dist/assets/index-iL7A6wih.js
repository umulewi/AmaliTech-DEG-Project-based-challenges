(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={meta:{theme:`dark`,canvas_size:{w:1200,h:800}},nodes:[{id:`1`,type:`start`,text:`Welcome to Support. What is your issue?`,position:{x:500,y:50},options:[{label:`Internet is down`,nextId:`2`},{label:`Billing Question`,nextId:`3`}]},{id:`2`,type:`question`,text:`Have you tried restarting your router?`,position:{x:250,y:250},options:[{label:`Yes, didn't work`,nextId:`4`},{label:`No, let me try`,nextId:`5`}]},{id:`3`,type:`question`,text:`Is this for a Personal or Business account?`,position:{x:750,y:250},options:[{label:`Personal`,nextId:`6`},{label:`Business`,nextId:`6`}]},{id:`4`,type:`end`,text:`Please call 555-0199 for a technician visit.`,position:{x:100,y:500},options:[]},{id:`5`,type:`end`,text:`Restarting usually fixes it! Come back if it fails.`,position:{x:400,y:500},options:[]},{id:`6`,type:`end`,text:`Connecting you to a Billing Agent...`,position:{x:750,y:500},options:[]}]},t=()=>JSON.parse(JSON.stringify(e.nodes)),n={nodes:t(),mode:`editor`,selectedNodeId:null,editingNodeId:null,previewCurrentId:null,previewHistory:[],pan:{x:0,y:0},zoom:1,dragging:null,highlightedPath:[],canvasSize:e.meta.canvas_size},r=new Set;function i(e){return r.add(e),()=>r.delete(e)}function a(){r.forEach(e=>e({...n}))}function o(e){return n.nodes.find(t=>t.id===e)}function s(e,t){let r=n.nodes.find(t=>t.id===e);r&&(r.text=t,a())}function c(e,t,r){let i=n.nodes.find(t=>t.id===e);i&&i.options[t]&&(i.options[t].label=r,a())}function l(e,t,r){let i=n.nodes.find(t=>t.id===e);i&&(i.options.push({label:t,nextId:r}),a())}function u(e,t){let r=n.nodes.find(t=>t.id===e);r&&r.options.length>t&&(r.options.splice(t,1),a())}function d(e,t,r){let i=n.nodes.find(t=>t.id===e);i&&(i.position.x=t,i.position.y=r,a())}function f(e){n.selectedNodeId=e,n.editingNodeId=null,a()}function p(e){n.editingNodeId=e,n.selectedNodeId=e,a()}function m(){n.editingNodeId=null,a()}function h(e){if(n.mode=e,e===`preview`){let e=n.nodes.find(e=>e.type===`start`);n.previewCurrentId=e?e.id:n.nodes[0].id,n.previewHistory=[n.previewCurrentId],n.highlightedPath=[n.previewCurrentId],n.selectedNodeId=null,n.editingNodeId=null}else n.highlightedPath=[];a()}function g(e){n.previewHistory.push(e),n.previewCurrentId=e,n.highlightedPath=[...n.previewHistory],a()}function _(){let e=n.nodes.find(e=>e.type===`start`);n.previewCurrentId=e?e.id:n.nodes[0].id,n.previewHistory=[n.previewCurrentId],n.highlightedPath=[n.previewCurrentId],a()}function v(e,t){n.pan.x=e,n.pan.y=t,a()}function y(e){n.zoom=Math.max(.3,Math.min(2,e)),a()}function b(){let e=String(Date.now()),t={id:e,type:`question`,text:`New Question`,position:{x:200+Math.random()*400,y:200+Math.random()*200},options:[]};n.nodes.push(t),n.selectedNodeId=e,n.editingNodeId=e,a()}function x(e){n.nodes=n.nodes.filter(t=>t.id!==e),n.nodes.forEach(t=>{t.options=t.options.filter(t=>t.nextId!==e)}),n.selectedNodeId===e&&(n.selectedNodeId=null),n.editingNodeId===e&&(n.editingNodeId=null),a()}function S(){n.nodes=t(),n.selectedNodeId=null,n.editingNodeId=null,n.pan={x:0,y:0},n.zoom=1,a()}var C=220,w={start:{label:`START`,accent:`#22c55e`,icon:`▶`},question:{label:`QUESTION`,accent:`#7c3aed`,icon:`?`},end:{label:`END`,accent:`#f97316`,icon:`■`}};function T(e,t,n,r,i){let a=new Set(t.map(e=>e.id));e.querySelectorAll(`.node-card`).forEach(e=>{a.has(e.dataset.id)||e.remove()}),t.forEach(t=>{let a=e.querySelector(`.node-card[data-id="${t.id}"]`),o=t.id===n,s=t.id===r,c=w[t.type]||w.question;a||(a=document.createElement(`div`),a.className=`node-card`,a.dataset.id=t.id,e.appendChild(a),k(a,t.id)),a.style.left=t.position.x+`px`,a.style.top=t.position.y+`px`,a.style.width=C+`px`,a.style.setProperty(`--accent`,c.accent),a.classList.toggle(`selected`,o),a.classList.toggle(`editing`,s),a.classList.toggle(`preview-mode`,i===`preview`),a.innerHTML=E(t,c,s,i),O(a,t,s,i)})}function E(e,t,n,r){let i=r===`editor`&&e.type!==`start`?`<button class="node-delete-btn" title="Delete node">×</button>`:``;return n?`
      <div class="node-header">
        <span class="node-badge" style="background:${t.accent}22;color:${t.accent};border-color:${t.accent}44">${t.icon} ${t.label}</span>
        ${i}
      </div>
      <div class="node-body editing">
        <textarea class="node-text-input" rows="3">${A(e.text)}</textarea>
        <div class="node-options-edit">
          ${e.options.map((e,t)=>`
            <div class="option-edit-row" data-opt-idx="${t}">
              <span class="option-arrow">→</span>
              <input class="option-label-input" value="${A(e.label)}" placeholder="Option label" data-opt-idx="${t}" />
              <select class="option-next-select" data-opt-idx="${t}">
                ${D(e.nextId)}
              </select>
              <button class="option-remove-btn" data-opt-idx="${t}">−</button>
            </div>
          `).join(``)}
          <button class="add-option-btn">+ Add Option</button>
        </div>
        <button class="node-done-btn">✓ Done</button>
      </div>
    `:`
    <div class="node-header">
      <span class="node-badge" style="background:${t.accent}22;color:${t.accent};border-color:${t.accent}44">${t.icon} ${t.label}</span>
      ${i}
    </div>
    <div class="node-body">
      <p class="node-text">${A(e.text)}</p>
      ${e.options.length>0?`
        <div class="node-options">
          ${e.options.map(e=>`
            <span class="node-option-chip">${A(e.label)}</span>
          `).join(``)}
        </div>
      `:`<div class="node-end-indicator">Terminal Node</div>`}
    </div>
    ${r===`editor`?`<div class="node-edit-hint">Click to select • Double-click to edit</div>`:``}
  `}function D(e){return n.nodes.map(t=>`
    <option value="${t.id}" ${t.id===e?`selected`:``}>${t.id}: ${j(t.text,20)}</option>
  `).join(``)}function O(e,t,r,i){if(i!==`preview`)if(r){let r=e.querySelector(`.node-text-input`);r?.addEventListener(`input`,e=>s(t.id,e.target.value)),r?.addEventListener(`mousedown`,e=>e.stopPropagation()),e.querySelectorAll(`.option-label-input`).forEach(e=>{e.addEventListener(`input`,e=>{let n=parseInt(e.target.dataset.optIdx);c(t.id,n,e.target.value)}),e.addEventListener(`mousedown`,e=>e.stopPropagation())}),e.querySelectorAll(`.option-next-select`).forEach(e=>{e.addEventListener(`change`,e=>{let n=parseInt(e.target.dataset.optIdx),r=o(t.id);r&&r.options[n]&&(r.options[n].nextId=e.target.value,s(t.id,r.text))}),e.addEventListener(`mousedown`,e=>e.stopPropagation())}),e.querySelectorAll(`.option-remove-btn`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(e.dataset.optIdx);u(t.id,r)})}),e.querySelector(`.add-option-btn`)?.addEventListener(`click`,e=>{e.stopPropagation();let r=n.nodes.find(e=>e.id!==t.id)?.id||t.id;l(t.id,`New option`,r)}),e.querySelector(`.node-done-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),m()}),e.querySelector(`.node-delete-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),x(t.id)})}else e.addEventListener(`click`,e=>{e.target.classList.contains(`node-delete-btn`)||f(t.id)}),e.addEventListener(`dblclick`,e=>{e.stopPropagation(),p(t.id)}),e.querySelector(`.node-delete-btn`)?.addEventListener(`click`,e=>{e.stopPropagation(),x(t.id)})}function k(e,t){e.addEventListener(`mousedown`,r=>{if(r.target.tagName===`INPUT`||r.target.tagName===`TEXTAREA`||r.target.tagName===`SELECT`||r.target.tagName===`BUTTON`||n.mode===`preview`)return;let i=n.nodes.find(e=>e.id===t);if(!i)return;let a=r.clientX,o=r.clientY,s=i.position.x,c=i.position.y;e.classList.add(`dragging`),r.preventDefault();let l=e=>{let r=(e.clientX-a)/n.zoom,i=(e.clientY-o)/n.zoom;d(t,s+r,c+i)},u=()=>{e.classList.remove(`dragging`),document.removeEventListener(`mousemove`,l),document.removeEventListener(`mouseup`,u)};document.addEventListener(`mousemove`,l),document.addEventListener(`mouseup`,u)})}function A(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function j(e,t){return e.length>t?e.slice(0,t)+`…`:e}var M=220,N=110;function P(e){return{x:e.position.x+M/2,y:e.position.y}}function F(e,t,n){let r=M/(n+1);return{x:e.position.x+r*(t+1),y:e.position.y+N}}function I(e,t,n,r){let i=r-t,a=Math.max(Math.abs(i)*.5,60);return`M ${e} ${t} C ${e} ${t+a}, ${n} ${r-a}, ${n} ${r}`}function L(e,t,n){for(;e.firstChild;)e.removeChild(e.firstChild);let r=document.createElementNS(`http://www.w3.org/2000/svg`,`defs`),i=z(`arrow-normal`,`#3a3a4a`),a=z(`arrow-highlight`,`#00e5ff`),o=z(`arrow-active`,`#7c3aed`);r.appendChild(i),r.appendChild(a),r.appendChild(o),e.appendChild(r);let s={};t.forEach(e=>s[e.id]=e),t.forEach(t=>{let r=t.options.length;t.options.forEach((i,a)=>{let o=s[i.nextId];if(!o)return;let c=F(t,a,r),l=P(o),u=n.includes(t.id)&&n.includes(o.id)&&n.indexOf(o.id)===n.indexOf(t.id)+1,d=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);d.setAttribute(`d`,I(c.x,c.y,l.x,l.y)),d.setAttribute(`fill`,`none`),u?(d.setAttribute(`stroke`,`#00e5ff`),d.setAttribute(`stroke-width`,`2.5`),d.setAttribute(`marker-end`,`url(#arrow-highlight)`),d.setAttribute(`class`,`connector-highlighted`)):(d.setAttribute(`stroke`,`#3a3a4a`),d.setAttribute(`stroke-width`,`1.5`),d.setAttribute(`marker-end`,`url(#arrow-normal)`),d.setAttribute(`class`,`connector`)),d.setAttribute(`stroke-dasharray`,u?`none`:`4 3`);let f=(c.x+l.x)/2,p=(c.y+l.y)/2,m=document.createElementNS(`http://www.w3.org/2000/svg`,`rect`);m.setAttribute(`x`,f-40),m.setAttribute(`y`,p-10),m.setAttribute(`width`,80),m.setAttribute(`height`,18),m.setAttribute(`rx`,4),m.setAttribute(`fill`,u?`#00e5ff22`:`#1a1a2a`),m.setAttribute(`stroke`,u?`#00e5ff55`:`#2a2a3a`),m.setAttribute(`stroke-width`,`1`);let h=document.createElementNS(`http://www.w3.org/2000/svg`,`text`);h.setAttribute(`x`,f),h.setAttribute(`y`,p+3),h.setAttribute(`text-anchor`,`middle`),h.setAttribute(`font-size`,`9`),h.setAttribute(`font-family`,`JetBrains Mono, monospace`),h.setAttribute(`fill`,u?`#00e5ff`:`#5a5a7a`),h.textContent=R(i.label,10),e.appendChild(d),e.appendChild(m),e.appendChild(h)})})}function R(e,t){return e.length>t?e.slice(0,t)+`…`:e}function z(e,t){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`marker`);n.setAttribute(`id`,e),n.setAttribute(`viewBox`,`0 0 10 10`),n.setAttribute(`refX`,`9`),n.setAttribute(`refY`,`5`),n.setAttribute(`markerWidth`,`6`),n.setAttribute(`markerHeight`,`6`),n.setAttribute(`orient`,`auto-start-reverse`);let r=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);return r.setAttribute(`d`,`M 0 0 L 10 5 L 0 10 z`),r.setAttribute(`fill`,t),n.appendChild(r),n}function B(e,t){let n=o(t.previewCurrentId);if(!n)return;let r=n.type===`end`||n.options.length===0;e.innerHTML=`
    <div class="preview-panel">
      <div class="preview-header">
        <div class="preview-title">
          <span class="preview-bot-icon">◈</span>
          <span>SupportBot Preview</span>
        </div>
        <button class="preview-exit-btn" id="preview-exit">Exit Preview</button>
      </div>

      <div class="preview-chat" id="preview-chat">
        ${t.previewHistory.slice(0,-1).map(e=>o(e)).filter(Boolean).map((e,n)=>V(e,t,n)).join(``)}
        <div class="chat-bubble bot-bubble current-bubble">
          <div class="bubble-avatar">◈</div>
          <div class="bubble-content">
            <p>${H(n.text)}</p>
          </div>
        </div>
        ${r?`
          <div class="preview-end-actions">
            <button class="preview-restart-btn" id="preview-restart">↺ Start Over</button>
          </div>
        `:`
          <div class="preview-options">
            ${n.options.map((e,t)=>`
              <button class="preview-option-btn" data-next="${e.nextId}" data-idx="${t}">
                ${H(e.label)}
              </button>
            `).join(``)}
          </div>
        `}
      </div>

      <div class="preview-path-indicator">
        ${t.previewHistory.map((e,n)=>{let r=o(e);return`<span class="path-dot ${e===t.previewCurrentId?`active`:``}" title="${r?r.text:e}"></span>`}).join(`<span class="path-line"></span>`)}
      </div>
    </div>
  `,document.getElementById(`preview-exit`)?.addEventListener(`click`,()=>h(`editor`)),document.getElementById(`preview-restart`)?.addEventListener(`click`,()=>_()),e.querySelectorAll(`.preview-option-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.next;g(t)})});let i=document.getElementById(`preview-chat`);i&&(i.scrollTop=i.scrollHeight)}function V(e,t,n){let r=t.previewHistory[n+1],i=r?e.options.find(e=>e.nextId===r):null;return`
    <div class="chat-bubble bot-bubble">
      <div class="bubble-avatar">◈</div>
      <div class="bubble-content">
        <p>${H(e.text)}</p>
      </div>
    </div>
    ${i?`
      <div class="chat-bubble user-bubble">
        <div class="bubble-content user-content">
          <p>${H(i.label)}</p>
        </div>
        <div class="bubble-avatar user-avatar">U</div>
      </div>
    `:``}
  `}function H(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var U,W,G;function K(){document.getElementById(`root`).innerHTML=Q(),U=document.getElementById(`canvas`),W=document.getElementById(`nodes-container`),G=document.getElementById(`connectors-svg`),document.getElementById(`preview-container`),document.getElementById(`toolbar`),Y(),Z(),i(()=>q()),q()}function q(){let e=n,t=document.getElementById(`editor-view`),r=document.getElementById(`preview-container`);if(e.mode===`preview`){t.style.display=`none`,r.style.display=`flex`,B(r,e);return}else t.style.display=`flex`,r.style.display=`none`;let i=`translate(${e.pan.x}px, ${e.pan.y}px) scale(${e.zoom})`;W.style.transform=i,G.style.transform=i,T(W,e.nodes,e.selectedNodeId,e.editingNodeId,e.mode),L(G,e.nodes,e.highlightedPath),J(e)}function J(e){let t=document.getElementById(`btn-play`);t&&(t.textContent=e.mode===`preview`?`✕ Exit`:`▶ Preview`);let n=document.getElementById(`zoom-label`);n&&(n.textContent=Math.round(e.zoom*100)+`%`)}function Y(){document.getElementById(`btn-play`)?.addEventListener(`click`,()=>{h(n.mode===`editor`?`preview`:`editor`)}),document.getElementById(`btn-add-node`)?.addEventListener(`click`,()=>b()),document.getElementById(`btn-reset`)?.addEventListener(`click`,()=>{confirm(`Reset flow to original? All changes will be lost.`)&&S()}),document.getElementById(`btn-zoom-in`)?.addEventListener(`click`,()=>{y(n.zoom+.15)}),document.getElementById(`btn-zoom-out`)?.addEventListener(`click`,()=>{y(n.zoom-.15)}),document.getElementById(`btn-zoom-fit`)?.addEventListener(`click`,X)}function X(){if(!n.nodes.length)return;let e=U.clientWidth,t=U.clientHeight,r=Math.min(...n.nodes.map(e=>e.position.x)),i=Math.min(...n.nodes.map(e=>e.position.y)),a=Math.max(...n.nodes.map(e=>e.position.x+220)),o=Math.max(...n.nodes.map(e=>e.position.y+120)),s=a-r,c=o-i,l=Math.min((e-160)/s,(t-160)/c,1.5),u=(e-s*l)/2-r*l,d=(t-c*l)/2-i*l;y(l),v(u,d)}function Z(){let e=!1,t,r;U.addEventListener(`mousedown`,n=>{(n.target===U||n.target===W||n.target===G)&&n.button===0&&(m(),e=!0,t=n.clientX,r=n.clientY,U.style.cursor=`grabbing`,n.preventDefault())}),document.addEventListener(`mousemove`,i=>{if(!e)return;let a=i.clientX-t,o=i.clientY-r;t=i.clientX,r=i.clientY,v(n.pan.x+a,n.pan.y+o)}),document.addEventListener(`mouseup`,()=>{e&&(e=!1,U.style.cursor=``)}),U.addEventListener(`wheel`,e=>{e.preventDefault();let t=e.deltaY>0?-.1:.1;y(n.zoom+t)},{passive:!1})}function Q(){return`
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
  `}window.addEventListener(`DOMContentLoaded`,K);