// Mengimpor data dari file JSON
const SalesPerMonth = [{
  "Location": "GuttenPlans",
  "Bulan": "1",
  "Total_Sales": "462.75"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "1",
  "Total_Sales": "173.0"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "1",
  "Total_Sales": "247.75"
}, {
  "Location": "GuttenPlans",
  "Bulan": "2",
  "Total_Sales": "445.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "2",
  "Total_Sales": "184.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "2",
  "Total_Sales": "279.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "3",
  "Total_Sales": "455.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "3",
  "Total_Sales": "161.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "3",
  "Total_Sales": "262.75"
}, {
  "Location": "EB Public Library",
  "Bulan": "3",
  "Total_Sales": "238.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "4",
  "Total_Sales": "650.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "4",
  "Total_Sales": "117.0"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "4",
  "Total_Sales": "250.25"
}, {
  "Location": "EB Public Library",
  "Bulan": "4",
  "Total_Sales": "601.75"
}, {
  "Location": "GuttenPlans",
  "Bulan": "5",
  "Total_Sales": "506.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "5",
  "Total_Sales": "109.75"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "5",
  "Total_Sales": "338.0"
}, {
  "Location": "EB Public Library",
  "Bulan": "5",
  "Total_Sales": "635.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "6",
  "Total_Sales": "602.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "6",
  "Total_Sales": "120.75"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "6",
  "Total_Sales": "386.25"
}, {
  "Location": "EB Public Library",
  "Bulan": "6",
  "Total_Sales": "705.75"
}, {
  "Location": "GuttenPlans",
  "Bulan": "7",
  "Total_Sales": "906.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "7",
  "Total_Sales": "123.75"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "7",
  "Total_Sales": "373.5"
}, {
  "Location": "EB Public Library",
  "Bulan": "7",
  "Total_Sales": "722.5"
}, {
  "Location": "GuttenPlans",
  "Bulan": "8",
  "Total_Sales": "795.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "8",
  "Total_Sales": "211.25"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "8",
  "Total_Sales": "282.25"
}, {
  "Location": "EB Public Library",
  "Bulan": "8",
  "Total_Sales": "752.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "9",
  "Total_Sales": "588.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "9",
  "Total_Sales": "188.0"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "9",
  "Total_Sales": "192.0"
}, {
  "Location": "EB Public Library",
  "Bulan": "9",
  "Total_Sales": "710.5"
}, {
  "Location": "GuttenPlans",
  "Bulan": "10",
  "Total_Sales": "514.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "10",
  "Total_Sales": "138.25"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "10",
  "Total_Sales": "228.75"
}, {
  "Location": "EB Public Library",
  "Bulan": "10",
  "Total_Sales": "771.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "11",
  "Total_Sales": "555.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "11",
  "Total_Sales": "165.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "11",
  "Total_Sales": "203.75"
}, {
  "Location": "EB Public Library",
  "Bulan": "11",
  "Total_Sales": "607.5"
}, {
  "Location": "GuttenPlans",
  "Bulan": "12",
  "Total_Sales": "423.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "12",
  "Total_Sales": "115.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "12",
  "Total_Sales": "225.5"
}, {
  "Location": "EB Public Library",
  "Bulan": "12",
  "Total_Sales": "602.75"
}];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// Mengonversi bulan dari angka ke nama bulan
SalesPerMonth.forEach((sale) => {
  sale.Bulan = monthNames[parseInt(sale.Bulan) - 1];
});

// Mengelompokkan data berdasarkan lokasi
const locations = [...new Set(SalesPerMonth.map((sale) => sale.Location))];
const dataByLocation = locations.map((location) => {
  return {
    label: location,
    data: SalesPerMonth.filter((sale) => sale.Location === location).map(
      (sale) => ({ x: sale.Bulan, y: parseFloat(sale.Total_Sales) })
    ),
    fill: false,
    borderColor: getRandomBrightColor(), // Fungsi untuk mendapatkan warna terang acak
    tension: 0.1,
  };
});

// Fungsi untuk mendapatkan warna terang acak
function getRandomBrightColor() {
  const letters = "89ABCDEF"; // Menggunakan bagian akhir dari hex untuk warna terang
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const ctx = document.getElementById("linechart").getContext("2d");
const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    datasets: dataByLocation,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Set to false to allow custom dimensions
    scales: {
      x: {
        type: "category",
        labels: monthNames, // Menggunakan nama bulan sebagai label sumbu-x
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});
