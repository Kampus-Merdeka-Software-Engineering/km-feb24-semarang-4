const SalesPerMonth = [{
  "Location": "Brunswick Sq Mall",
  "Bulan": "1",
  "Total_Sales": "247.75"
}, {
  "Location": "GuttenPlans",
  "Bulan": "1",
  "Total_Sales": "462.75"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "1",
  "Total_Sales": "173.0"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "2",
  "Total_Sales": "279.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "2",
  "Total_Sales": "445.0"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "2",
  "Total_Sales": "184.5"
}, {
  "Location": "EB Public Library",
  "Bulan": "3",
  "Total_Sales": "244.25"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "3",
  "Total_Sales": "262.75"
}, {
  "Location": "GuttenPlans",
  "Bulan": "3",
  "Total_Sales": "466.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "3",
  "Total_Sales": "161.5"
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
  "Bulan": "4",
  "Total_Sales": "653.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "4",
  "Total_Sales": "117.0"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "5",
  "Total_Sales": "338.0"
}, {
  "Location": "EB Public Library",
  "Bulan": "5",
  "Total_Sales": "691.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "5",
  "Total_Sales": "516.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "5",
  "Total_Sales": "109.75"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "6",
  "Total_Sales": "423.75"
}, {
  "Location": "EB Public Library",
  "Bulan": "6",
  "Total_Sales": "855.75"
}, {
  "Location": "GuttenPlans",
  "Bulan": "6",
  "Total_Sales": "624.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "6",
  "Total_Sales": "120.75"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "7",
  "Total_Sales": "441.0"
}, {
  "Location": "EB Public Library",
  "Bulan": "7",
  "Total_Sales": "800.5"
}, {
  "Location": "GuttenPlans",
  "Bulan": "7",
  "Total_Sales": "915.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "7",
  "Total_Sales": "123.75"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "8",
  "Total_Sales": "296.25"
}, {
  "Location": "EB Public Library",
  "Bulan": "8",
  "Total_Sales": "796.25"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "8",
  "Total_Sales": "211.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "8",
  "Total_Sales": "806.0"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "9",
  "Total_Sales": "204.5"
}, {
  "Location": "EB Public Library",
  "Bulan": "9",
  "Total_Sales": "766.5"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "9",
  "Total_Sales": "188.0"
}, {
  "Location": "GuttenPlans",
  "Bulan": "9",
  "Total_Sales": "594.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "10",
  "Total_Sales": "233.75"
}, {
  "Location": "EB Public Library",
  "Bulan": "10",
  "Total_Sales": "799.25"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "10",
  "Total_Sales": "138.25"
}, {
  "Location": "GuttenPlans",
  "Bulan": "10",
  "Total_Sales": "521.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "11",
  "Total_Sales": "217.25"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "11",
  "Total_Sales": "179.5"
}, {
  "Location": "EB Public Library",
  "Bulan": "11",
  "Total_Sales": "651.5"
}, {
  "Location": "GuttenPlans",
  "Bulan": "11",
  "Total_Sales": "576.5"
}, {
  "Location": "Brunswick Sq Mall",
  "Bulan": "12",
  "Total_Sales": "233.5"
}, {
  "Location": "EB Public Library",
  "Bulan": "12",
  "Total_Sales": "626.75"
}, {
  "Location": "Earle Asphalt",
  "Bulan": "12",
  "Total_Sales": "120.0"
}, {
  "Location": "GuttenPlans",
  "Bulan": "12",
  "Total_Sales": "423.0"
}]

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
