document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");

  // Fetch the JSON file (using a relative path)
fetch("marketData.json")
  .then(response => response.json())
  .then(data => {
    const tickerContainer = document.getElementById("tickerContainer");
    tickerContainer.innerHTML = ""; // Clear previous content

    Object.keys(data).forEach(ticker => {
      const info = data[ticker];

      // Determine trend color
      const trendColor = info.RSI > 60 ? "green" : info.RSI < 40 ? "red" : "gray";

      // Create ticker card
      const box = document.createElement("div");
      box.classList.add("ticker-box");
      box.setAttribute("data-symbol", ticker);
      box.innerHTML = `
        <div class="ticker-header">
          <h3>${ticker}</h3>
          <span class="trend-indicator" style="background-color: ${trendColor};"></span>
        </div>
        <p><strong>Point of Control:</strong> ${info.POC}</p>
        <p><strong>RSI:</strong> ${info.RSI}</p>
        <p><strong>Moving Average:</strong> ${info.SMA}</p>
        <button class="view-details">View Details</button>
      `;

      // Expand details on button click
      box.querySelector(".view-details").addEventListener("click", function () {
        alert(`More details for ${ticker}: Volume - ${info.Volume}, Trend - ${info.Trend}`);
      });

      tickerContainer.appendChild(box);
    });
  });

    })
    .catch(error => {
      console.error("❌ Error loading signals:", error);
    });
document.getElementById("searchTicker").addEventListener("input", function () {
  const searchTerm = this.value.toUpperCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = ""; // Clear previous suggestions

  document.querySelectorAll(".ticker-box").forEach(box => {
    const symbol = box.getAttribute("data-symbol");
    if (symbol.includes(searchTerm)) {
      box.style.display = "block";

      // Add matching stock to suggestions
      const suggestionItem = document.createElement("li");
      suggestionItem.innerText = symbol;
      suggestionItem.addEventListener("click", function () {
        document.getElementById("searchTicker").value = symbol;
        suggestions.innerHTML = ""; // Clear suggestions
      });
      suggestions.appendChild(suggestionItem);
    } else {
      box.style.display = "none";
    }
  });
});

  // Function to open the modal
  function openModal() {
    const modal = document.getElementById("chartModal");
    modal.style.display = "block";
  }

  // Function to close the modal when the close button is clicked
  document.querySelector(".modal-content .close").addEventListener("click", function () {
    const modal = document.getElementById("chartModal");
    modal.style.display = "none";
  });

  // Function to draw (or update) a Chart.js bar chart for a given ticker.
  function drawChart(ticker, info) {
    // Get the canvas context for the chart in the modal
    const ctx = document.getElementById('myChart').getContext('2d');

    // Prepare the chart data with two datasets for 1H and Daily values.
    const chartData = {
      labels: ["Point of Control", "Upper Trading Level", "Lower Trading Level"],
      datasets: [
        {
          label: "1H",
          data: [info.POC_1h || null, info.VAH_1h || null, info.VAL_1h || null],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: "Daily",
          data: [info.POC_1day || null, info.VAH_1day || null, info.VAL_1day || null],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    };

    // If there's an existing chart instance, destroy it first.
    if (window.myChartInstance) {
      window.myChartInstance.destroy();
    }

    // Create a new bar chart using Chart.js.
    window.myChartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Trading Levels for ${ticker}`
          }
        }
      }
    });
  }
});
