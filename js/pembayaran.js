/* pembayaran */

var user = wajibMasuk();
var kode = new URLSearchParams(location.search).get("kode");
var pesanan = kode ? cariPesanan(kode) : null;
if (pesanan && user && pesanan.email !== user.email) pesanan = null;

var linkDetail = "detail-pesanan.html?kode=" + kode;

if (user && !pesanan) document.getElementById("tidak-ada").hidden = false;
if (user && pesanan) tampilkan();

/* kotak qr contoh */
function gambarQr(teks) {
  var n = 25, seed = 0, i, x, y;
  for (i = 0; i < teks.length; i++) seed = (seed * 31 + teks.charCodeAt(i)) % 100003;
  function acak() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

  function sudut(x, y) {
    return (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
  }

  var kotak = "";
  for (y = 0; y < n; y++) {
    for (x = 0; x < n; x++) {
      var hitam = false;
      if (sudut(x, y)) {
        var dx = x < 7 ? x : x - (n - 7), dy = y < 7 ? y : y - (n - 7);
        hitam = dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx > 1 && dx < 5 && dy > 1 && dy < 5);
      } else {
        hitam = acak() > 0.52;
      }
      if (hitam) kotak += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    }
  }
  return '<svg viewBox="-1 -1 27 27" class="qr" aria-label="Kode QRIS contoh">' + kotak + '</svg>';
}

function tampilkan() {
  document.getElementById("isi-bayar").hidden = false;
  document.getElementById("b-total").textContent = rupiah(pesanan.total);
  document.getElementById("b-kode").textContent = "Pesanan #" + pesanan.kode;

  var tujuan = document.getElementById("b-tujuan");
  var langkah = [];

  if (pesanan.metode === "transfer") {
    var bank = cariBank(pesanan.bank);
    tujuan.innerHTML = '<div class="bank-nama"><img src="images/' + bank.logo + '" alt="' + bank.nama + '"><b>Bank ' + bank.nama + '</b></div>' +
      '<div class="rekening"><span>Nomor Rekening</span><b id="no-rek">' + bank.rekening + '</b>' +
      '<small>a.n. FITRASHOP</small>' +
      '<button type="button" class="tombol-salin" id="tombol-salin">Salin</button></div>';
    langkah = [
      "Buka aplikasi m-banking atau ATM " + bank.nama + ".",
      "Pilih menu Transfer, lalu pilih rekening " + bank.nama + ".",
      "Masukkan nomor rekening " + bank.rekening + " a.n. FITRASHOP.",
      "Masukkan nominal tepat " + rupiah(pesanan.total) + ".",
      "Periksa data di layar, lalu konfirmasi dengan PIN Anda.",
      "Setelah berhasil, kembali ke halaman ini dan tekan tombol Saya Sudah Bayar."
    ];
  } else {
    tujuan.innerHTML = '<div class="qr-kotak">' + gambarQr(pesanan.kode) + '<small>QRIS FITRASHOP (contoh tampilan)</small></div>';
    langkah = [
      "Buka e-wallet atau m-banking yang mendukung QRIS.",
      "Pilih menu Scan atau Bayar.",
      "Arahkan kamera ke kode QRIS di halaman ini.",
      "Pastikan nama merchant FITRASHOP dan nominal " + rupiah(pesanan.total) + " sudah benar.",
      "Konfirmasi pembayaran dengan PIN Anda.",
      "Setelah berhasil, tekan tombol Saya Sudah Bayar."
    ];
  }

  document.getElementById("b-panduan").innerHTML = langkah.map(function (t) { return "<li>" + t + "</li>"; }).join("");
  document.getElementById("bayar-nanti").href = linkDetail;
  document.getElementById("lihat-status").href = linkDetail;
  tampilkanStatusBayar();

  var salin = document.getElementById("tombol-salin");
  if (salin) {
    salin.addEventListener("click", function () {
      var teks = document.getElementById("no-rek").textContent.replace(/\s/g, "");
      if (navigator.clipboard) navigator.clipboard.writeText(teks);
      salin.textContent = "Tersalin";
      setTimeout(function () { salin.textContent = "Salin"; }, 1800);
    });
  }
}

function tampilkanStatusBayar() {
  document.getElementById("belum-bayar").hidden = pesanan.dibayar;
  document.getElementById("sudah-bayar").hidden = !pesanan.dibayar;
}

document.getElementById("tombol-sudah").addEventListener("click", function () {
  var semua = ambilPesanan();
  semua.forEach(function (p) { if (p.kode === kode) p.dibayar = true; });
  simpanPesanan(semua);
  pesanan.dibayar = true;
  tampilkanStatusBayar();
});
