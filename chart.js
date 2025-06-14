function showChart(ticker, poc, val, vah) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  // Ensure the modal is visible
  document.getElementById("chartModal").style.display = "block";

  // Destroy previous chart instance if it exists
  if (window.currentChart) {
    window.currentChart.destroy();
  }

  // Create new chart instance
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
}

// Close modal function
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("chartModal").style.display = "none";
});
