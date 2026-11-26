/* navbar, footer, ikon (dipakai semua halaman) */

var IKON = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
  '<symbol id="ikon-atasan" viewBox="0 0 48 48"><path d="M17 7 8 11 4 20l6 3 3-3v21h22V20l3 3 6-3-4-9-9-4c-1.500 3-4 4.500-7 4.500S18.500 10 17 7Z"/></symbol>' +
  '<symbol id="ikon-bawahan" viewBox="0 0 48 48"><path d="M14 6h20l4 36H27l-3-23-3 23H10L14 6Z"/><path d="M14.500 11.500h19"/></symbol>' +
  '<symbol id="ikon-outer" viewBox="0 0 48 48"><path d="m17 6 7 9 7-9 9 4 3 13-6 2v17H11V25l-6-2 3-13 9-4Z"/><path d="M24 15v27M17 6l7 14 7-14"/></symbol>' +
  '<symbol id="ikon-dress" viewBox="0 0 48 48"><path d="m18 4 1.500 11-3 10L8 43h32l-8.500-18-3-10L30 4"/><path d="M19.500 15c2.500 4 6.500 4 9 0M16.500 25h15"/></symbol>' +
  '<symbol id="ikon-tunik" viewBox="0 0 48 48"><path d="M18 5 9 9 5 18l5 3 3-3v25h22V18l3 3 5-3-4-9-9-4"/><path d="M18 5c1 4 3.500 6.500 6 6.500S29 9 30 5M24 11.500V26M13 36h5M30 36h5"/></symbol>' +
  '<symbol id="ikon-cari" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></symbol>' +
  '<symbol id="ikon-akun" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7"/></symbol>' +
  '<symbol id="ikon-tas" viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></symbol>' +
  '<symbol id="ikon-hati" viewBox="0 0 24 24"><path d="M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10Z"/></symbol>' +
  '<symbol id="ikon-panah-atas" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>' +
  '<symbol id="ikon-kiri" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></symbol>' +
  '<symbol id="ikon-kanan" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>' +
  '<symbol id="ikon-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
  '<symbol id="ikon-hapus" viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></symbol>' +
  '<symbol id="ikon-bagikan" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.500"/><circle cx="18" cy="6" r="2.500"/><circle cx="18" cy="18" r="2.500"/><path d="m8.200 10.800 7.600-3.600M8.200 13.200l7.600 3.600"/></symbol>' +
  '<symbol id="ikon-lokasi" viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.500"/></symbol>' +
  '<symbol id="ikon-telepon" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></symbol>' +
  '<symbol id="ikon-surat" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>' +
  '</svg>';

var halamanIni = location.pathname.split("/").pop() || "index.html";

function buatHeader() {
  var katalogAktif = (halamanIni === "katalog.html" || halamanIni === "produk.html");
  var berandaAktif = (halamanIni === "index.html" || halamanIni === "beranda.html" || halamanIni === "");

  var cari = "";
  if (halamanIni !== "katalog.html") {
    cari = '<form class="cari" action="katalog.html" method="get">' +
      '<input type="search" name="cari" placeholder="Cari pakaian..." aria-label="Cari pakaian">' +
      '<button type="submit" aria-label="Cari"><svg class="ikon"><use href="#ikon-cari"/></svg></button>' +
      '</form>';
  }

  var user = ambilPengguna();
  var linkBeranda = user ? "beranda.html" : "index.html";
  var menuPesanan = user ? '<a href="pesanan.html"' + ((halamanIni === "pesanan.html" || halamanIni === "detail-pesanan.html") ? ' class="aktif"' : '') + '>Pesanan</a>' : '';
  var akun = '<a href="login.html" class="aksi-akun"><svg class="ikon"><use href="#ikon-akun"/></svg><span>Masuk / Daftar</span></a>';
  if (user) {
    akun = '<a href="profil.html" class="aksi-akun' + (halamanIni === "profil.html" ? ' aktif' : '') + '"><svg class="ikon"><use href="#ikon-akun"/></svg><span>Halo, ' + aman(user.nama.split(" ")[0]) + '</span></a>';
  }

  return '<div class="bar-info">Tampil Percaya Diri Setiap Hari</div>' +
    '<header class="navbar" id="navbar"><div class="navbar-isi">' +
      '<a href="' + linkBeranda + '" class="logo">FITRA SHOP</a>' +
      '<button class="tombol-menu" id="tombol-menu" aria-label="Buka menu"><svg class="ikon"><use href="#ikon-menu"/></svg></button>' +
      '<nav class="menu" id="menu">' +
        '<a href="' + linkBeranda + '"' + (berandaAktif ? ' class="aktif"' : '') + '>Beranda</a>' +
        '<a href="katalog.html"' + (katalogAktif ? ' class="aktif"' : '') + '>Katalog</a>' +
        '<a href="index.html#tentang">Tentang Kami</a>' + menuPesanan +
        '<a href="#kontak">Hubungi Kami</a>' +
      '</nav>' + cari +
      '<div class="aksi">' + akun +
        '<a href="keranjang.html" class="aksi-tas' + (halamanIni === "keranjang.html" ? ' aktif' : '') + '" aria-label="Keranjang">' +
          '<svg class="ikon"><use href="#ikon-tas"/></svg><span class="badge" id="jumlah-keranjang">0</span></a>' +
      '</div>' +
    '</div></header>';
}

