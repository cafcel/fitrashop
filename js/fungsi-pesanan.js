/* fungsi pesanan (dipakai checkout, pembayaran, pesanan, detail pesanan) */

var KUNCI_PESANAN = "fitrashop_pesanan";
var BIAYA_LAYANAN = 2000;

var TAHAP_STATUS = [
  "Pesanan diterima",
  "Pesanan dikonfirmasi",
  "Proses pengerjaan",
  "Proses finishing",
  "Siap diambil / dikirim",
  "Pesanan selesai"
];

var PENGIRIMAN = [
  { id: "ambil",  nama: "Ambil di Butik", biaya: 0,     hari: [1, 2], info: "Jl. Kolonel Sugiono No. 32, Malang" },
  { id: "hemat",  nama: "Hemat Kargo",    biaya: 7000,  hari: [3, 5], info: "Pengiriman ekonomis" },
  { id: "reguler", nama: "Reguler",       biaya: 10000, hari: [2, 3], info: "Pengiriman lebih cepat" }
];

var BANK = [
  { id: "bca",     nama: "BCA",     rekening: "126 0823 3449 7140", logo: "bayar-bca.png" },
  { id: "bni",     nama: "BNI",     rekening: "0823 3449 7140",     logo: "bayar-bni.png" },
  { id: "bri",     nama: "BRI",     rekening: "0126 0100 7140 509", logo: "bayar-bri.png" },
  { id: "mandiri", nama: "Mandiri", rekening: "142 0098 3449 71",   logo: "bayar-mandiri.png" }
];

function ambilPesanan() {
  try { return JSON.parse(localStorage.getItem(KUNCI_PESANAN)) || []; }
  catch (e) { return []; }
}

function simpanPesanan(daftar) {
  localStorage.setItem(KUNCI_PESANAN, JSON.stringify(daftar));
}

function pesananSaya(email) {
  return ambilPesanan().filter(function (p) { return p.email === email; })
    .sort(function (a, b) { return b.dibuat.localeCompare(a.dibuat); });
}

function cariPesanan(kode) {
  return ambilPesanan().filter(function (p) { return p.kode === kode; })[0] || null;
}

function buatKode() {
  var t = new Date();
  var acak = Math.floor(1000 + Math.random() * 9000);
  return "FS" + String(t.getFullYear()).slice(2) + String(t.getMonth() + 1).padStart(2, "0") +
    String(t.getDate()).padStart(2, "0") + acak;
}

function cariBank(id) {
  return BANK.filter(function (b) { return b.id === id; })[0] || null;
}

function cariPengiriman(id) {
  return PENGIRIMAN.filter(function (p) { return p.id === id; })[0] || null;
}

/* tampilan tanggal */
var NAMA_BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function tanggalPendek(d) {
  return d.getDate() + " " + NAMA_BULAN[d.getMonth()];
}

function tanggalLengkap(iso) {
  var d = new Date(iso);
  return d.getDate() + " " + NAMA_BULAN[d.getMonth()] + " " + d.getFullYear() + ", " +
    String(d.getHours()).padStart(2, "0") + "." + String(d.getMinutes()).padStart(2, "0");
}

function estimasi(opsi) {
  var a = new Date(), b = new Date();
  a.setDate(a.getDate() + opsi.hari[0]);
  b.setDate(b.getDate() + opsi.hari[1]);
  return tanggalPendek(a) + " - " + tanggalPendek(b);
}

/* nama tahap (tahap 5 beda untuk ambil / kirim) */
function namaTahap(pesanan, i) {
  if (i === 4) return pesanan.pengiriman === "ambil" ? "Siap diambil" : "Siap dikirim";
  return TAHAP_STATUS[i];
}

function buatPesanan(data) {
  var daftar = ambilPesanan();
  var waktu = [new Date().toISOString(), null, null, null, null, null];
  var pesanan = {
    kode: buatKode(),
    email: data.email,
    nama: data.nama,
    telepon: data.telepon,
    alamat: data.alamat,
    catatan: data.catatan,
    item: data.item,
    pengiriman: data.pengiriman,
    metode: data.metode,
    bank: data.bank,
    subtotal: data.subtotal,
    ongkir: data.ongkir,
    layanan: BIAYA_LAYANAN,
    total: data.subtotal + data.ongkir + BIAYA_LAYANAN,
    status: 0,
    waktu: waktu,
    dibayar: false,
    dibuat: waktu[0]
  };
  daftar.push(pesanan);
  simpanPesanan(daftar);
  return pesanan;
}

/* dipakai admin nanti */
function ubahStatusPesanan(kode, tahap) {
  var daftar = ambilPesanan();
  daftar.forEach(function (p) {
    if (p.kode !== kode) return;
    p.status = tahap;
    for (var i = 0; i <= tahap; i++) {
      if (!p.waktu[i]) p.waktu[i] = new Date().toISOString();
    }
  });
  simpanPesanan(daftar);
}

/* halaman khusus pelanggan */
function wajibMasuk() {
  var user = ambilPengguna();
  if (!user) {
    localStorage.setItem("fitrashop_setelah_login", location.pathname.split("/").pop() + location.search);
    location.href = "login.html";
  }
  return user;
}

function labelStatusKelas(pesanan) {
  if (pesanan.status === 5) return "selesai";
  return pesanan.dibayar ? "jalan" : "tunggu";
}

function labelStatusTeks(pesanan) {
  if (!pesanan.dibayar) return "Menunggu pembayaran";
  return namaTahap(pesanan, pesanan.status);
}
