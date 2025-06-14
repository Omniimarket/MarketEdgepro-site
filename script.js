document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");

  // Use a relative path to load the JSON file
  fetch("./marketproedge_signals.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not okay: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched JSON Data:", data);
      
      // Get the container where ticker boxes will be appended
      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear any existing content

      // Iterate through each ticker in the JSON object
      Object.keys(data).forEach(ticker => {
        const info = data[ticker];
        console.log("Processing ticker:", ticker, info);

        // Optionally skip tickers that have no data, e.g., an empty object
        if (Object.keys(info).length === 0) {
          console.warn(`No data available for ${ticker}.`);
          return;
        }

        // Create a box element to display the ticker data
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        // Update the text labels here from "Central Price" to "Point of Control"
        box.innerHTML = `
          <h3>${ticker}</h3>
          <p><strong>Point of Control (1H):</strong> ${info.POC_1h ?? "No Data"}</p>
          <p><strong>Upper Trading Level (1H):</strong> ${info.VAH_1h ?? "No Data"}</p>
          <p><strong>Lower Trading Level (1H):</strong> ${info.VAL_1h ?? "No Data"}</p>
          <p><strong>Point of Control (Daily):</strong> ${info.POC_1day ?? "No Data"}</p>
          <p><strong>Upper Trading Level (Daily):</strong> ${info.VAH_1day ?? "No Data"}</p>
          <p><strong>Lower Trading Level (Daily):</strong> ${info.VAL_1day ?? "No Data"}</p>
        `;
        
        // Append the new box to the ticker container
        tickerContainer.appendChild(box);
      });
    })
    .catch(error => {
      console.error("❌ Error loading signals:", error);
    });
});
