fetch("/js/data/keys.json")
  .then(response => response.json())
  .then(data => {
    const keys = data;
    const input = document.getElementById("accessCode");
    const response = document.getElementById("response");

    if (!input || !response) {
      console.error("Input or response element not found!");
      return;
    }

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        const code = input.value.toUpperCase().trim();
        if (keys[code]) {
          response.innerText = "ACCESS GRANTED";
          setTimeout(() => {
            window.location.href = keys[code];
          }, 700);
        } else {
          response.innerText = "ACCESS DENIED";
        }
        input.value = "";
      }
    });
  })
  .catch(err => {
    console.error("Failed to load keys:", err);
  });