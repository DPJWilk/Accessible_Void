(function () {
  const GLITCH_IMAGE = "../images/Jessica_Clown.png"; // The replacement image
  const BASE_IMAGE = "../images/Jessica.png";
  const BG_SIZE_W_PERCENT = 15; // Must match your CSS background-size width %
  const BG_SIZE_H_PERCENT = 25; // Must match your CSS background-size height %
  const FLASH_DURATION_MS = 100; // How long the glitch image shows (ms)
  const MIN_INTERVAL_MS = 100; // Minimum time between glitches
  const MAX_INTERVAL_MS = 30000; // Maximum time between glitches

  // Track recently used cells to avoid repeats
  const recentCells = new Set();

  function getGridDimensions() {
    const cols = Math.ceil(100 / BG_SIZE_W_PERCENT);
    const rows = Math.ceil(100 / BG_SIZE_H_PERCENT);
    return { cols, rows };
  }

  function pickRandomCell(cols, rows) {
    const total = cols * rows;
    const available = [];

    for (let i = 0; i < total; i++) {
      if (!recentCells.has(i)) available.push(i);
    }

    // If somehow all cells are recent, clear and retry
    if (available.length === 0) {
      recentCells.clear();
      return Math.floor(Math.random() * total);
    }

    const chosen = available[Math.floor(Math.random() * available.length)];

    // Remember this cell; forget it after enough time has passed
    recentCells.add(chosen);
    setTimeout(() => recentCells.delete(chosen), MAX_INTERVAL_MS * 4);

    return chosen;
  }

  function triggerGlitch() {
    const { cols, rows } = getGridDimensions();
    const cellIndex = pickRandomCell(cols, rows);

    const col = cellIndex % cols;
    const row = Math.floor(cellIndex / cols);

    // Convert grid position to pixel position
    const cellW = window.innerWidth / cols;
    const cellH = window.innerHeight / rows;
    const x = col * cellW;
    const y = row * cellH;

    // Create a temporary overlay div at that exact cell
    const glitch = document.createElement("div");
    glitch.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${cellW}px;
      height: ${cellH}px;
      background-image: url("${GLITCH_IMAGE}");
      background-size: cover;
      background-position: center;
      z-index: 1;
      pointer-events: none;
      opacity: 0.5;
    `;

    document.body.appendChild(glitch);

    // Remove after the flash duration
    setTimeout(() => glitch.remove(), FLASH_DURATION_MS);

    // Schedule the next glitch
    const next =
      MIN_INTERVAL_MS +
      Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS);
    setTimeout(triggerGlitch, next);
  }

  // Kick off after page load
  window.addEventListener("load", () => {
    const firstDelay = MIN_INTERVAL_MS + Math.random() * MAX_INTERVAL_MS;
    setTimeout(triggerGlitch, firstDelay);
  });
})();