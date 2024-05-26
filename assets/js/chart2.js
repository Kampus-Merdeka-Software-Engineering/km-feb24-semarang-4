import PercentageSalesByCategory from "../Json/PercentageSalesByCategory.json" assert {type: "json"};

// Mengonversi data JSON ke format yang sesuai untuk pie chart
const categories = PercentageSalesByCategory.map(item => item.Category);
const totalSales = PercentageSalesByCategory.map(item => parseFloat(item.Total_Sales));

// Fungsi untuk mendapatkan warna acak
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Membuat array warna untuk setiap kategori
const backgroundColors = categories.map(() => getRandomColor());

const ctx = document.getElementById("piechart").getContext("2d");
const pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: totalSales,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toLocaleString()}`
          }
        }
      }
    }
  }
});
