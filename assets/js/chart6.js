import TopProduct from "../Json/TopProduct.json" assert {type: "json"};

console.log(TopProduct);

function createChart(data) {
  const ctx = document.getElementById("bar").getContext("2d");
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map(item => item.Product),
      datasets: [
        {
          label: 'Total Sales',
          data: data.map(item => parseFloat(item.total_sales)),
          backgroundColor: "yellow",
          borderColor: "black",
          borderWidth: 1.5
        }
      ]
    },
    options: {
      indexAxis: 'y', // Menampilkan chart secara horizontal
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}

// Mengonversi dan mengurutkan data berdasarkan total_sales
let sortedData = TopProduct.map(item => ({
  Product: item.Product,
  total_sales: parseFloat(item.total_sales)
}));

// Ambil 5 produk dengan total sales tertinggi
sortedData.sort((a, b) => b.total_sales - a.total_sales);
let top5Data = sortedData.slice(0, 5);

// Buat chart pertama kali
let barChart = createChart(top5Data);

function updateChart(order) {
  // Urutkan data berdasarkan total_sales
  if (order === 'asc') {
    top5Data.sort((a, b) => a.total_sales - b.total_sales);
  } else {
    top5Data.sort((a, b) => b.total_sales - a.total_sales);
  }

  // Update chart data
  barChart.data.labels = top5Data.map(item => item.Product);
  barChart.data.datasets[0].data = top5Data.map(item => item.total_sales);
  barChart.update();
}

// Event listeners for buttons
document.getElementById("asc6").addEventListener("click", () => updateChart('asc'));
document.getElementById("desc6").addEventListener("click", () => updateChart('desc'));
