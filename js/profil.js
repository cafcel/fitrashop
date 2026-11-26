/* profil */

var pengguna = ambilPengguna();

/* halaman khusus yang sudah login */
if (!pengguna) {
  localStorage.setItem("fitrashop_setelah_login", "profil.html");
  location.href = "login.html";
}

function cariAkun() {
  return ambilAkun().filter(function (a) { return a.email === pengguna.email; })[0] || {};
}

function simpanAkun(data) {
  var semua = ambilAkun();
  semua.forEach(function (a) {
    if (a.email === pengguna.email) {
      a.nama = data.nama; a.telepon = data.telepon; a.alamat = data.alamat;
      if (data.foto !== undefined) a.foto = data.foto;
    }
  });
  simpanSemuaAkun(semua);
  localStorage.setItem("fitrashop_user", JSON.stringify({
    nama: data.nama, email: pengguna.email, telepon: data.telepon, alamat: data.alamat
  }));
  pengguna = ambilPengguna();
}

var elFotoSamping = document.getElementById("foto-samping");
var elFotoBesar = document.getElementById("foto-besar");
var dataAkun = document.getElementById("data-akun");
var formProfil = document.getElementById("form-profil");
var aksiFoto = document.getElementById("aksi-foto");
var tombolEdit = document.getElementById("tombol-edit");
var pesanSimpan = document.getElementById("pesan-simpan");

/* tampil */
function isiNilai(id, teks, kosong) {
  var el = document.getElementById(id);
  el.textContent = teks || kosong;
  el.classList.toggle("kosong", !teks);
}

function tampilkan() {
  var akun = cariAkun();
  var awal = pengguna.nama.charAt(0).toUpperCase();

  [elFotoSamping, elFotoBesar].forEach(function (el) {
    if (akun.foto) {
      el.style.backgroundImage = "url(" + akun.foto + ")";
      el.textContent = "";
    } else {
      el.style.backgroundImage = "";
      el.textContent = awal;
    }
  });

  document.getElementById("nama-samping").textContent = pengguna.nama;
  document.getElementById("email-samping").textContent = pengguna.email;
  isiNilai("v-nama", pengguna.nama, "");
  isiNilai("v-email", pengguna.email, "");
  isiNilai("v-telepon", pengguna.telepon, "Belum diisi");
  isiNilai("v-alamat", pengguna.alamat, "Belum diisi");
  isiNilai("v-gabung", akun.gabung || "-", "-");
}

/* tab */
function bukaTab(nama) {
  document.querySelectorAll(".tab").forEach(function (t) { t.hidden = true; });
  document.getElementById("tab-" + nama).hidden = false;
  document.querySelectorAll("#profil-menu button").forEach(function (b) {
    b.classList.toggle("aktif", b.dataset.tab === nama);
  });
}

document.getElementById("profil-menu").addEventListener("click", function (e) {
  var tombol = e.target.closest("button");
  if (tombol) bukaTab(tombol.dataset.tab);
});

var dariUrl = location.hash.replace("#", "");
if (dariUrl === "ukuran") bukaTab(dariUrl);

/* edit */
function modeEdit(nyala) {
  dataAkun.hidden = nyala;
  formProfil.hidden = !nyala;
  aksiFoto.hidden = !nyala;
  tombolEdit.hidden = nyala;
  pesanSimpan.hidden = true;

  if (nyala) {
    document.getElementById("f-nama").value = pengguna.nama;
    document.getElementById("f-email").value = pengguna.email;
    document.getElementById("f-telepon").value = pengguna.telepon;
    document.getElementById("f-alamat").value = pengguna.alamat;
  }
}

tombolEdit.addEventListener("click", function () { modeEdit(true); });
document.getElementById("tombol-batal").addEventListener("click", function () { modeEdit(false); });

function tandaiSalah(id, pesan) {
  var input = document.getElementById(id);
  input.classList.add("salah");
  input.parentElement.querySelector(".pesan-error").textContent = pesan;
}

function bersihkanSalah() {
  formProfil.querySelectorAll(".salah").forEach(function (i) { i.classList.remove("salah"); });
  formProfil.querySelectorAll(".pesan-error").forEach(function (p) { p.textContent = ""; });
}

formProfil.addEventListener("submit", function (e) {
  e.preventDefault();
  bersihkanSalah();

  var nama = document.getElementById("f-nama").value.trim();
  var telepon = document.getElementById("f-telepon").value.trim();
  var alamat = document.getElementById("f-alamat").value.trim();
  var lolos = true;

  if (nama === "") { tandaiSalah("f-nama", "Nama wajib diisi."); lolos = false; }
  if (telepon !== "" && !/^(\+62|62|0)[0-9]{8,13}$/.test(telepon.replace(/[\s-]/g, ""))) {
    tandaiSalah("f-telepon", "Nomor telepon tidak valid, contoh 08123456789.");
    lolos = false;
  }
  if (alamat !== "" && alamat.length < 10) { tandaiSalah("f-alamat", "Alamat terlalu pendek."); lolos = false; }
  if (!lolos) return;

  simpanAkun({ nama: nama, telepon: telepon, alamat: alamat });
  modeEdit(false);
  tampilkan();
  document.querySelector(".aksi-akun span").textContent = "Halo, " + nama.split(" ")[0];
  pesanSimpan.textContent = "Profil berhasil disimpan.";
  pesanSimpan.hidden = false;
});

/* foto */
document.getElementById("input-foto").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    pesanSimpan.textContent = "Ukuran foto maksimal 1 MB.";
    pesanSimpan.hidden = false;
    return;
  }

  var baca = new FileReader();
  baca.onload = function () {
    var akun = cariAkun();
    simpanAkun({ nama: pengguna.nama, telepon: pengguna.telepon, alamat: pengguna.alamat, foto: baca.result });
    tampilkan();
  };
  baca.readAsDataURL(file);
});

/* keluar */
document.getElementById("tombol-logout").addEventListener("click", function () {
  localStorage.removeItem("fitrashop_user");
  location.href = "index.html";
});

if (pengguna) tampilkan();
