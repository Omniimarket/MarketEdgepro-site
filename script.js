document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");

  // Fetch the JSON file; uses a relative path since the file is at the same directory level.
  fetch("./marketproedge_signals.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not okay: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched JSON Data:", data);
      
      // Get the container that will receive the ticker boxes
      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear any existing content

      // Iterate over each ticker in the JSON object
      Object.keys(data).forEach(ticker => {
        const info = data[ticker];
        console.log("Processing ticker:", ticker, info);

        // Create a new box element to display the data
        const box = document.createElement("div");
        box.classList.add("ticker-box");

        // Set the inner HTML for the box with your desired labels and data
        box.innerHTML = `
          <h3>${ticker}</h3>
          <p><strong>Central Price (1H):</strong> ${info.CP_1h ?? "No Data"}</p>
          <p><strong>Upper Trading Level (1H):</strong> ${info.UTL_1h ?? "No Data"}</p>
          <p><strong>Lower Trading Level (1H):</strong> ${info.LTL_1h ?? "No Data"}</p>
          <p><strong>Central Price (Daily):</strong> ${info.CP_1day ?? "No Data"}</p>
          <p><strong>Upper Trading Level (Daily):</strong> ${info.UTL_1day ?? "No Data"}</p>
          <p><strong>Lower Trading Level (Daily):</strong> ${info.LTL_1day ?? "No Data"}</p>
        `;
        
        // Append the new box to the container
        tickerContainer.appendChild(box);
      });
    })
    .catch(error => {
      console.error("❌ Error loading signals:", error);
    });
});
