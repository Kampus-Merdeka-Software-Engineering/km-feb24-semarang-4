import TotalSalesByLocation from "../Json/TotalSalesByLocation.json" assert {type: "json"};

console.log(TotalSalesByLocation);

var salesData = [
  { location: 'EB Public Library', total_sales: 0 },
  { location: 'Brunswick Sq Mall', total_sales: 0 },
  { location: 'Earle Asphalt', total_sales: 0 },
  { location: 'GuttenPlans', total_sales: 0 }
];

for (var i = 0; i < TotalSalesByLocation.length; i++) {
  if (TotalSalesByLocation[i].location == 'EB Public Library') {
    salesData[0].total_sales = TotalSalesByLocation[i].total_sales;
  } else if (TotalSalesByLocation[i].location == 'Brunswick Sq Mall') {
    salesData[1].total_sales = TotalSalesByLocation[i].total_sales;
  } else if (TotalSalesByLocation[i].location == 'Earle Asphalt') {
    salesData[2].total_sales = TotalSalesByLocation[i].total_sales;
  } else if (TotalSalesByLocation[i].location == 'GuttenPlans') {
    salesData[3].total_sales = TotalSalesByLocation[i].total_sales;
  }
}

console.log('Initial salesData:', salesData);

const ctx = document.getElementById("barchart").getContext("2d");

let barChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: salesData.map(item => item.location),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(item => item.total_sales),
        backgroundColor: "yellow",
        borderColor: "black",
        borderWidth: 1.5
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function updateChart(order) {
  // Sort salesData based on the order parameter
  if (order === 'asc') {
    salesData.sort((a, b) => a.total_sales - b.total_sales);
  } else {
    salesData.sort((a, b) => b.total_sales - a.total_sales);
  }

  // Update chart data
  barChart.data.labels = salesData.map(item => item.location);
  barChart.data.datasets[0].data = salesData.map(item => item.total_sales);
  barChart.update();
}

// Event listeners for buttons
document.getElementById("sortAsc").addEventListener("click", () => updateChart('asc'));
document.getElementById("sortDesc").addEventListener("click", () => updateChart('desc'));
