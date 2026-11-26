/* beranda pelanggan */

var user = ambilPengguna();
if (!user) location.replace("index.html");

if (user) {
  document.getElementById("sapa-nama").textContent = "Halo, " + user.nama.split(" ")[0] + "!";
  document.getElementById("info-keranjang").textContent = hitungJumlahKeranjang();

  var berjalan = pesananSaya(user.email).filter(function (p) { return p.status < 5; }).length;
  document.getElementById("info-pesanan").textContent = berjalan;
}

/* produk */
var gridProduk = document.getElementById("grid-produk");
var html = "";
PRODUK.slice(0, 8).forEach(function (p) { html += buatKartu(p); });
gridProduk.innerHTML = html;
pasangTombolSuka(gridProduk);
