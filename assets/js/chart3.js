import PercentageSalesByMachine from "../Json/PercentageSalesByMachine.json" assert {type: "json"};
import SalesByMachineSixMonth from "../Json/SalesByMachineSixMonth.json" assert {type: "json"};

const allTimeData4 = PercentageSalesByMachine.map(item => ({
  Machine: item.Machine,
  Total_Sales: parseFloat(item.Total_Sales)
}));

const sixMonthData4 = SalesByMachineSixMonth.map(item => ({
  Machine: item.Machine,
  Total_Sales: parseFloat(item.Total_Sales)
}));

let allTimeCurrentData4 = allTimeData4;
let sixMonthCurrentData4 = sixMonthData4;

let currentData4 = allTimeCurrentData4;

const ctx = document.getElementById("machinePieChart").getContext("2d");

// Fungsi untuk mendapatkan warna acak
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Membuat array warna untuk setiap mesin
const backgroundColors = allTimeData4.map(() => getRandomColor());

let pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: currentData4.map(item => item.Machine),
    datasets: [
      {
        data: currentData4.map(item => item.Total_Sales),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1
      }
    ]
  }
});

// Fungsi untuk memperbarui chart dengan data yang diberikan
function updateChart4(data) {
  pieChart.data.labels = data.map(item => item.Machine);
  pieChart.data.datasets[0].data = data.map(item => item.Total_Sales);
  pieChart.update();
}

// Panggil fungsi untuk memperbarui chart saat halaman dimuat
updateChart4(allTimeCurrentData4);

// Event listener untuk dropdown
document.getElementById("categoryFilter").addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  if (selectedCategory === "alltime") {
    currentData4 = allTimeCurrentData4; // Set data yang sedang ditampilkan menjadi data all time
    updateChart4(allTimeCurrentData4); // Memuat lima produk teratas dari data semua waktu
  } else if (selectedCategory === "sixmonth") {
    currentData4 = sixMonthCurrentData4; // Set data yang sedang ditampilkan menjadi data enam bulan
    updateChart4(sixMonthCurrentData4); // Memuat lima produk teratas dari data enam bulan
  }
});