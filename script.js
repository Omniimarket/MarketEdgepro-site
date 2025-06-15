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
      
      // Get the container for ticker boxes
      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear any existing content

      // Iterate over each ticker
      Object.keys(data).forEach(ticker => {
        const info = data[ticker];
        console.log("Processing ticker:", ticker, info);

        // Skip if data is empty (optional)
        if (Object.keys(info).length === 0) {
          console.warn(`No data available for ${ticker}.`);
          return;
        }

        // Create a new ticker box element
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        // Populate the box with information and a button to view the chart
        box.innerHTML = `
          <h3>${ticker}</h3>
          <p><strong>Point of Control (1H):</strong> ${info.POC_1h ?? "No Data"}</p>
          <p><strong>Upper Trading Level (1H):</strong> ${info.VAH_1h ?? "No Data"}</p>
          <p><strong>Lower Trading Level (1H):</strong> ${info.VAL_1h ?? "No Data"}</p>
          <p><strong>Point of Control (Daily):</strong> ${info.POC_1day ?? "No Data"}</p>
          <p><strong>Upper Trading Level (Daily):</strong> ${info.VAH_1day ?? "No Data"}</p>
          <p><strong>Lower Trading Level (Daily):</strong> ${info.VAL_1day ?? "No Data"}</p>
          <button class="view-chart">View Chart</button>
        `;

        // Add an event listener to the button to open the modal with the chart for that ticker
        box.querySelector("button.view-chart").addEventListener("click", function () {
          drawChart(ticker, info);
          openModal();
        });

        // Append the box to the container
        tickerContainer.appendChild(box);
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
