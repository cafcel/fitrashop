/* katalog */

var params = new URLSearchParams(location.search);
var kategoriDipilih = params.get("kategori") || "semua";
var kataCari = params.get("cari") || "";
var urutan = "rekomendasi";

var gridProduk = document.getElementById("grid-produk");
var daftarKategori = document.getElementById("daftar-kategori");
var inputCari = document.getElementById("input-cari");
var jumlahHasil = document.getElementById("jumlah-hasil");
var produkKosong = document.getElementById("produk-kosong");

if (!namaKategoriAda(kategoriDipilih)) kategoriDipilih = "semua";
inputCari.value = kataCari;

function namaKategoriAda(id) {
  if (id === "semua") return true;
  return KATEGORI.some(function (k) { return k.id === id; });
}

/* tombol kategori */
function tampilkanKategori() {
  var html = '<button data-kategori="semua"' + (kategoriDipilih === "semua" ? ' class="aktif"' : '') + '>Semua</button>';
  KATEGORI.forEach(function (k) {
    html += '<button data-kategori="' + k.id + '"' + (kategoriDipilih === k.id ? ' class="aktif"' : '') + '>' + k.nama + '</button>';
  });
  daftarKategori.innerHTML = html;
}

daftarKategori.addEventListener("click", function (e) {
  var tombol = e.target.closest("button");
  if (!tombol) return;
  kategoriDipilih = tombol.dataset.kategori;
  tampilkanKategori();
  tampilkanProduk();
});

/* produk */
function tampilkanProduk() {
  var hasil = PRODUK.filter(function (p) {
    var cocokKategori = kategoriDipilih === "semua" || p.kategori === kategoriDipilih;
    var cocokKata = p.nama.toLowerCase().indexOf(kataCari.toLowerCase()) !== -1;
    return cocokKategori && cocokKata;
  });

  if (urutan === "murah") hasil.sort(function (a, b) { return a.harga - b.harga; });
  if (urutan === "mahal") hasil.sort(function (a, b) { return b.harga - a.harga; });
  if (urutan === "rating") hasil.sort(function (a, b) { return b.rating - a.rating; });
  if (urutan === "terbaru") hasil.sort(function (a, b) { return b.id - a.id; });

  var html = "";
  hasil.forEach(function (p) { html += buatKartu(p); });
  gridProduk.innerHTML = html;

  produkKosong.hidden = hasil.length > 0;
  jumlahHasil.textContent = hasil.length + " produk" +
    (kategoriDipilih !== "semua" ? " di " + namaKategori(kategoriDipilih) : "") +
    (kataCari ? ' untuk "' + kataCari + '"' : "");
}

/* pencarian */
document.getElementById("form-cari").addEventListener("submit", function (e) {
  e.preventDefault();
});

inputCari.addEventListener("input", function () {
  kataCari = inputCari.value.trim();
  tampilkanProduk();
});

document.getElementById("urut").addEventListener("change", function (e) {
  urutan = e.target.value;
  tampilkanProduk();
});

document.getElementById("reset-filter").addEventListener("click", function () {
  kategoriDipilih = "semua";
  kataCari = "";
  inputCari.value = "";
  tampilkanKategori();
  tampilkanProduk();
});

pasangTombolSuka(gridProduk);
tampilkanKategori();
tampilkanProduk();
