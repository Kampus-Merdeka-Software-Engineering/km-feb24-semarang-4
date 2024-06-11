import SixMonthProduct from "../Json/SixMonthProduct.json" assert { type: "json" };
import TopProduct from "../Json/TopProduct.json" assert { type: "json" };

const allTimeData = TopProduct.map((item) => ({
  Product: item.Product,
  total_sales: parseFloat(item.total_sales),
}));

const sixMonthData = SixMonthProduct.map((item) => ({
  Product: item.Product,
  total_sales: parseFloat(item.total_sales),
}));

let allTimeCurrentData = allTimeData.slice(0, 5); // Ambil lima produk teratas dari data semua waktu
let sixMonthCurrentData = sixMonthData.slice(0, 5); // Ambil lima produk teratas dari data enam bulan

let currentData = allTimeCurrentData; // Data yang sedang ditampilkan saat ini

const ctx = document.getElementById("bar").getContext("2d");

let barChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: currentData.map((item) => item.Product),
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
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  },
});

// Fungsi untuk memperbarui chart dengan data yang diberikan
function updateChart(data) {
  barChart.data.labels = data.map((item) => item.Product);
  barChart.data.datasets[0].data = data.map((item) => item.total_sales);
  barChart.update();
}

// Fungsi untuk mengurutkan data secara ascending atau descending
function sortData(order) {
  if (order === "asc") {
    currentData.sort((a, b) => a.total_sales - b.total_sales);
  } else {
    currentData.sort((a, b) => b.total_sales - a.total_sales);
  }
  updateChart(currentData);
}

// Panggil fungsi untuk memperbarui chart saat halaman dimuat
updateChart(allTimeCurrentData);

// Event listener untuk dropdown
document
  .getElementById("categoryFilter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "alltime") {
      currentData = allTimeCurrentData; // Set data yang sedang ditampilkan menjadi data all time
      updateChart(allTimeCurrentData); // Memuat lima produk teratas dari data semua waktu
    } else if (selectedCategory === "sixmonth") {
      currentData = sixMonthCurrentData; // Set data yang sedang ditampilkan menjadi data enam bulan
      updateChart(sixMonthCurrentData); // Memuat lima produk teratas dari data enam bulan
    }
  });

// Event listener untuk ascending button
document
  .getElementById("asc6")
  .addEventListener("click", () => sortData("asc"));

// Event listener untuk descending button
document
  .getElementById("desc6")
  .addEventListener("click", () => sortData("desc"));
