document.addEventListener("DOMContentLoaded", function () {
  fetch("marketproedge_signals.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched JSON Data:", data);

      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.error("Expected array but received:", typeof data, data);
        return;
      }

      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear previous content

      data.forEach(info => {
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        box.innerHTML = `
          <h3>${info.ticker}</h3>
          <p><strong>POC:</strong> ${info.POC ?? "No Data"}</p>
          <p><strong>POC Move:</strong> ${info.POC_Move ?? "No Data"}</p>
          <p><strong>VAL:</strong> ${info.VAL ?? "No Data"}</p>
          <p><strong>VAH:</strong> ${info.VAH ?? "No Data"}</p>
          <p><strong>Gaps Above:</strong> ${info.Gaps_Above?.join(", ") || "No Data"}</p>
          <p><strong>Gaps Below:</strong> ${info.Gaps_Below?.join(", ") || "No Data"}</p>
        `;

        tickerContainer.appendChild(box);
      });
    })
    .catch(error => console.error("❌ Error loading signals:", error));
});
