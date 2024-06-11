import PaymentMethodPercentage from "../Json/PaymentMethodPercentage.json" assert { type: "json" };
import PaymentMethodSixMonth from "../Json/PaymentMethodSixMonth.json" assert { type: "json" };

const allTimeData5 = PaymentMethodPercentage.map((item) => ({
  type: item.type,
  Total_Sales: parseFloat(item.Total_Sales),
}));

const sixMonthData5 = PaymentMethodSixMonth.map((item) => ({
  type: item.type,
  Total_Sales: parseFloat(item.Total_Sales),
}));

let allTimeCurrentData5 = allTimeData5;
let sixMonthCurrentData5 = sixMonthData5;

let currentData5 = allTimeCurrentData5;

const ctx = document.getElementById("paymentMethodPieChart").getContext("2d");

// Fungsi untuk mendapatkan warna biru secara berurutan
function getBlueShades() {
  const blueShades = ["#050C9C", "#A7E6FF"];

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

// Membuat array warna untuk setiap metode pembayaran
const backgroundColors = allTimeData5.map(() => getNextBlueShade());

let pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: currentData5.map((item) => item.type),
    datasets: [
      {
        data: currentData5.map((item) => item.Total_Sales),
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
function updateChart5(data) {
  pieChart.data.labels = data.map((item) => item.type);
  pieChart.data.datasets[0].data = data.map((item) => item.Total_Sales);
  pieChart.update();
}

// Panggil fungsi untuk memperbarui chart saat halaman dimuat
updateChart5(allTimeCurrentData5);

// Event listener untuk dropdown
document
  .getElementById("categoryFilter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "alltime") {
      currentData5 = allTimeCurrentData5; // Set data yang sedang ditampilkan menjadi data all time
      updateChart5(allTimeCurrentData5); // Memuat lima produk teratas dari data semua waktu
    } else if (selectedCategory === "sixmonth") {
      currentData5 = sixMonthCurrentData5; // Set data yang sedang ditampilkan menjadi data enam bulan
      updateChart5(sixMonthCurrentData5); // Memuat lima produk teratas dari data enam bulan
    }
  });
