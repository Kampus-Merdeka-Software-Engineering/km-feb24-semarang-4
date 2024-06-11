const navBar = document.querySelector("nav"),
  menuBtns = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});

overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
});

let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
  nav.classList.toggle("navclose");
});

document.addEventListener("DOMContentLoaded", function () {
  // Daily Sales Chart
  var dailySalesCtx = document
    .getElementById("daily-sales-chart")
    .getContext("2d");
  var dailySalesChart = new Chart(dailySalesCtx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      datasets: [
        {
          label: "Daily Sales",
          data: [100, 200, 150, 300, 250],
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
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  // Statistics Chart
  var statisticsCtx = document
    .getElementById("statistics-chart")
    .getContext("2d");
  var statisticsChart = new Chart(statisticsCtx, {
    type: "bar",
    data: {
      labels: [
        "Statistic 1",
        "Statistic 2",
        "Statistic 3",
        "Statistic 4",
        "Statistic 5",
      ],
      datasets: [
        {
          label: "Statistics",
          data: [50, 75, 60, 80, 70],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  // Total Revenue Chart
  var totalRevenueCtx = document
    .getElementById("total-revenue-chart")
    .getContext("2d");
  var totalRevenueChart = new Chart(totalRevenueCtx, {
    type: "pie",
    data: {
      labels: ["Category 1", "Category 2", "Category 3"],
      datasets: [
        {
          label: "Total Revenue",
          data: [300, 200, 400],
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  // AVG Sales Chart
  var avgSalesCtx = document.getElementById("avg-sales-chart").getContext("2d");
  var avgSalesChart = new Chart(avgSalesCtx, {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "AVG SALES",
          backgroundColor: "#77B0AA",
          data: [100, 200, 150, 300, 250, 400, 350],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  // AVG Discount Chart
  var avgDiscountCtx = document
    .getElementById("avg-discount-chart")
    .getContext("2d");
  var avgDiscountChart = new Chart(avgDiscountCtx, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "AVG DISCOUNT",
          borderColor: "#003C43",
          data: [5, 6, 4, 7, 5, 8, 6],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  // Total Sales Chart
  var totalSalesCtx = document
    .getElementById("total-sales-chart")
    .getContext("2d");
  var totalSalesChart = new Chart(totalSalesCtx, {
    type: "pie",
    data: {
      labels: ["Product A", "Product B", "Product C"],
      datasets: [
        {
          label: "Total Sales",
          backgroundColor: ["#e3fef7", "#77B0AA", "#003C43"],
          data: [300, 500, 400],
        },
      ],
    },
  });
});

/*--------TABLE DATA--------*/

// Memuat data JSON
var xmlhttp = new XMLHttpRequest();
var url = "js/data.json"; // Nama file JSON

xmlhttp.open("GET", url, true);
xmlhttp.send();

var data = [];
var filteredData = [];
var currentPage = 1;
var rowsPerPage = 50;

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    filteredData = data;
    console.log("Data berhasil dimuat: ", data);
    displayTableData(currentPage);
    updateButtons();
  } else if (this.readyState == 4) {
    console.log("Gagal memuat data: ", this.status, this.statusText);
  }
};
