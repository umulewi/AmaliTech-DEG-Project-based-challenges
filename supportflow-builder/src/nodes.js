import {
  selectNode, startEditing, stopEditing,
  updateNodeText, updateNodeOption, removeOption, addOption,
  setNodePosition, deleteNode, state, getNode
} from './state.js';

const NODE_WIDTH = 220;

const TYPE_CONFIG = {
  start: { label: 'START', accent: '#22c55e', icon: '▶' },
  question: { label: 'QUESTION', accent: '#7c3aed', icon: '?' },
  end: { label: 'END', accent: '#f97316', icon: '■' },
};

export function renderNodes(container, nodes, selectedId, editingId, mode) {
  // Remove nodes that no longer exist
  const existingIds = new Set(nodes.map(n => n.id));
  container.querySelectorAll('.node-card').forEach(el => {
    if (!existingIds.has(el.dataset.id)) el.remove();
  });

  nodes.forEach(node => {
    let el = container.querySelector(`.node-card[data-id="${node.id}"]`);
    const isSelected = node.id === selectedId;
    const isEditing = node.id === editingId;
    const cfg = TYPE_CONFIG[node.type] || TYPE_CONFIG.question;

    if (!el) {
      el = document.createElement('div');
      el.className = 'node-card';
      el.dataset.id = node.id;
      container.appendChild(el);
      setupDrag(el, node.id);
    }

    // Position
    el.style.left = node.position.x + 'px';
    el.style.top = node.position.y + 'px';
    el.style.width = NODE_WIDTH + 'px';
    el.style.setProperty('--accent', cfg.accent);
    el.classList.toggle('selected', isSelected);
    el.classList.toggle('editing', isEditing);
    el.classList.toggle('preview-mode', mode === 'preview');

    el.innerHTML = buildNodeHTML(node, cfg, isEditing, mode);
    bindNodeEvents(el, node, isEditing, mode);
  });
}

function buildNodeHTML(node, cfg, isEditing, mode) {
  const deleteBtn = mode === 'editor' && node.type !== 'start'
    ? `<button class="node-delete-btn" title="Delete node">×</button>`
    : '';

  if (isEditing) {
    return `
      <div class="node-header">
        <span class="node-badge" style="background:${cfg.accent}22;color:${cfg.accent};border-color:${cfg.accent}44">${cfg.icon} ${cfg.label}</span>
        ${deleteBtn}
      </div>
      <div class="node-body editing">
        <textarea class="node-text-input" rows="3">${escapeHtml(node.text)}</textarea>
        <div class="node-options-edit">
          ${node.options.map((opt, i) => `
            <div class="option-edit-row" data-opt-idx="${i}">
              <span class="option-arrow">→</span>
              <input class="option-label-input" value="${escapeHtml(opt.label)}" placeholder="Option label" data-opt-idx="${i}" />
              <select class="option-next-select" data-opt-idx="${i}">
                ${buildNextIdOptions(opt.nextId)}
              </select>
              <button class="option-remove-btn" data-opt-idx="${i}">−</button>
            </div>
          `).join('')}
          <button class="add-option-btn">+ Add Option</button>
        </div>
        <button class="node-done-btn">✓ Done</button>
      </div>
    `;
  }

  return `
    <div class="node-header">
      <span class="node-badge" style="background:${cfg.accent}22;color:${cfg.accent};border-color:${cfg.accent}44">${cfg.icon} ${cfg.label}</span>
      ${deleteBtn}
    </div>
    <div class="node-body">
      <p class="node-text">${escapeHtml(node.text)}</p>
      ${node.options.length > 0 ? `
        <div class="node-options">
          ${node.options.map(opt => `
            <span class="node-option-chip">${escapeHtml(opt.label)}</span>
          `).join('')}
        </div>
      ` : `<div class="node-end-indicator">Terminal Node</div>`}
    </div>
    ${mode === 'editor' ? `<div class="node-edit-hint">Click to select • Double-click to edit</div>` : ''}
  `;
}

function buildNextIdOptions(currentNextId) {
  // We need node ids — import from state
  return state.nodes.map(n => `
    <option value="${n.id}" ${n.id === currentNextId ? 'selected' : ''}>${n.id}: ${truncate(n.text, 20)}</option>
  `).join('');
}

function bindNodeEvents(el, node, isEditing, mode) {
  if (mode === 'preview') return;

  if (isEditing) {
    const textarea = el.querySelector('.node-text-input');
    textarea?.addEventListener('input', e => updateNodeText(node.id, e.target.value));
    textarea?.addEventListener('mousedown', e => e.stopPropagation());

    el.querySelectorAll('.option-label-input').forEach(input => {
      input.addEventListener('input', e => {
        const idx = parseInt(e.target.dataset.optIdx);
        updateNodeOption(node.id, idx, e.target.value);
      });
      input.addEventListener('mousedown', e => e.stopPropagation());
    });

    el.querySelectorAll('.option-next-select').forEach(sel => {
      sel.addEventListener('change', e => {
        const idx = parseInt(e.target.dataset.optIdx);
        const n = getNode(node.id);
        if (n && n.options[idx]) {
          n.options[idx].nextId = e.target.value;
          updateNodeText(node.id, n.text); // triggers state emit -> re-render
        }
      });
      sel.addEventListener('mousedown', e => e.stopPropagation());
    });

    el.querySelectorAll('.option-remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.optIdx);
        removeOption(node.id, idx);
      });
    });

    el.querySelector('.add-option-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      const firstOtherId = state.nodes.find(n => n.id !== node.id)?.id || node.id;
      addOption(node.id, 'New option', firstOtherId);
    });

    el.querySelector('.node-done-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      stopEditing();
    });

    el.querySelector('.node-delete-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      deleteNode(node.id);
    });
  } else {
    el.addEventListener('click', e => {
      if (e.target.classList.contains('node-delete-btn')) return;
      selectNode(node.id);
    });
    el.addEventListener('dblclick', e => {
      e.stopPropagation();
      startEditing(node.id);
    });

    el.querySelector('.node-delete-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      deleteNode(node.id);
    });
  }
}

function setupDrag(el, nodeId) {
  el.addEventListener('mousedown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON') return;
    if (state.mode === 'preview') return;

    const node = state.nodes.find(n => n.id === nodeId);
    if (!node) return;

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startX = node.position.x;
    const startY = node.position.y;

    el.classList.add('dragging');
    e.preventDefault();

    const onMove = (me) => {
      const dx = (me.clientX - startMouseX) / state.zoom;
      const dy = (me.clientY - startMouseY) / state.zoom;
      setNodePosition(nodeId, startX + dx, startY + dy);
    };

    const onUp = () => {
      el.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '…' : str;
}
