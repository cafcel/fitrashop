/* data produk & fungsi bersama */

var KATEGORI = [
  { id: "atasan",  nama: "Atasan" },
  { id: "bawahan", nama: "Bawahan" },
  { id: "outer",   nama: "Outer" },
  { id: "dress-tunik", nama: "Dress & Tunik" }
];

/* ukuran */
var UKURAN_ATAS = [
  { nama: "S", info: "LD 92" }, { nama: "M", info: "LD 96" },
  { nama: "L", info: "LD 102" }, { nama: "XL", info: "LD 108" }
];
var UKURAN_WANITA = [
  { nama: "S", info: "LD 86" }, { nama: "M", info: "LD 90" },
  { nama: "L", info: "LD 96" }, { nama: "XL", info: "LD 102" }
];
var UKURAN_CELANA = [
  { nama: "28", info: "LP 72" }, { nama: "30", info: "LP 78" },
  { nama: "32", info: "LP 84" }, { nama: "34", info: "LP 90" }
];
var UKURAN_ROK = [
  { nama: "S", info: "LP 66" }, { nama: "M", info: "LP 70" },
  { nama: "L", info: "LP 76" }, { nama: "XL", info: "LP 82" }
];

/* warna */
var WARNA = {
  "Cream": "#e6dccb", "Krem": "#eadfca", "Putih": "#ffffff", "Hitam": "#111111",
  "Abu": "#8a8580", "Cokelat": "#6b4a35", "Biru": "#35567a",
  "Hijau": "#7d8467", "Ungu": "#7b4a68"
};

