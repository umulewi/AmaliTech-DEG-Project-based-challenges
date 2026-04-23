import flowData from '../flow_data.json';

// Deep clone initial data
const initialNodes = () => JSON.parse(JSON.stringify(flowData.nodes));

export const state = {
  nodes: initialNodes(),
  mode: 'editor', // 'editor' | 'preview'
  selectedNodeId: null,
  editingNodeId: null,
  previewCurrentId: null,
  previewHistory: [],
  pan: { x: 0, y: 0 },
  zoom: 1,
  dragging: null, // { nodeId, startX, startY, origX, origY }
  highlightedPath: [], // node ids in current preview path
  canvasSize: flowData.meta.canvas_size,
};

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach(fn => fn({ ...state }));
}

export function getNode(id) {
  return state.nodes.find(n => n.id === id);
}

export function updateNodeText(id, text) {
  const node = state.nodes.find(n => n.id === id);
  if (node) {
    node.text = text;
    emit();
  }
}

export function updateNodeOption(nodeId, optIdx, label) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (node && node.options[optIdx]) {
    node.options[optIdx].label = label;
    emit();
  }
}

export function addOption(nodeId, label, nextId) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (node) {
    node.options.push({ label, nextId });
    emit();
  }
}

export function removeOption(nodeId, optIdx) {
  const node = state.nodes.find(n => n.id === nodeId);
  if (node && node.options.length > optIdx) {
    node.options.splice(optIdx, 1);
    emit();
  }
}

export function setNodePosition(id, x, y) {
  const node = state.nodes.find(n => n.id === id);
  if (node) {
    node.position.x = x;
    node.position.y = y;
    emit();
  }
}

export function selectNode(id) {
  state.selectedNodeId = id;
  state.editingNodeId = null;
  emit();
}

export function startEditing(id) {
  state.editingNodeId = id;
  state.selectedNodeId = id;
  emit();
}

export function stopEditing() {
  state.editingNodeId = null;
  emit();
}

export function setMode(mode) {
  state.mode = mode;
  if (mode === 'preview') {
    const startNode = state.nodes.find(n => n.type === 'start');
    state.previewCurrentId = startNode ? startNode.id : state.nodes[0].id;
    state.previewHistory = [state.previewCurrentId];
    state.highlightedPath = [state.previewCurrentId];
    state.selectedNodeId = null;
    state.editingNodeId = null;
  } else {
    state.highlightedPath = [];
  }
  emit();
}

export function previewChoose(nextId) {
  state.previewHistory.push(nextId);
  state.previewCurrentId = nextId;
  state.highlightedPath = [...state.previewHistory];
  emit();
}

export function previewRestart() {
  const startNode = state.nodes.find(n => n.type === 'start');
  state.previewCurrentId = startNode ? startNode.id : state.nodes[0].id;
  state.previewHistory = [state.previewCurrentId];
  state.highlightedPath = [state.previewCurrentId];
  emit();
}

export function setPan(x, y) {
  state.pan.x = x;
  state.pan.y = y;
  emit();
}

export function setZoom(z) {
  state.zoom = Math.max(0.3, Math.min(2, z));
  emit();
}

export function addNode() {
  const id = String(Date.now());
  const newNode = {
    id,
    type: 'question',
    text: 'New Question',
    position: { x: 200 + Math.random() * 400, y: 200 + Math.random() * 200 },
    options: [],
  };
  state.nodes.push(newNode);
  state.selectedNodeId = id;
  state.editingNodeId = id;
  emit();
}

export function deleteNode(id) {
  // Remove node
  state.nodes = state.nodes.filter(n => n.id !== id);
  // Remove all options pointing to this node
  state.nodes.forEach(n => {
    n.options = n.options.filter(o => o.nextId !== id);
  });
  if (state.selectedNodeId === id) state.selectedNodeId = null;
  if (state.editingNodeId === id) state.editingNodeId = null;
  emit();
}

export function resetFlow() {
  state.nodes = initialNodes();
  state.selectedNodeId = null;
  state.editingNodeId = null;
  state.pan = { x: 0, y: 0 };
  state.zoom = 1;
  emit();
}
