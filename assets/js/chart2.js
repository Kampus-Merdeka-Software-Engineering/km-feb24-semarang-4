const PercentageSalesByCategory = [{
  "Category": "Food",
  "Total_Sales": "9376.75"
}, {
  "Category": "Carbonated",
  "Total_Sales": "5051.25"
}, {
  "Category": "Non Carbonated",
  "Total_Sales": "2681.5"
}, {
  "Category": "Water",
  "Total_Sales": "1221.25"
}]

const PercentageSalesSixMonth = [{
  "type": "Cash",
  "Total_Sales": "5121.5"
}, {
  "type": "Credit",
  "Total_Sales": "2811.5"
}]

const allTimeData6 = PercentageSalesByCategory.map((item) => ({
  Category: item.Category,
  Total_Sales: parseFloat(item.Total_Sales),
}));

const sixMonthData6 = PercentageSalesSixMonth.map((item) => ({
  Category: item.Category,
  Total_Sales: parseFloat(item.Total_Sales),
}));

let allTimeCurrentData6 = allTimeData6;
let sixMonthCurrentData6 = sixMonthData6;

let currentData6 = allTimeCurrentData6;

const ctx = document.getElementById("piechart").getContext("2d");

// Fungsi untuk mendapatkan warna biru secara berurutan
function getBlueShades() {
  const blueShades = ["#050C9C", "#3572EF", "#3ABEF9", "#A7E6FF"];

  let currentIndex = 0;

  return function () {
    if (currentIndex >= blueShades.length) {
      currentIndex = 0;
    }
    return blueShades[currentIndex++];
  };
}

// Inisialisasi fungsi untuk mendapatkan warna berikutnya
const getNextBlueShade = getBlueShades();

// Membuat array warna untuk setiap mesin
const backgroundColors = allTimeData6.map(() => getNextBlueShade());

let pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: currentData6.map((item) => item.Category),
    datasets: [
      {
        data: currentData6.map((item) => item.Total_Sales),
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
        borderWidth: 1,
      },
    ],
  },
});

// Fungsi untuk memperbarui chart dengan data yang diberikan
function updateChart6(data) {
  pieChart.data.labels = data.map((item) => item.Category);
  pieChart.data.datasets[0].data = data.map((item) => item.Total_Sales);
  pieChart.update();
}

// Panggil fungsi untuk memperbarui chart saat halaman dimuat
updateChart6(allTimeCurrentData6);

// Event listener untuk dropdown
document
  .getElementById("categoryFilter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "alltime") {
      currentData6 = allTimeCurrentData6; // Set data yang sedang ditampilkan menjadi data all time
      updateChart6(allTimeCurrentData6); // Memuat lima produk teratas dari data semua waktu
    } else if (selectedCategory === "sixmonth") {
      currentData6 = sixMonthCurrentData6; // Set data yang sedang ditampilkan menjadi data enam bulan
      updateChart6(sixMonthCurrentData6); // Memuat lima produk teratas dari data enam bulan
    }
  });
