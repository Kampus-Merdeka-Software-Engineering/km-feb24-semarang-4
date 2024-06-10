// Menunggu sampai seluruh konten DOM dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Mengambil data dari file JSON
  fetch("./datavending.json")
    .then((res) => res.json()) // Mengubah respons menjadi format JSON
    .then((data) => {
      console.log(data);
      // DataTables
      let tableBody = document.getElementById("product-table-body"); // Mendapatkan elemen tbody dari tabel produk

      // Mengisi tabel dengan data dari file JSON
      data.forEach(function (item) {
        let row = document.createElement("tr"); // Membuat elemen baris baru

        // Menambahkan data produk ke dalam baris
        row.innerHTML = `
        <td>${item.Status}</td>
        <td>${item.Location}</td>
        <td>${item.Machine}</td>
        <td>${item.Product}</td>
        <td>${item.Category}</td>
        <td>${item.Transaction}</td>
        <td>${item.TransDate}</td>
        <td>${item.Type}</td>
        `;

        // Menambahkan baris ke dalam tabel
        tableBody.appendChild(row);
      });

      // Menginisialisasi DataTables pada tabel produk
      $("#product-table").DataTable({
        responsive: true
      });
    });
});