var PRODUK = [
  {
    id: 1, nama: "Textured Short Sleeve Shirt", kategori: "atasan", label: "Kemeja Pria",
    bahan: "Katun Tebal", harga: 100000, hargaAsli: 150000, rating: 4.9, ulasan: 128, stok: 8,
    warna: ["Cream", "Putih", "Hitam"], ukuran: UKURAN_ATAS, gambar: ["kemeja-1.jpg", "kemeja-2.jpg"],
    deskripsi: "Kemeja lengan pendek bertekstur dengan gaya kasual dan elegan. Berbahan katun tebal yang tetap nyaman dipakai sehari-hari."
  },
  {
    id: 2, nama: "Celana Cargo Pria", kategori: "bawahan", label: "Celana Pria",
    bahan: "Katun Twill", harga: 200000, hargaAsli: 0, rating: 4.8, ulasan: 95, stok: 12,
    warna: ["Abu", "Hitam", "Cokelat"], ukuran: UKURAN_CELANA, gambar: ["cargo.jpg"],
    deskripsi: "Celana cargo dengan saku samping yang praktis. Potongan lurus dan bahan twill yang kuat untuk aktivitas harian."
  },
  {
    id: 3, nama: "Polo Rajut Pria", kategori: "atasan", label: "Polo Shirt",
    bahan: "Rajut Premium", harga: 149000, hargaAsli: 0, rating: 4.8, ulasan: 95, stok: 15,
    warna: ["Putih", "Cream"], ukuran: UKURAN_ATAS, gambar: ["polo-rajut.jpg"],
    deskripsi: "Polo rajut bertekstur dengan kerah kontras dan resleting pendek. Mudah dipadukan untuk tampilan kasual maupun semi formal."
  },
  {
    id: 4, nama: "Jaket Batik Cokelat", kategori: "outer", label: "Outer Batik",
    bahan: "Batik Pilihan", harga: 349000, hargaAsli: 0, rating: 4.9, ulasan: 41, stok: 3,
    warna: ["Cokelat"], ukuran: UKURAN_ATAS, gambar: ["jaket-batik.jpg"],
    deskripsi: "Jaket dengan motif batik modern berwarna cokelat. Tampilan etnik yang tetap elegan untuk berbagai kesempatan."
  },
  {
    id: 5, nama: "Dress Satin One Shoulder", kategori: "dress-tunik", label: "Dress Wanita",
    bahan: "Satin Premium", harga: 359000, hargaAsli: 399000, rating: 4.8, ulasan: 52, stok: 6,
    warna: ["Cream"], ukuran: UKURAN_WANITA, gambar: ["dress-satin.jpg"],
    deskripsi: "Dress satin panjang dengan potongan satu bahu. Jatuh lembut dan cocok untuk acara spesial."
  },
  {
    id: 6, nama: "Tunik Putih Panjang", kategori: "dress-tunik", label: "Tunik Wanita",
    bahan: "Katun Adem", harga: 219000, hargaAsli: 0, rating: 4.7, ulasan: 58, stok: 14,
    warna: ["Putih"], ukuran: UKURAN_WANITA, gambar: ["tunik-putih.jpg"],
    deskripsi: "Tunik putih panjang dengan kerah tinggi dan potongan miring yang rapi. Nyaman dan sopan untuk kerja maupun acara."
  },
  {
    id: 7, nama: "Celana Kulot Pleats", kategori: "bawahan", label: "Celana Wanita",
    bahan: "Bahan Adem", harga: 179000, hargaAsli: 0, rating: 4.8, ulasan: 120, stok: 10,
    warna: ["Krem", "Hitam"], ukuran: UKURAN_ROK, gambar: ["kulot.jpg"],
    deskripsi: "Celana kulot dengan lipit memanjang yang jatuh dan nyaman. Ringan dipakai seharian."
  },
  {
    id: 8, nama: "Trench Coat Krem", kategori: "outer", label: "Outer Wanita",
    bahan: "Bahan Premium", harga: 329000, hargaAsli: 389000, rating: 4.8, ulasan: 36, stok: 6,
    warna: ["Cream", "Cokelat"], ukuran: UKURAN_WANITA, gambar: ["trench-krem.jpg"],
    deskripsi: "Trench coat kancing ganda dengan pinggang yang mempertegas siluet. Rapi untuk kerja dan acara resmi."
  },
  {
    id: 9, nama: "Blouse Kerah Berkancing", kategori: "atasan", label: "Blouse Wanita",
    bahan: "Bahan Premium", harga: 169000, hargaAsli: 0, rating: 4.7, ulasan: 64, stok: 7,
    warna: ["Putih"], ukuran: UKURAN_WANITA, gambar: ["blouse.jpg"],
    deskripsi: "Blouse putih berkerah tinggi dengan kancing emas. Elegan untuk kerja maupun acara."
  },
  {
    id: 10, nama: "Blazer Batik Biru", kategori: "outer", label: "Outer Batik",
    bahan: "Batik Pilihan", harga: 379000, hargaAsli: 0, rating: 4.7, ulasan: 37, stok: 5,
    warna: ["Biru"], ukuran: UKURAN_WANITA, gambar: ["blazer-batik.jpg"],
    deskripsi: "Blazer batik biru dengan kombinasi cokelat. Cocok untuk acara resmi dengan sentuhan tradisional."
  },
  {
    id: 11, nama: "Dress Putih Kerah Berkancing", kategori: "dress-tunik", label: "Dress Wanita",
    bahan: "Bahan Premium", harga: 289000, hargaAsli: 329000, rating: 4.8, ulasan: 95, stok: 6,
    warna: ["Putih", "Cream"], ukuran: UKURAN_WANITA, gambar: ["dress-putih.jpg"],
    deskripsi: "Dress putih berkerah dengan kancing ganda di depan. Bersih, rapi, dan nyaman dipakai seharian."
  },
  {
    id: 12, nama: "Rok Cargo Mini", kategori: "bawahan", label: "Rok",
    bahan: "Katun Twill", harga: 159000, hargaAsli: 0, rating: 4.9, ulasan: 87, stok: 9,
    warna: ["Cokelat", "Hitam"], ukuran: UKURAN_ROK, gambar: ["rok-cargo.jpg"],
    deskripsi: "Rok mini dengan saku cargo dan sabuk. Memberi kesan kasual yang tetap rapi."
  },
  {
    id: 13, nama: "Oversized Tee Santa Monica", kategori: "atasan", label: "Kaus Wanita",
    bahan: "Katun Combed", harga: 119000, hargaAsli: 149000, rating: 4.7, ulasan: 76, stok: 20,
    warna: ["Putih"], ukuran: UKURAN_WANITA, gambar: ["tee-santa.jpg"],
    deskripsi: "Kaus oversize dengan sablon tulisan di depan. Bahan katun halus dan jatuh nyaman."
  },
  {
    id: 14, nama: "Tunik Ungu Kancing", kategori: "dress-tunik", label: "Tunik Wanita",
    bahan: "Crinkle", harga: 199000, hargaAsli: 0, rating: 4.6, ulasan: 33, stok: 8,
    warna: ["Ungu"], ukuran: UKURAN_WANITA, gambar: ["tunik-ungu.jpg"],
    deskripsi: "Tunik panjang berkancing dengan lengan panjang. Warna ungu lembut yang mudah dipadukan."
  },
  {
    id: 15, nama: "Jaket Wool Abu", kategori: "outer", label: "Outer Pria",
    bahan: "Wool Blend", harga: 399000, hargaAsli: 0, rating: 4.8, ulasan: 29, stok: 5,
    warna: ["Abu"], ukuran: UKURAN_ATAS, gambar: ["jaket-wool.jpg"],
    deskripsi: "Jaket wool abu dengan kerah rapi dan dua saku depan. Hangat dan pas untuk tampilan formal."
  },
  {
    id: 16, nama: "Dress Floral Lace", kategori: "dress-tunik", label: "Dress Wanita",
    bahan: "Lace", harga: 319000, hargaAsli: 0, rating: 4.7, ulasan: 41, stok: 7,
    warna: ["Cream"], ukuran: UKURAN_WANITA, gambar: ["dress-floral.jpg"],
    deskripsi: "Dress lace motif floral dengan kancing depan dan rok mengembang. Manis dan elegan."
  },
  {
    id: 17, nama: "Rok Midi Krem", kategori: "bawahan", label: "Rok",
    bahan: "Wool Blend", harga: 189000, hargaAsli: 0, rating: 4.7, ulasan: 44, stok: 10,
    warna: ["Krem"], ukuran: UKURAN_ROK, gambar: ["rok-midi.jpg"],
    deskripsi: "Rok midi krem dengan detail lipatan di pinggang. Jatuh anggun dan mudah dipadukan."
  },
  {
    id: 18, nama: "Polo Tee Stay Focused", kategori: "atasan", label: "Kaus Pria",
    bahan: "Katun Combed", harga: 129000, hargaAsli: 0, rating: 4.6, ulasan: 52, stok: 18,
    warna: ["Hitam"], ukuran: UKURAN_ATAS, gambar: ["tee-polo-hitam.jpg"],
    deskripsi: "Kaus kerah V dengan list putih dan bordir kecil di dada. Gaya sporty yang tetap rapi."
  },
  {
    id: 19, nama: "Blazer Sage", kategori: "outer", label: "Outer Wanita",
    bahan: "Bahan Premium", harga: 359000, hargaAsli: 0, rating: 4.8, ulasan: 31, stok: 6,
    warna: ["Hijau"], ukuran: UKURAN_WANITA, gambar: ["blazer-sage.jpg"],
    deskripsi: "Blazer warna sage dengan kerah lebar dan potongan pas badan. Pilihan tepat untuk tampilan kerja."
  },
  {
    id: 20, nama: "Tunik Hijab Putih", kategori: "dress-tunik", label: "Tunik Wanita",
    bahan: "Katun Adem", harga: 229000, hargaAsli: 0, rating: 4.7, ulasan: 47, stok: 9,
    warna: ["Putih"], ukuran: UKURAN_WANITA, gambar: ["tunik-hijab.jpg"],
    deskripsi: "Tunik putih panjang dengan belahan depan dan kancing samping. Sopan dan nyaman untuk aktivitas harian."
  },
  {
    id: 21, nama: "Celana Slim Abu", kategori: "bawahan", label: "Celana Pria",
    bahan: "Katun Twill", harga: 189000, hargaAsli: 0, rating: 4.6, ulasan: 38, stok: 11,
    warna: ["Abu", "Hitam"], ukuran: UKURAN_CELANA, gambar: ["celana-abu.jpg"],
    deskripsi: "Celana panjang potongan slim berwarna abu. Rapi untuk kerja maupun acara santai."
  },
  {
    id: 22, nama: "Polo Navy Wanita", kategori: "atasan", label: "Polo Shirt",
    bahan: "Katun Pique", harga: 139000, hargaAsli: 0, rating: 4.7, ulasan: 40, stok: 12,
    warna: ["Biru"], ukuran: UKURAN_WANITA, gambar: ["polo-navy.jpg"],
    deskripsi: "Polo navy dengan list putih di kerah dan lengan. Segar dan mudah dipakai setiap hari."
  },
  {
    id: 23, nama: "Jaket Pria Olive", kategori: "outer", label: "Outer Pria",
    bahan: "Katun Twill", harga: 329000, hargaAsli: 0, rating: 4.8, ulasan: 34, stok: 7,
    warna: ["Hijau", "Cokelat"], ukuran: UKURAN_ATAS, gambar: ["jaket-olive.jpg"],
    deskripsi: "Jaket pria warna olive dengan saku depan dan potongan lurus. Cocok dipadukan dengan kemeja."
  },
  {
    id: 24, nama: "Blouse Piping Hitam", kategori: "atasan", label: "Blouse Wanita",
    bahan: "Rajut Halus", harga: 159000, hargaAsli: 0, rating: 4.7, ulasan: 49, stok: 10,
    warna: ["Putih"], ukuran: UKURAN_WANITA, gambar: ["blouse-piping.jpg"],
    deskripsi: "Blouse putih dengan list hitam di kerah dan lengan. Manis dan rapi untuk kerja."
  },
  {
    id: 25, nama: "Long Coat Krem", kategori: "outer", label: "Outer Wanita",
    bahan: "Bahan Premium", harga: 369000, hargaAsli: 0, rating: 4.8, ulasan: 28, stok: 5,
    warna: ["Cream", "Cokelat"], ukuran: UKURAN_WANITA, gambar: ["coat-krem.jpg"],
    deskripsi: "Long coat krem dengan potongan panjang dan lapel lebar. Memberi kesan mewah yang sederhana."
  },
  {
    id: 26, nama: "Kemeja Saku Oversize", kategori: "atasan", label: "Kemeja Pria",
    bahan: "Katun Linen", harga: 179000, hargaAsli: 0, rating: 4.7, ulasan: 35, stok: 9,
    warna: ["Putih", "Cream"], ukuran: UKURAN_ATAS, gambar: ["kemeja-saku.jpg"],
    deskripsi: "Kemeja oversize dengan dua saku besar di dada. Longgar dan nyaman untuk tampilan kasual modern."
  }
];

