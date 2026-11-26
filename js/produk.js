/* detail produk */

var params = new URLSearchParams(location.search);
var produk = cariProduk(params.get("id"));
var detail = document.getElementById("detail");

var ukuranDipilih = null;
var warnaDipilih = null;
var jumlah = 1;

if (!produk) {
  detail.innerHTML = '<div class="keranjang-kosong"><h2>Produk tidak ditemukan</h2>' +
    '<p>Produk yang kamu cari mungkin sudah tidak tersedia.</p>' +
    '<a href="katalog.html" class="tombol tombol-hitam">Kembali ke Katalog</a></div>';
} else {
  tampilkanDetail();
}

function tampilkanDetail() {
  document.title = produk.nama + " - FITRA SHOP";
  var habis = produk.stok <= 0;
  ukuranDipilih = produk.ukuran[0].nama;
  warnaDipilih = produk.warna[0];

  var thumb = "";
  if (produk.gambar.length > 1) {
    produk.gambar.forEach(function (g, i) {
      thumb += '<button class="thumb' + (i === 0 ? ' aktif' : '') + '" data-foto="' + g + '"><img src="' + fotoProduk(g) + '" alt=""></button>';
    });
  }

  var harga = '<strong class="harga-besar" id="harga">' + rupiah(produk.harga) + '</strong>';
  if (produk.hargaAsli) {
    harga += '<s class="harga-coret">' + rupiah(produk.hargaAsli) + '</s>' +
      '<span class="chip-hemat">Hemat ' + persenHemat(produk) + '%</span>';
  }

  var tabel = "";
  var ukuranHtml = "";
  produk.ukuran.forEach(function (u, i) {
    tabel += '<tr><td>' + u.nama + '</td><td>' + u.info + '</td></tr>';
    ukuranHtml += '<button class="pilih' + (i === 0 ? ' aktif' : '') + '" data-ukuran="' + u.nama + '">' +
      '<b>' + u.nama + '</b><small>' + u.info + '</small></button>';
  });

  var warnaHtml = "";
  produk.warna.forEach(function (w, i) {
    warnaHtml += '<button class="pilih warna' + (i === 0 ? ' aktif' : '') + '" data-warna="' + w + '">' +
      '<span class="titik-warna" style="background:' + (WARNA[w] || "#ccc") + '"></span>' + w + '</button>';
  });

  var stokTeks = habis
    ? '<span class="stok habis">Stok habis</span>'
    : '<span class="stok">Stok tersedia (sisa ' + produk.stok + ' pcs) · Warna: ' + produk.warna.join(", ") + '</span>';

  detail.innerHTML =
    '<h1 class="judul-halaman">Detail Produk</h1>' +
    '<div class="detail">' +
      '<div class="galeri">' +
        '<div class="foto-utama"><img id="foto-utama" src="' + fotoProduk(produk.gambar[0]) + '" alt="' + produk.nama + '"></div>' +
        (thumb ? '<div class="thumbs" id="thumbs">' + thumb + '</div>' : '') +
      '</div>' +
      '<div class="info">' +
        '<div class="info-atas">' +
          '<span class="badge-bahan">' + produk.bahan + '</span>' +
          '<span class="chip-rating"><b>★</b> ' + produk.rating + ' (' + produk.ulasan + ' ulasan)</span>' +
          '<div class="aksi-kecil">' +
            '<button class="tombol-ikon' + (ambilSuka().indexOf(produk.id) !== -1 ? ' suka' : '') + '" id="tombol-suka" aria-label="Sukai"><svg class="ikon"><use href="#ikon-hati"/></svg></button>' +
            '<button class="tombol-ikon" id="tombol-bagikan" aria-label="Bagikan"><svg class="ikon"><use href="#ikon-bagikan"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<p class="label-produk">' + produk.label + ' · ' + namaKategori(produk.kategori) + '</p>' +
        '<h2 class="nama-produk">' + produk.nama + '</h2>' +
        '<div class="harga-baris">' + harga + '</div>' +
        '<p class="stok-baris">' + stokTeks + '</p>' +
        '<h3 class="sub">Tentang Pakaian</h3>' +
        '<p class="deskripsi-produk">' + produk.deskripsi + '</p>' +
        '<div class="baris-judul"><h3 class="sub">Pilih Ukuran</h3>' +
          '<details class="panduan"><summary>Panduan Ukuran</summary>' +
          '<table><tr><th>Ukuran</th><th>Ukuran badan</th></tr>' + tabel + '</table></details></div>' +
        '<div class="pilihan" id="pilih-ukuran">' + ukuranHtml + '</div>' +
        '<h3 class="sub">Pilih Warna</h3>' +
        '<div class="pilihan" id="pilih-warna">' + warnaHtml + '</div>' +
        '<div class="kotak-putih baris-jumlah">' +
          '<div><b>Jumlah Pesanan</b><small>Maksimal ' + produk.stok + ' potong</small></div>' +
          '<div class="stepper"><button id="kurang" aria-label="Kurangi">−</button>' +
          '<input id="jumlah" value="1" readonly aria-label="Jumlah"><button id="tambah" aria-label="Tambah">+</button></div>' +
        '</div>' +
        '<div class="kotak-putih">' +
          '<label for="catatan"><b>Catatan Pelanggan</b></label>' +
          '<textarea id="catatan" rows="2" placeholder="Contoh: warna cream atau putih, tolong dicek dulu"></textarea>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="bar-bawah"><div class="bar-isi">' +
      '<div><small>Total Estimasi</small><strong id="estimasi">' + rupiah(produk.harga) + '</strong></div>' +
      '<div class="bar-tombol">' +
        '<button class="tombol tombol-garis-hitam" id="tombol-keranjang"' + (habis ? ' disabled' : '') + '>Tambah ke Keranjang</button>' +
        '<button class="tombol tombol-aksen" id="tombol-pesan"' + (habis ? ' disabled' : '') + '>Pesan Sekarang</button>' +
      '</div>' +
    '</div></div>';

  pasangAksi();
  tampilkanSerupa();
}

