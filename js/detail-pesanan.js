/* detail pesanan */

var user = wajibMasuk();
var kode = new URLSearchParams(location.search).get("kode");
var pesanan = kode ? cariPesanan(kode) : null;
if (pesanan && user && pesanan.email !== user.email) pesanan = null;

if (user && !pesanan) document.getElementById("tidak-ada").hidden = false;
if (user && pesanan) tampilkan();

function isi(id, teks) { document.getElementById(id).textContent = teks; }

function tampilkan() {
  document.getElementById("isi-detail").hidden = false;
  isi("d-kode", "Pesanan #" + pesanan.kode);
  isi("d-tanggal", "Dibuat " + tanggalLengkap(pesanan.dibuat));

  var status = document.getElementById("d-status");
  status.textContent = labelStatusTeks(pesanan);
  status.className = "status " + labelStatusKelas(pesanan);

  /* garis waktu */
  var html = "";
  for (var i = 0; i < 6; i++) {
    var kelas = i < pesanan.status ? "selesai" : (i === pesanan.status ? "sekarang" : "");
    html += '<li class="' + kelas + '"><span class="titik"></span><div><b>' + namaTahap(pesanan, i) + '</b>' +
      '<small>' + (pesanan.waktu[i] ? tanggalLengkap(pesanan.waktu[i]) : "Belum dimulai") + '</small></div></li>';
  }
  document.getElementById("d-waktu").innerHTML = html;

  /* produk */
  document.getElementById("d-produk").innerHTML = pesanan.item.map(function (it) {
    return '<a href="produk.html?id=' + it.id + '" class="baris-produk">' +
      '<img src="' + fotoProduk(it.gambar) + '" alt="' + it.nama + '">' +
      '<div><b>' + it.nama + '</b><small>Ukuran ' + it.ukuran + ' · ' + it.warna + ' · ' + it.jumlah + ' pcs</small>' +
      (it.catatan ? '<small>Catatan: ' + aman(it.catatan) + '</small>' : '') + '</div>' +
      '<span>' + rupiah(it.harga * it.jumlah) + '</span></a>';
  }).join("");

  /* pengiriman */
  var kirim = cariPengiriman(pesanan.pengiriman);
  isi("d-judul-alamat", pesanan.pengiriman === "ambil" ? "Pengambilan" : "Pengiriman");
  isi("d-nama", pesanan.nama);
  isi("d-telepon", pesanan.telepon);
  isi("d-alamat", pesanan.alamat);
  isi("d-kirim", kirim.nama + " · estimasi " + estimasi(kirim));

  /* pembayaran */
  isi("d-subtotal", rupiah(pesanan.subtotal));
  isi("d-ongkir", pesanan.ongkir ? rupiah(pesanan.ongkir) : "Gratis");
  isi("d-layanan", rupiah(pesanan.layanan));
  isi("d-total", rupiah(pesanan.total));
  isi("d-metode", pesanan.metode === "qris" ? "Metode: QRIS" : "Metode: Transfer " + cariBank(pesanan.bank).nama);

  var tombol = document.getElementById("d-bayar");
  tombol.hidden = pesanan.dibayar;
  tombol.href = "pembayaran.html?kode=" + pesanan.kode;
}