/* fungsi bantu */
function cariProduk(id) {
  for (var i = 0; i < PRODUK.length; i++) {
    if (PRODUK[i].id === Number(id)) return PRODUK[i];
  }
  return null;
}

function namaKategori(id) {
  for (var i = 0; i < KATEGORI.length; i++) {
    if (KATEGORI[i].id === id) return KATEGORI[i].nama;
  }
  return id;
}

function rupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function aman(teks) {
  return String(teks).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function fotoProduk(nama) {
  return "images/produk/" + nama;
}

function persenHemat(p) {
  if (!p.hargaAsli) return 0;
  return Math.round((p.hargaAsli - p.harga) / p.hargaAsli * 100);
}

/* disukai (hati) */
function ambilSuka() {
  try { return JSON.parse(localStorage.getItem("fitrashop_suka")) || []; }
  catch (e) { return []; }
}

function ubahSuka(id) {
  var daftar = ambilSuka();
  var i = daftar.indexOf(id);
  if (i === -1) daftar.push(id);
  else daftar.splice(i, 1);
  localStorage.setItem("fitrashop_suka", JSON.stringify(daftar));
  return i === -1;
}

function pasangTombolSuka(wadah) {
  wadah.addEventListener("click", function (e) {
    var tombol = e.target.closest("[data-suka]");
    if (!tombol) return;
    var nyala = ubahSuka(Number(tombol.dataset.suka));
    tombol.classList.toggle("suka", nyala);
  });
}

/* kartu produk */
function buatKartu(p) {
  var suka = ambilSuka().indexOf(p.id) !== -1;
  var link = "produk.html?id=" + p.id;
  var harga = '<span class="kartu-harga">' + rupiah(p.harga) + '</span>';
  if (p.hargaAsli) harga += ' <s class="kartu-coret">' + rupiah(p.hargaAsli) + '</s>';

  return '<article class="kartu">' +
    '<div class="kartu-gambar">' +
      '<a href="' + link + '"><img src="' + fotoProduk(p.gambar[0]) + '" alt="' + p.nama + '" loading="lazy"></a>' +
      '<span class="label">' + namaKategori(p.kategori) + '</span>' +
      '<button class="tombol-hati' + (suka ? ' suka' : '') + '" data-suka="' + p.id + '" aria-label="Sukai produk">' +
        '<svg class="ikon"><use href="#ikon-hati"/></svg></button>' +
    '</div>' +
    '<div class="kartu-info">' +
      '<h3 class="kartu-nama"><a href="' + link + '">' + p.nama + '</a></h3>' +
      '<p class="kartu-rating"><b>★</b> ' + p.rating + ' (' + p.ulasan + ')</p>' +
      '<div class="kartu-bawah">' +
        '<div>' + harga + '</div>' +
        '<a href="' + link + '" class="tombol-lihat" aria-label="Lihat ' + p.nama + '">' +
          '<svg class="ikon"><use href="#ikon-panah-atas"/></svg></a>' +
      '</div>' +
    '</div>' +
  '</article>';
}

/* akun (diisi halaman login nanti) */
function ambilPengguna() {
  try { return JSON.parse(localStorage.getItem("fitrashop_user")); }
  catch (e) { return null; }
}
