const Sales6month = [{
  "location": "EB Public Library",
  "Total_Sales": "2181.0"
}, {
  "location": "Brunswick Sq Mall",
  "Total_Sales": "1764.25"
}, {
  "location": "Earle Asphalt",
  "Total_Sales": "866.5"
}, {
  "location": "GuttenPlans",
  "Total_Sales": "3121.25"
}]

const TotalSalesByLocation = [{
  "location": "EB Public Library",
  "total_sales": "6347.75"
}, {
  "location": "Brunswick Sq Mall",
  "total_sales": "3270.0"
}, {
  "location": "Earle Asphalt",
  "total_sales": "1808.75"
}, {
  "location": "GuttenPlans",
  "total_sales": "6904.25"
}]

const allTimeData = TotalSalesByLocation.map((item) => ({
  location: item.location,
  total_sales: parseFloat(item.total_sales),
}));

const sixMonthData = Sales6month.map((item) => ({
  location: item.location,
  total_sales: parseFloat(item.Total_Sales),
}));

// Set currentData to allTimeData initially
let currentData = allTimeData;

const ctx = document.getElementById("barchart").getContext("2d");

let barChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: currentData.map((item) => item.location),
    datasets: [
      {
        label: "Total Sales",
        data: currentData.map((item) => item.total_sales),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1.5,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

document
  .getElementById("categoryFilter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    updateChartData(selectedCategory);
  });

function updateChartData(category) {
  console.log("Selected Category:", category);

  if (category === "alltime") {
    currentData = allTimeData;
  } else if (category === "sixmonth") {
    currentData = sixMonthData;
  }

  console.log("Current Data:", currentData);

  barChart.data.labels = currentData.map((item) => item.location);
  barChart.data.datasets[0].data = currentData.map((item) => item.total_sales);
  barChart.update();
}

function updateChart(order) {
  if (order === "asc") {
    currentData.sort((a, b) => a.total_sales - b.total_sales);
  } else {
    currentData.sort((a, b) => b.total_sales - a.total_sales);
  }

  barChart.data.labels = currentData.map((item) => item.location);
  barChart.data.datasets[0].data = currentData.map((item) => item.total_sales);
  barChart.update();
}

document
  .getElementById("sortAsc")
  .addEventListener("click", () => updateChart("asc"));
document
  .getElementById("sortDesc")
  .addEventListener("click", () => updateChart("desc"));

// Set the dropdown to "All Time" by default
document.getElementById("categoryFilter").value = "alltime";
