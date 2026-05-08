function startGlitch(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const original = el.getAttribute("data-original");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function glitchStep() {
    // Each character has a 40% chance to be scrambled at any given frame
    let result = "";
    for (let i = 0; i < original.length; i++) {
      result += Math.random() < 0.4 ? randomChar() : original[i];
    }
    el.textContent = result;
  }

  // Run a glitch burst: rapid frames, then pause, then repeat
  function glitchBurst() {
    let frames = 0;
    const burstLength = 8 + Math.floor(Math.random() * 8); // 8–15 frames per burst

    const burst = setInterval(() => {
      glitchStep();
      frames++;
      if (frames >= burstLength) {
        clearInterval(burst);
        el.textContent = original; // Briefly show original
        // Wait a random pause before next burst
        setTimeout(glitchBurst, 1 + Math.random() * 1);
      }
    }, 50); // 50ms between frames = ~20fps jitter
  }

  glitchBurst();
}

// Only trigger when the <details> is opened
document.addEventListener("DOMContentLoaded", () => {
  const details = document.querySelector("details:has(#glitch-text)");
  if (details) {
    details.addEventListener("toggle", () => {
      if (details.open) startGlitch("glitch-text");
    });
  }
});