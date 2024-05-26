import SalesPerMonth from "../Json/SalesPerMonth.json" assert {type: "json"};

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Mengonversi bulan dari angka ke nama bulan
SalesPerMonth.forEach(sale => {
  sale.Bulan = monthNames[parseInt(sale.Bulan) - 1];
});

// Mengelompokkan data berdasarkan lokasi
const locations = [...new Set(SalesPerMonth.map(sale => sale.Location))];
const dataByLocation = locations.map(location => {
  return {
    label: location,
    data: SalesPerMonth.filter(sale => sale.Location === location)
                       .map(sale => ({ x: sale.Bulan, y: parseFloat(sale.Total_Sales) })),
    fill: false,
    borderColor: getRandomColor(), // Fungsi untuk mendapatkan warna acak
    tension: 0.1
  };
});

// Fungsi untuk mendapatkan warna acak
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ctx = document.getElementById("linechart").getContext("2d");
const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: dataByLocation
  },
  options: {
    scales: {
      x: {
        type: 'category',
        labels: monthNames // Menggunakan nama bulan sebagai label sumbu-x
      },
      y: {
        beginAtZero: true
      }
    }
  }
});
