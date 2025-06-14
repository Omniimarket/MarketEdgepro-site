document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");

  // Fetch the JSON file (using a relative path)
  fetch("./marketproedge_signals.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not okay: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched JSON Data:", data);
      
      // Render ticker boxes
      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear any existing content

      Object.keys(data).forEach(ticker => {
        const info = data[ticker];
        console.log("Processing ticker:", ticker, info);

        // Optionally skip data that is empty
        if (Object.keys(info).length === 0) {
          console.warn(`No data available for ${ticker}.`);
          return;
        }

        // Create a ticker box element
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        // Use the original keys from the JSON data for now:
        box.innerHTML = `
          <h3>${ticker}</h3>
          <p><strong>Point of Control (1H):</strong> ${info.POC_1h ?? "No Data"}</p>
          <p><strong>Upper Trading Level (1H):</strong> ${info.VAH_1h ?? "No Data"}</p>
          <p><strong>Lower Trading Level (1H):</strong> ${info.VAL_1h ?? "No Data"}</p>
          <p><strong>Point of Control (Daily):</strong> ${info.POC_1day ?? "No Data"}</p>
          <p><strong>Upper Trading Level (Daily):</strong> ${info.VAH_1day ?? "No Data"}</p>
          <p><strong>Lower Trading Level (Daily):</strong> ${info.VAL_1day ?? "No Data"}</p>
        `;
        tickerContainer.appendChild(box);
      });

      // For example, draw the chart for AAPL if that data exists.
      if (data["AAPL"]) {
        drawChart("AAPL", data["AAPL"]);
      }
    })
    .catch(error => {
      console.error("❌ Error loading signals:", error);
    });

  // Function to draw a chart with Chart.js using data for a given ticker.
  function drawChart(ticker, info) {
    // Get the context of the canvas element where the chart will be drawn.
    const ctx = document.getElementById('myChart').getContext('2d');

    // Prepare the chart data.
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

    // If a chart instance already exists, destroy it first so as not to overlap.
    if (window.myChartInstance) {
      window.myChartInstance.destroy();
    }

    // Create a new bar chart using Chart.js.
    const myChart = new Chart(ctx, {
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

    // Save the chart instance globally so we can destroy it later if needed.
    window.myChartInstance = myChart;
  }
});
