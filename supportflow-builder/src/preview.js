import { previewChoose, previewRestart, setMode, getNode } from './state.js';

export function renderPreview(container, state) {
  const current = getNode(state.previewCurrentId);
  if (!current) return;

  const isEnd = current.type === 'end' || current.options.length === 0;
  const history = state.previewHistory
    .slice(0, -1)
    .map(id => getNode(id))
    .filter(Boolean);

  container.innerHTML = `
    <div class="preview-panel">
      <div class="preview-header">
        <div class="preview-title">
          <span class="preview-bot-icon">◈</span>
          <span>SupportBot Preview</span>
        </div>
        <button class="preview-exit-btn" id="preview-exit">Exit Preview</button>
      </div>

      <div class="preview-chat" id="preview-chat">
        ${history.map((node, i) => buildHistoryBubble(node, state, i)).join('')}
        <div class="chat-bubble bot-bubble current-bubble">
          <div class="bubble-avatar">◈</div>
          <div class="bubble-content">
            <p>${escapeHtml(current.text)}</p>
          </div>
        </div>
        ${isEnd ? `
          <div class="preview-end-actions">
            <button class="preview-restart-btn" id="preview-restart">↺ Start Over</button>
          </div>
        ` : `
          <div class="preview-options">
            ${current.options.map((opt, i) => `
              <button class="preview-option-btn" data-next="${opt.nextId}" data-idx="${i}">
                ${escapeHtml(opt.label)}
              </button>
            `).join('')}
          </div>
        `}
      </div>

      <div class="preview-path-indicator">
        ${state.previewHistory.map((id, i) => {
          const n = getNode(id);
          return `<span class="path-dot ${id === state.previewCurrentId ? 'active' : ''}" title="${n ? n.text : id}"></span>`;
        }).join('<span class="path-line"></span>')}
      </div>
    </div>
  `;

  // Bind events
  document.getElementById('preview-exit')?.addEventListener('click', () => setMode('editor'));
  document.getElementById('preview-restart')?.addEventListener('click', () => previewRestart());

  container.querySelectorAll('.preview-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextId = btn.dataset.next;
      previewChoose(nextId);
    });
  });

  // Scroll to bottom
  const chat = document.getElementById('preview-chat');
  if (chat) chat.scrollTop = chat.scrollHeight;
}

function buildHistoryBubble(node, state, histIdx) {
  // Find what option was chosen to get to the next node
  const nextId = state.previewHistory[histIdx + 1];
  const chosenOpt = nextId ? node.options.find(o => o.nextId === nextId) : null;

  return `
    <div class="chat-bubble bot-bubble">
      <div class="bubble-avatar">◈</div>
      <div class="bubble-content">
        <p>${escapeHtml(node.text)}</p>
      </div>
    </div>
    ${chosenOpt ? `
      <div class="chat-bubble user-bubble">
        <div class="bubble-content user-content">
          <p>${escapeHtml(chosenOpt.label)}</p>
        </div>
        <div class="bubble-avatar user-avatar">U</div>
      </div>
    ` : ''}
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
