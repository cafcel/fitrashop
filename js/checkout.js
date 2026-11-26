/* checkout */

var user = wajibMasuk();
var isi = ambilKeranjang();

var form = document.getElementById("form-checkout");
var kosong = document.getElementById("checkout-kosong");
var daftarPesan = document.getElementById("daftar-pesan");
var pilihanKirim = document.getElementById("pilihan-kirim");
var pilihanBank = document.getElementById("pilihan-bank");

if (user && isi.length === 0) {
  form.hidden = true;
  kosong.hidden = false;
}

if (user && isi.length > 0) {
  document.getElementById("nama").value = user.nama;
  document.getElementById("telepon").value = user.telepon;
  document.getElementById("alamat").value = user.alamat;
  tampilkanProduk();
  tampilkanOpsi();
  hitungRingkasan();
}

/* produk */
function tampilkanProduk() {
  var html = "";
  isi.forEach(function (item) {
    var p = cariProduk(item.id);
    if (!p) return;
    html += '<div class="baris-produk">' +
      '<img src="' + fotoProduk(p.gambar[0]) + '" alt="' + p.nama + '">' +
      '<div><b>' + p.nama + '</b>' +
      '<small>Ukuran ' + item.ukuran + ' · ' + item.warna + ' · ' + item.jumlah + ' pcs</small>' +
      (item.catatan ? '<small>Catatan: ' + aman(item.catatan) + '</small>' : '') + '</div>' +
      '<span>' + rupiah(p.harga * item.jumlah) + '</span></div>';
  });
  daftarPesan.innerHTML = html;
}

/* pilihan pengiriman dan bank */
function tampilkanOpsi() {
  var html = "";
  PENGIRIMAN.forEach(function (o, i) {
    html += '<label class="opsi"><input type="radio" name="kirim" value="' + o.id + '"' + (i === 1 ? ' checked' : '') + '>' +
      '<span><b>' + o.nama + '</b><small>' + estimasi(o) + ' · ' + o.info + '</small></span>' +
      '<em>' + (o.biaya ? rupiah(o.biaya) : "Gratis") + '</em></label>';
  });
  pilihanKirim.innerHTML = html;

  html = "";
  BANK.forEach(function (b) {
    html += '<label class="opsi"><input type="radio" name="bank" value="' + b.id + '">' +
      '<span><img src="images/' + b.logo + '" alt="' + b.nama + '"></span></label>';
  });
  pilihanBank.innerHTML = html;
}

function nilai(nama) {
  var el = form.querySelector('input[name="' + nama + '"]:checked');
  return el ? el.value : "";
}

/* ringkasan */
function hitungRingkasan() {
  var subtotal = hitungTotalHarga();
  var kirim = cariPengiriman(nilai("kirim"));
  var ongkir = kirim ? kirim.biaya : 0;

  document.getElementById("r-subtotal").textContent = rupiah(subtotal);
  document.getElementById("r-ongkir").textContent = ongkir ? rupiah(ongkir) : "Gratis";
  document.getElementById("r-layanan").textContent = rupiah(BIAYA_LAYANAN);
  document.getElementById("r-total").textContent = rupiah(subtotal + ongkir + BIAYA_LAYANAN);

  var ambil = nilai("kirim") === "ambil";
  document.getElementById("field-alamat").hidden = ambil;
  document.getElementById("info-ambil").hidden = !ambil;
}

form.addEventListener("change", function (e) {
  if (e.target.name === "metode") {
    pilihanBank.hidden = e.target.value !== "transfer";
    document.getElementById("error-bayar").textContent = "";
  }
  if (e.target.name === "bank") document.getElementById("error-bayar").textContent = "";
  hitungRingkasan();
});

/* validasi */
function tandaiSalah(id, pesan) {
  var input = document.getElementById(id);
  input.classList.add("salah");
  input.parentElement.querySelector(".pesan-error").textContent = pesan;
}

function bersihkan() {
  form.querySelectorAll(".salah").forEach(function (i) { i.classList.remove("salah"); });
  form.querySelectorAll(".pesan-error").forEach(function (p) { p.textContent = ""; });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  bersihkan();

  var nama = document.getElementById("nama").value.trim();
  var telepon = document.getElementById("telepon").value.trim();
  var alamat = document.getElementById("alamat").value.trim();
  var kirim = nilai("kirim");
  var metode = nilai("metode");
  var bank = nilai("bank");
  var lolos = true;

  if (nama === "") { tandaiSalah("nama", "Nama wajib diisi."); lolos = false; }
  if (!/^(\+62|62|0)[0-9]{8,13}$/.test(telepon.replace(/[\s-]/g, ""))) {
    tandaiSalah("telepon", "Nomor telepon tidak valid.");
    lolos = false;
  }
  if (kirim !== "ambil" && alamat.length < 10) {
    tandaiSalah("alamat", "Isi alamat lengkap pengiriman.");
    lolos = false;
  }
  if (metode === "") {
    document.getElementById("error-bayar").textContent = "Pilih metode pembayaran.";
    lolos = false;
  } else if (metode === "transfer" && bank === "") {
    document.getElementById("error-bayar").textContent = "Pilih bank tujuan transfer.";
    lolos = false;
  }
  if (!lolos) return;

  var item = isi.map(function (it) {
    var p = cariProduk(it.id);
    return { id: p.id, nama: p.nama, gambar: p.gambar[0], ukuran: it.ukuran, warna: it.warna,
             harga: p.harga, jumlah: it.jumlah, catatan: it.catatan || "" };
  });

  var opsi = cariPengiriman(kirim);
  var pesanan = buatPesanan({
    email: user.email, nama: nama, telepon: telepon,
    alamat: kirim === "ambil" ? opsi.info : alamat,
    item: item, pengiriman: kirim, metode: metode, bank: metode === "transfer" ? bank : "",
    subtotal: hitungTotalHarga(), ongkir: opsi.biaya
  });

  simpanKeranjang([]);
  location.href = "pembayaran.html?kode=" + pesanan.kode;
});
