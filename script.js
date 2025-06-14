document.addEventListener("DOMContentLoaded", function () {
  console.log("Script.js is running on signals page.");

fetch("./marketproedge_signals.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not okay: " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched JSON Data:", data);
    const tickerContainer = document.getElementById("tickerContainer");
    tickerContainer.innerHTML = "";
    
    Object.keys(data).forEach(ticker => {
      const info = data[ticker];
      console.log("Processing ticker:", ticker, info);
      const box = document.createElement("div");
      box.classList.add("ticker-box");
      box.innerHTML = `
        <h3>${ticker}</h3>
        <p><strong>Central Price (1H):</strong> ${info.CP_1h ?? "No Data"}</p>
        <p><strong>Upper Trading Level (1H):</strong> ${info.UTL_1h ?? "No Data"}</p>
        <p><strong>Lower Trading Level (1H):</strong> ${info.LTL_1h ?? "No Data"}</p>
        <p><strong>Central Price (Daily):</strong> ${info.CP_1day ?? "No Data"}</p>
        <p><strong>Upper Trading Level (Daily):</strong> ${info.UTL_1day ?? "No Data"}</p>
        <p><strong>Lower Trading Level (Daily):</strong> ${info.LTL_1day ?? "No Data"}</p>
      `;
      tickerContainer.appendChild(box);
    });
  })
  .catch(error => {
    console.error("❌ Error loading signals:", error);
  });
