document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");

  // Use a relative path since the JSON file is published at the same level.
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
      tickerContainer.innerHTML = ""; // Clear existing content

      // Iterate over each ticker in the JSON object
      Object.keys(data).forEach(ticker => {
        const info = data[ticker];
        console.log("Processing ticker:", ticker, info);

        // Skip rendering if info is empty (handle missing data gracefully)
        if (Object.keys(info).length === 0) {
          console.warn(`No data available for ${ticker}.`);
          return;
        }

        // Create a new ticker box element
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        // Use original JSON keys to display the data
        box.innerHTML = `
          <h3>${ticker}</h3>
          <p><strong>Central Price (1H):</strong> ${info.POC_1h ?? "No Data"}</p>
          <p><strong>Upper Trading Level (1H):</strong> ${info.VAH_1h ?? "No Data"}</p>
          <p><strong>Lower Trading Level (1H):</strong> ${info.VAL_1h ?? "No Data"}</p>
          <p><strong>Central Price (Daily):</strong> ${info.POC_1day ?? "No Data"}</p>
          <p><strong>Upper Trading Level (Daily):</strong> ${info.VAH_1day ?? "No Data"}</p>
          <p><strong>Lower Trading Level (Daily):</strong> ${info.VAL_1day ?? "No Data"}</p>
        `;

        // Append the new element to the container
        tickerContainer.appendChild(box);
      });
    })
    .catch(error => {
      console.error("❌ Error loading signals:", error);
    });
});
