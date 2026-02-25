// glitch.js
document.addEventListener("DOMContentLoaded", function() {
  // Select all text elements you want to glitch
  const glitchElements = document.querySelectorAll("h1, h2, p, li, a");

  function randomGlitch() {
    glitchElements.forEach(el => {
      // tiny random position shift
      el.style.transform = `translate(${(Math.random()-0.5)*2}px, ${(Math.random()-0.5)*2}px)`;
    });
  }

  // Run every 100ms
  setInterval(randomGlitch, 100);
});