/* halaman keranjang */

var daftar = document.getElementById("daftar-keranjang");
var infoMasuk = document.getElementById("info-masuk");

function infoUkuran(produk, nama) {
  for (var i = 0; i < produk.ukuran.length; i++) {
    if (produk.ukuran[i].nama === nama) return nama + " (" + produk.ukuran[i].info + ")";
  }
  return nama;
}

function tampilkan() {
  var isi = ambilKeranjang();
  var ada = isi.length > 0;

  document.getElementById("keranjang").hidden = !ada;
  document.getElementById("keranjang-kosong").hidden = ada;
  if (!ada) {
    daftar.innerHTML = "";
    return;
  }

  var html = "";
  isi.forEach(function (item, index) {
    var p = cariProduk(item.id);
    if (!p) return;
    var link = "produk.html?id=" + p.id;

    html += '<article class="item" data-index="' + index + '">' +
      '<a href="' + link + '" class="item-foto"><img src="' + fotoProduk(p.gambar[0]) + '" alt="' + p.nama + '"></a>' +
      '<div class="item-info">' +
        '<a href="' + link + '" class="item-nama">' + p.nama + '</a>' +
        '<p class="item-varian">Ukuran ' + infoUkuran(p, item.ukuran) + ' · ' + item.warna + '</p>' +
        '<p class="item-harga">' + rupiah(p.harga) + '</p>' +
        (item.catatan ? '<p class="item-catatan">Catatan: ' + item.catatan + '</p>' : '') +
      '</div>' +
      '<div class="stepper">' +
        '<button data-aksi="kurang" aria-label="Kurangi">−</button>' +
        '<input value="' + item.jumlah + '" readonly aria-label="Jumlah">' +
        '<button data-aksi="tambah" aria-label="Tambah">+</button>' +
      '</div>' +
      '<p class="item-total">' + rupiah(p.harga * item.jumlah) + '</p>' +
      '<button class="item-hapus" data-aksi="hapus" aria-label="Hapus"><svg class="ikon"><use href="#ikon-hapus"/></svg></button>' +
    '</article>';
  });
  daftar.innerHTML = html;

  document.getElementById("teks-jumlah").textContent = "Subtotal (" + hitungJumlahKeranjang() + " barang)";
  document.getElementById("subtotal").textContent = rupiah(hitungTotalHarga());
  document.getElementById("total").textContent = rupiah(hitungTotalHarga());
}

daftar.addEventListener("click", function (e) {
  var tombol = e.target.closest("button[data-aksi]");
  if (!tombol) return;

  var index = Number(tombol.closest(".item").dataset.index);
  var item = ambilKeranjang()[index];

  if (tombol.dataset.aksi === "kurang") ubahJumlah(index, item.jumlah - 1);
  if (tombol.dataset.aksi === "tambah") ubahJumlah(index, item.jumlah + 1);
  if (tombol.dataset.aksi === "hapus") hapusDariKeranjang(index);
  tampilkan();
});

/* checkout */
document.getElementById("tombol-checkout").addEventListener("click", function () {
  infoMasuk.hidden = false;

  if (!ambilPengguna()) {
    infoMasuk.textContent = "Silakan masuk dulu untuk melanjutkan checkout.";
    localStorage.setItem("fitrashop_setelah_login", "checkout.html");
    setTimeout(function () { location.href = "login.html"; }, 1200);
  } else {
    location.href = "checkout.html";
  }
});

tampilkan();
