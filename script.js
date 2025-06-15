// Fetch and display tickers dynamically
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
      box.setAttribute("data-symbol", ticker); // This makes it searchable
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

    // Ensure search works after tickers are loaded
    document.getElementById("searchTicker").addEventListener("input", function () {
      const searchTerm = this.value.toUpperCase();
      document.querySelectorAll(".ticker-box").forEach(box => {
        const symbol = box.getAttribute("data-symbol");
        box.style.display = symbol.includes(searchTerm) ? "block" : "none";
      });
    });

  })
  .catch(error => console.error("Error loading market data:", error));
