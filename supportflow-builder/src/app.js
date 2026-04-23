import { state, subscribe, setMode, addNode, resetFlow, setPan, setZoom, stopEditing } from './state.js';
import { renderNodes } from './nodes.js';
import { renderConnectors } from './connectors.js';
import { renderPreview } from './preview.js';

let canvasEl, nodesContainer, svgEl, previewContainer, toolbar;

export function init() {
  document.getElementById('root').innerHTML = buildAppShell();
  canvasEl = document.getElementById('canvas');
  nodesContainer = document.getElementById('nodes-container');
  svgEl = document.getElementById('connectors-svg');
  previewContainer = document.getElementById('preview-container');
  toolbar = document.getElementById('toolbar');

  bindToolbarEvents();
  bindCanvasEvents();

  subscribe(() => renderAll());
  renderAll();
}

export function renderAll() {
  const s = state;

  // Toggle views
  const editorEl = document.getElementById('editor-view');
  const previewEl = document.getElementById('preview-container');
  if (s.mode === 'preview') {
    editorEl.style.display = 'none';
    previewEl.style.display = 'flex';
    renderPreview(previewEl, s);
    return;
  } else {
    editorEl.style.display = 'flex';
    previewEl.style.display = 'none';
  }

  // Update canvas transform
  const transform = `translate(${s.pan.x}px, ${s.pan.y}px) scale(${s.zoom})`;
  nodesContainer.style.transform = transform;
  svgEl.style.transform = transform;

  // Render nodes
  renderNodes(nodesContainer, s.nodes, s.selectedNodeId, s.editingNodeId, s.mode);

  // Render connectors
  renderConnectors(svgEl, s.nodes, s.highlightedPath);

  // Update toolbar state
  updateToolbar(s);
}

function updateToolbar(s) {
  const playBtn = document.getElementById('btn-play');
  if (playBtn) {
    playBtn.textContent = s.mode === 'preview' ? '✕ Exit' : '▶ Preview';
  }
  const zoomLabel = document.getElementById('zoom-label');
  if (zoomLabel) {
    zoomLabel.textContent = Math.round(s.zoom * 100) + '%';
  }
}

function bindToolbarEvents() {
  document.getElementById('btn-play')?.addEventListener('click', () => {
    setMode(state.mode === 'editor' ? 'preview' : 'editor');
  });

  document.getElementById('btn-add-node')?.addEventListener('click', () => addNode());

  document.getElementById('btn-reset')?.addEventListener('click', () => {
    if (confirm('Reset flow to original? All changes will be lost.')) resetFlow();
  });

  document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
    setZoom(state.zoom + 0.15);
  });

  document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
    setZoom(state.zoom - 0.15);
  });

  document.getElementById('btn-zoom-fit')?.addEventListener('click', fitView);
}

function fitView() {
  if (!state.nodes.length) return;
  const padding = 80;
  const containerW = canvasEl.clientWidth;
  const containerH = canvasEl.clientHeight;

  const minX = Math.min(...state.nodes.map(n => n.position.x));
  const minY = Math.min(...state.nodes.map(n => n.position.y));
  const maxX = Math.max(...state.nodes.map(n => n.position.x + 220));
  const maxY = Math.max(...state.nodes.map(n => n.position.y + 120));

  const contentW = maxX - minX;
  const contentH = maxY - minY;
  const zoom = Math.min((containerW - padding * 2) / contentW, (containerH - padding * 2) / contentH, 1.5);
  const panX = (containerW - contentW * zoom) / 2 - minX * zoom;
  const panY = (containerH - contentH * zoom) / 2 - minY * zoom;

  setZoom(zoom);
  setPan(panX, panY);
}

function bindCanvasEvents() {
  let isPanning = false;
  let lastMX, lastMY;

  canvasEl.addEventListener('mousedown', e => {
    if (e.target === canvasEl || e.target === nodesContainer || e.target === svgEl) {
      if (e.button === 0) {
        stopEditing();
        isPanning = true;
        lastMX = e.clientX;
        lastMY = e.clientY;
        canvasEl.style.cursor = 'grabbing';
        e.preventDefault();
      }
    }
  });

  document.addEventListener('mousemove', e => {
    if (!isPanning) return;
    const dx = e.clientX - lastMX;
    const dy = e.clientY - lastMY;
    lastMX = e.clientX;
    lastMY = e.clientY;
    setPan(state.pan.x + dx, state.pan.y + dy);
  });

  document.addEventListener('mouseup', () => {
    if (isPanning) {
      isPanning = false;
      canvasEl.style.cursor = '';
    }
  });

  canvasEl.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(state.zoom + delta);
  }, { passive: false });
}

function buildAppShell() {
  return `
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
  `;
}
