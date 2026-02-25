

const wikiPages = [
{ title: "26 Rodenbeck Street", url: "26Rodenbecker.html", tags: ["location", "safehouse"] },  
{ title: "TV Odyssey Station", url: "TVOdyssey.html", tags: ["location", "odyssey"] },  
{ title: "Deep Lake, New Mexico", url: "DeepLake.html", tags: ["location"] },
{ title: "Odyssey Tapes", url: "Tapes.html", tags: ["odyssey"] }
];

function filterWiki() {
  const input = document.getElementById("wikiSearch").value.toLowerCase();
  const results = document.getElementById("wikiResults");
  results.innerHTML = "";

  if (input.length === 0) return; // hide everything if empty

  const matches = wikiPages.filter(page =>
    page.title.toLowerCase().includes(input) ||
    page.tags.some(tag => tag.includes(input))
  );

  if (matches.length === 0 || matches.length > 5) return;

  matches.forEach(page => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = page.url;
    a.textContent = page.title;
    li.appendChild(a);
    results.appendChild(li);
  });
}