document.addEventListener("DOMContentLoaded", function () {
  fetch("marketproedge_signals.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched JSON Data:", data);

      if (!Array.isArray(data)) {
        console.error("Expected an array but received:", typeof data, data);
        return;
      }

      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear previous content

      data.forEach(info => {
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        box.innerHTML = `
          <h3>${info.ticker}</h3>
          <p><strong>POC (1H):</strong> ${info.POC_1H ?? "No Data"}</p>
          <p><strong>POC (Daily):</strong> ${info.POC_Daily ?? "No Data"}</p>
          <p><strong>VAL (1H):</strong> ${info.VAL_1H ?? "No Data"}</p>
          <p><strong>VAL (Daily):</strong> ${info.VAL_Daily ?? "No Data"}</p>
          <p><strong>VAH (1H):</strong> ${info.VAH_1H ?? "No Data"}</p>
          <p><strong>VAH (Daily):</strong> ${info.VAH_Daily ?? "No Data"}</p>
        `;

        tickerContainer.appendChild(box);
      });
    })
    .catch(error => console.error("❌ Error loading signals:", error));
});