function buatFooter() {
  var kat = "";
  KATEGORI.forEach(function (k) {
    kat += '<li><a href="katalog.html?kategori=' + k.id + '">' + k.nama + '</a></li>';
  });

  return '<footer class="footer" id="kontak"><div class="wadah">' +
    '<div class="footer-atas">' +
      '<div class="footer-merek">' +
        '<a href="index.html" class="logo logo-putih">FITRA SHOP</a>' +
        '<p>Sebagai Pusat Fashion Online, kami menciptakan kemungkinan-kemungkinan gaya tanpa batas dengan cara memperluas jangkauan produk, mulai dari produk internasional hingga produk lokal dambaan. <strong>Bersama Fitra Shop, Tampil percaya diri setiap hari.</strong></p>' +
        '<p class="footer-kecil"><strong>Layanan Pengaduan Konsumen Fitra Shop</strong><br>' +
          'E-mail: <a href="mailto:customer@id.fitrashop.com">customer@id.fitrashop.com</a><br>' +
          'Telepon: <a href="tel:0215677898">021-5677898</a><br>' +
          'WhatsApp: <a href="https://wa.me/628531111010">+62 853 1111 1010</a></p>' +
      '</div>' +
      '<div class="footer-kolom"><h3>Kategori</h3><ul>' + kat + '<li><a href="katalog.html">Semua Produk</a></li></ul></div>' +
      '<div class="footer-kolom"><h3>Layanan Pelanggan</h3><ul>' +
        '<li><a href="pesanan.html">Riwayat Pesanan</a></li><li><a href="profil.html#ukuran">Panduan Ukuran Busana Butik</a></li><li><a href="#">Garansi Fitrashop</a></li></ul></div>' +
      '<div class="footer-kolom"><h3>Hubungi Kami</h3><ul class="kontak">' +
        '<li><svg class="ikon"><use href="#ikon-lokasi"/></svg><span>Jl. Kolonel Sugiono No. 32, Malang</span></li>' +
        '<li><svg class="ikon"><use href="#ikon-telepon"/></svg><span>+62-823-3464-1331 (Admin)</span></li>' +
        '<li><svg class="ikon"><use href="#ikon-surat"/></svg><span>support@fitrashop.com</span></li></ul></div>' +
    '</div>' +
    '<div class="footer-bawah">' +
      '<div><h3>Metode Pembayaran</h3><div class="bayar">' +
        '<img src="images/bayar-qris.png" alt="QRIS"><img src="images/bayar-bca.png" alt="BCA"><img src="images/bayar-bri.png" alt="BRI">' +
        '<img src="images/bayar-bni.png" alt="BNI"><img src="images/bayar-mandiri.png" alt="Mandiri"></div></div>' +
      '<div><h3>Ikuti Kami</h3><div class="sosmed">' +
        '<a href="https://wa.me/628531111010" aria-label="WhatsApp"><img src="images/sosmed-wa.jpg" alt="WhatsApp"></a>' +
        '<a href="#" aria-label="TikTok"><img src="images/sosmed-tiktok.jpg" alt="TikTok"></a>' +
        '<a href="#" aria-label="Instagram"><img src="images/sosmed-ig.jpg" alt="Instagram"></a></div></div>' +
    '</div>' +
  '</div><p class="hak-cipta">&copy; 2026 <span>Butik Fitrashop</span>. All Rights Reserved.</p></footer>';
}

/* pasang ke halaman */
document.body.insertAdjacentHTML("afterbegin", IKON + buatHeader());
document.body.insertAdjacentHTML("beforeend", buatFooter());
perbaruiBadge();

/* menu hp */
var navbar = document.getElementById("navbar");
document.getElementById("tombol-menu").addEventListener("click", function () {
  navbar.classList.toggle("terbuka");
});
document.querySelectorAll("#menu a").forEach(function (a) {
  a.addEventListener("click", function () { navbar.classList.remove("terbuka"); });
});

/* keluar */
var tombolKeluar = document.getElementById("tombol-keluar");
if (tombolKeluar) {
  tombolKeluar.addEventListener("click", function () {
    localStorage.removeItem("fitrashop_user");
    location.reload();
  });
}

/* pesan kecil di bawah layar */
function tampilkanToast(teks, tautan, labelTautan) {
  var toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = teks + (tautan ? ' <a href="' + tautan + '">' + labelTautan + '</a>' : "");
  toast.classList.add("tampil");
  clearTimeout(toast.pewaktu);
  toast.pewaktu = setTimeout(function () { toast.classList.remove("tampil"); }, 3500);
}
