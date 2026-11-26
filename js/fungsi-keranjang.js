/* keranjang (disimpan di localStorage, guest tetap bisa pakai) */

var KUNCI_KERANJANG = "fitrashop_keranjang";

function ambilKeranjang() {
  try { return JSON.parse(localStorage.getItem(KUNCI_KERANJANG)) || []; }
  catch (e) { return []; }
}

function simpanKeranjang(isi) {
  localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(isi));
  perbaruiBadge();
}

function tambahKeKeranjang(item) {
  var isi = ambilKeranjang();
  var produk = cariProduk(item.id);
  var ada = null;

  for (var i = 0; i < isi.length; i++) {
    if (isi[i].id === item.id && isi[i].ukuran === item.ukuran && isi[i].warna === item.warna) {
      ada = isi[i];
    }
  }

  if (ada) {
    ada.jumlah = Math.min(ada.jumlah + item.jumlah, produk.stok);
    if (item.catatan) ada.catatan = item.catatan;
  } else {
    isi.push(item);
  }
  simpanKeranjang(isi);
}

function hapusDariKeranjang(index) {
  var isi = ambilKeranjang();
  isi.splice(index, 1);
  simpanKeranjang(isi);
}

function ubahJumlah(index, jumlah) {
  var isi = ambilKeranjang();
  var produk = cariProduk(isi[index].id);
  isi[index].jumlah = Math.max(1, Math.min(jumlah, produk.stok));
  simpanKeranjang(isi);
}

function hitungJumlahKeranjang() {
  var total = 0;
  ambilKeranjang().forEach(function (i) { total += i.jumlah; });
  return total;
}

function hitungTotalHarga() {
  var total = 0;
  ambilKeranjang().forEach(function (i) {
    var p = cariProduk(i.id);
    if (p) total += p.harga * i.jumlah;
  });
  return total;
}

function perbaruiBadge() {
  var badge = document.getElementById("jumlah-keranjang");
  if (badge) badge.textContent = hitungJumlahKeranjang();
}
