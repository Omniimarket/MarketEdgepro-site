document.addEventListener("DOMContentLoaded", function () {
  fetch("marketproedge_signals.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched JSON Data:", data);

      // Convert JSON object into an array
      const signalsArray = Object.keys(data).map(ticker => ({
        ticker,
        POC: data[ticker].poc ?? "No Data",
        POC_Move: data[ticker].pocMove ?? "No Data",
        VAL: data[ticker].val ?? "No Data",
        VAH: data[ticker].vah ?? "No Data",
        Gaps_Above: data[ticker].gapsAbove?.join(", ") || "No Data",
        Gaps_Below: data[ticker].gapsBelow?.join(", ") || "No Data"
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