function perbaruiEstimasi() {
  document.getElementById("jumlah").value = jumlah;
  document.getElementById("estimasi").textContent = rupiah(produk.harga * jumlah);
}

function ambilItem() {
  return {
    id: produk.id,
    ukuran: ukuranDipilih,
    warna: warnaDipilih,
    jumlah: jumlah,
    catatan: document.getElementById("catatan").value.trim()
  };
}

function pasangAksi() {
  /* foto */
  var thumbs = document.getElementById("thumbs");
  if (thumbs) {
    thumbs.addEventListener("click", function (e) {
      var t = e.target.closest(".thumb");
      if (!t) return;
      document.getElementById("foto-utama").src = fotoProduk(t.dataset.foto);
      thumbs.querySelectorAll(".thumb").forEach(function (x) { x.classList.remove("aktif"); });
      t.classList.add("aktif");
    });
  }

  /* ukuran & warna */
  document.getElementById("pilih-ukuran").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    ukuranDipilih = b.dataset.ukuran;
    this.querySelectorAll("button").forEach(function (x) { x.classList.remove("aktif"); });
    b.classList.add("aktif");
  });

  document.getElementById("pilih-warna").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    warnaDipilih = b.dataset.warna;
    this.querySelectorAll("button").forEach(function (x) { x.classList.remove("aktif"); });
    b.classList.add("aktif");
  });

  /* jumlah */
  document.getElementById("kurang").addEventListener("click", function () {
    if (jumlah > 1) jumlah--;
    perbaruiEstimasi();
  });
  document.getElementById("tambah").addEventListener("click", function () {
    if (jumlah < produk.stok) jumlah++;
    perbaruiEstimasi();
  });

  /* suka & bagikan */
  document.getElementById("tombol-suka").addEventListener("click", function () {
    this.classList.toggle("suka", ubahSuka(produk.id));
  });
  document.getElementById("tombol-bagikan").addEventListener("click", function () {
    var tautan = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tautan).then(
        function () { tampilkanToast("Tautan produk disalin"); },
        function () { window.prompt("Salin tautan produk:", tautan); }
      );
    } else {
      window.prompt("Salin tautan produk:", tautan);
    }
  });

  /* keranjang */
  document.getElementById("tombol-keranjang").addEventListener("click", function () {
    tambahKeKeranjang(ambilItem());
    tampilkanToast("Ditambahkan ke keranjang.", "keranjang.html", "Lihat keranjang");
  });
  document.getElementById("tombol-pesan").addEventListener("click", function () {
    tambahKeKeranjang(ambilItem());
    location.href = "keranjang.html";
  });
}

/* produk serupa */
function tampilkanSerupa() {
  var daftar = PRODUK.filter(function (p) { return p.id !== produk.id && p.kategori === produk.kategori; });
  PRODUK.forEach(function (p) {
    if (daftar.length < 4 && p.id !== produk.id && daftar.indexOf(p) === -1) daftar.push(p);
  });

  var html = "";
  daftar.slice(0, 4).forEach(function (p) { html += buatKartu(p); });
  var grid = document.getElementById("grid-serupa");
  grid.innerHTML = html;
  pasangTombolSuka(grid);
  document.getElementById("serupa").hidden = false;
}
