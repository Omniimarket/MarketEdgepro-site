document.addEventListener("DOMContentLoaded", function () {
  fetch("marketproedge_signals.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched JSON Data:", data);

      // Convert JSON object into an array
      const signalsArray = Object.entries(data).map(([ticker, details]) => ({
        ticker,
        POC: details.POC !== undefined ? details.POC : "No Data",
        POC_Move: details.POC_Move !== undefined ? details.POC_Move : "No Data",
        VAL: details.VAL !== undefined ? details.VAL : "No Data",
        VAH: details.VAH !== undefined ? details.VAH : "No Data",
        Gaps_Above: details.Gaps_Above?.join(", ") || "No Data",
        Gaps_Below: details.Gaps_Below?.join(", ") || "No Data"
      }));

      console.log("Processed Data for Display:", signalsArray);

      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear previous content

      signalsArray.forEach(info => {
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        box.innerHTML = `
          <h3>${info.ticker}</h3>
          <p><strong>POC:</strong> ${info.POC}</p>
          <p><strong>POC Move:</strong> ${info.POC_Move}</p>
          <p><strong>VAL:</strong> ${info.VAL}</p>
          <p><strong>VAH:</strong> ${info.VAH}</p>
          <p><strong>Gaps Above:</strong> ${info.Gaps_Above}</p>
          <p><strong>Gaps Below:</strong> ${info.Gaps_Below}</p>
        `;

        tickerContainer.appendChild(box);
      });
    })
    .catch(error => console.error("❌ Error loading signals:", error));
});
