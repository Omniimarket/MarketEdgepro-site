document.addEventListener("DOMContentLoaded", function () {
  fetch("marketproedge_signals.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched JSON Data:", data);

      // Convert object to array
      const signalsArray = Object.entries(data).map(([ticker, details]) => ({
        ticker,
        POC: details.POC ?? "—",
        POC_Move: details.POC_Move ?? "—",
        VAL: details.VAL ?? "—",
        VAH: details.VAH ?? "—",
        Gaps_Above: details.Gaps_Above?.join(", ") || "—",
        Gaps_Below: details.Gaps_Below?.join(", ") || "—"
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
          <button onclick="showChart('${info.ticker}', ${info.POC}, ${info.VAL}, ${info.VAH})">📈 View Chart</button>
        `;

        tickerContainer.appendChild(box);
      });
    })
    .catch(error => console.error("❌ Error loading signals:", error));
});

function showChart(ticker, poc, val, vah) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  if (window.currentChart) {
    window.currentChart.destroy();
  }

  window.currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["POC", "VAL", "VAH"],
      datasets: [{
        label: ticker + " Volume Profile",
        data: [poc, val, vah],
        backgroundColor: ["#1d4ed8", "#facc15", "#f87171"]
      }]
    },
    options: {
      responsive: true
    }
  });

  document.getElementById("chartModal").style.display = "block";
}

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("chartModal").style.display = "none";
});
