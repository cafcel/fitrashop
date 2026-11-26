/* pesanan saya */

var user = wajibMasuk();
var saring = "semua";
var daftarEl = document.getElementById("daftar-pesanan");
var kosongEl = document.getElementById("pesanan-kosong");

function tampilkan() {
  var semua = pesananSaya(user.email);
  var hasil = semua.filter(function (p) {
    if (saring === "jalan") return p.status < 5;
    if (saring === "selesai") return p.status === 5;
    return true;
  });

  kosongEl.hidden = hasil.length > 0;
  if (semua.length > 0 && hasil.length === 0) kosongEl.querySelector("p").textContent = "Tidak ada pesanan di kategori ini.";

  daftarEl.innerHTML = hasil.map(function (p) {
    var foto = p.item.slice(0, 3).map(function (it) {
      return '<img src="' + fotoProduk(it.gambar) + '" alt="' + it.nama + '">';
    }).join("");
    var jumlah = p.item.reduce(function (t, it) { return t + it.jumlah; }, 0);

    return '<a href="detail-pesanan.html?kode=' + p.kode + '" class="kartu-pesanan">' +
      '<div class="kp-atas"><b>#' + p.kode + '</b><span class="status ' + labelStatusKelas(p) + '">' + labelStatusTeks(p) + '</span></div>' +
      '<div class="kp-isi"><div class="kp-foto">' + foto + '</div>' +
      '<div class="kp-info"><span>' + p.item[0].nama + (p.item.length > 1 ? ' dan ' + (p.item.length - 1) + ' lainnya' : '') + '</span>' +
      '<small>' + jumlah + ' barang · ' + tanggalLengkap(p.dibuat) + '</small></div>' +
      '<div class="kp-total"><small>Total</small><b>' + rupiah(p.total) + '</b></div></div></a>';
  }).join("");
}

document.getElementById("tab-pesanan").addEventListener("click", function (e) {
  var tombol = e.target.closest("button");
  if (!tombol) return;
  saring = tombol.dataset.saring;
  this.querySelectorAll("button").forEach(function (b) { b.classList.toggle("aktif", b === tombol); });
  tampilkan();
});

if (user) tampilkan();
