function showChart(ticker) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  // Dummy data for now (fetch real data later)
  const data = {
    labels: ["POC", "VAL", "VAH"],
    datasets: [{
      label: ticker + " Volume Profile",
      data: [200, 195, 212], // Replace with actual ticker data
      backgroundColor: ["#1d4ed8", "#facc15", "#f87171"]
    }]
  };

  // Destroy previous chart instance
  if (window.currentChart) {
    window.currentChart.destroy();
  }

  window.currentChart = new Chart(ctx, {
    type: "bar",
    data,
    options: {
      responsive: true
    }
  });

  document.getElementById("chartModal").style.display = "block";
}

// Close modal function
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("chartModal").style.display = "none";
});
