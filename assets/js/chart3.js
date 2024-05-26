import PercentageSalesByMachine from "../Json/PercentageSalesByMachine.json" assert {type: "json"};

// Mengonversi data JSON ke format yang sesuai untuk pie chart
const machines = PercentageSalesByMachine.map(item => item.Machine);
const totalSales = PercentageSalesByMachine.map(item => parseFloat(item.Total_Sales));

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
const backgroundColors = machines.map(() => getRandomColor());

const ctx = document.getElementById("machinePieChart").getContext("2d");
const pieChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: machines,
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
