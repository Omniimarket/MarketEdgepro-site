document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");
  
  // Adjust the fetch path if needed. This assumes marketproedge_signals.json is in the same folder.
  fetch("/marketproedge_signals.json")
    .then(response => response.json())
    .then(data => {
      console.log("Fetched JSON Data:", data);
      
      const tickerContainer = document.getElementById("tickerContainer");
      tickerContainer.innerHTML = ""; // Clear previous content
      
      // Data is an object with tickers as keys
      Object.keys(data).forEach(ticker => {
        const info = data[ticker];
                
        const box = document.createElement("div");
        box.classList.add("ticker-box");
        
        box.innerHTML = `
          <h3>${ticker}</h3>
          <p><strong>POC (1H):</strong> ${info.POC_1h ?? "No Data"}</p>
          <p><strong>VAH (1H):</strong> ${info.VAH_1h ?? "No Data"}</p>
          <p><strong>VAL (1H):</strong> ${info.VAL_1h ?? "No Data"}</p>
          <p><strong>POC (Daily):</strong> ${info.POC_1day ?? "No Data"}</p>
          <p><strong>VAH (Daily):</strong> ${info.VAH_1day ?? "No Data"}</p>
          <p><strong>VAL (Daily):</strong> ${info.VAL_1day ?? "No Data"}</p>
        `;
        
        tickerContainer.appendChild(box);
      });
    })
    .catch(error => {
      console.error("❌ Error loading signals:", error);
    });
});
