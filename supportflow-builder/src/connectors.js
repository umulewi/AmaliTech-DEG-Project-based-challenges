/**
 * Draws bezier curve connectors between nodes on the SVG overlay.
 * All coordinates are in canvas (pre-zoom/pan) space.
 */

const NODE_WIDTH = 220;
const NODE_HEIGHT_BASE = 110;

export function getNodeCenter(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + NODE_HEIGHT_BASE / 2,
  };
}

export function getNodeBottom(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + NODE_HEIGHT_BASE,
  };
}

export function getNodeTop(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y,
  };
}

export function getOptionExitPoint(node, optionIndex, totalOptions) {
  const spacing = NODE_WIDTH / (totalOptions + 1);
  return {
    x: node.position.x + spacing * (optionIndex + 1),
    y: node.position.y + NODE_HEIGHT_BASE,
  };
}

export function buildPath(x1, y1, x2, y2) {
  const dy = y2 - y1;
  const tension = Math.max(Math.abs(dy) * 0.5, 60);
  return `M ${x1} ${y1} C ${x1} ${y1 + tension}, ${x2} ${y2 - tension}, ${x2} ${y2}`;
}

export function renderConnectors(svgEl, nodes, highlightedPath) {
  // Clear existing
  while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  // Arrowhead marker - normal
  const marker = createArrowMarker('arrow-normal', '#3a3a4a');
  const markerHighlight = createArrowMarker('arrow-highlight', '#00e5ff');
  const markerActive = createArrowMarker('arrow-active', '#7c3aed');
  defs.appendChild(marker);
  defs.appendChild(markerHighlight);
  defs.appendChild(markerActive);
  svgEl.appendChild(defs);

  const nodeMap = {};
  nodes.forEach(n => (nodeMap[n.id] = n));

  nodes.forEach(node => {
    const total = node.options.length;
    node.options.forEach((opt, i) => {
      const child = nodeMap[opt.nextId];
      if (!child) return;

      const from = getOptionExitPoint(node, i, total);
      const to = getNodeTop(child);

      const isHighlighted =
        highlightedPath.includes(node.id) && highlightedPath.includes(child.id) &&
        highlightedPath.indexOf(child.id) === highlightedPath.indexOf(node.id) + 1;

      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', buildPath(from.x, from.y, to.x, to.y));
      pathEl.setAttribute('fill', 'none');

      if (isHighlighted) {
        pathEl.setAttribute('stroke', '#00e5ff');
        pathEl.setAttribute('stroke-width', '2.5');
        pathEl.setAttribute('marker-end', 'url(#arrow-highlight)');
        pathEl.setAttribute('class', 'connector-highlighted');
      } else {
        pathEl.setAttribute('stroke', '#3a3a4a');
        pathEl.setAttribute('stroke-width', '1.5');
        pathEl.setAttribute('marker-end', 'url(#arrow-normal)');
        pathEl.setAttribute('class', 'connector');
      }
      pathEl.setAttribute('stroke-dasharray', isHighlighted ? 'none' : '4 3');

      // Label
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;

      const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      labelBg.setAttribute('x', midX - 40);
      labelBg.setAttribute('y', midY - 10);
      labelBg.setAttribute('width', 80);
      labelBg.setAttribute('height', 18);
      labelBg.setAttribute('rx', 4);
      labelBg.setAttribute('fill', isHighlighted ? '#00e5ff22' : '#1a1a2a');
      labelBg.setAttribute('stroke', isHighlighted ? '#00e5ff55' : '#2a2a3a');
      labelBg.setAttribute('stroke-width', '1');

      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', midX);
      labelText.setAttribute('y', midY + 3);
      labelText.setAttribute('text-anchor', 'middle');
      labelText.setAttribute('font-size', '9');
      labelText.setAttribute('font-family', 'JetBrains Mono, monospace');
      labelText.setAttribute('fill', isHighlighted ? '#00e5ff' : '#5a5a7a');
      labelText.textContent = truncate(opt.label, 10);

      svgEl.appendChild(pathEl);
      svgEl.appendChild(labelBg);
      svgEl.appendChild(labelText);
    });
  });
}

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '…' : str;
}

function createArrowMarker(id, color) {
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
  marker.setAttribute('id', id);
  marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '9');
  marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '6');
  marker.setAttribute('markerHeight', '6');
  marker.setAttribute('orient', 'auto-start-reverse');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
  path.setAttribute('fill', color);
  marker.appendChild(path);
  return marker;
}
