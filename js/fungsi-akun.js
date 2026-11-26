/* fungsi akun (dipakai login, register, profil) */

function ambilAkun() {
  try { return JSON.parse(localStorage.getItem("fitrashop_akun")) || []; }
  catch (e) { return []; }
}

function simpanSemuaAkun(daftar) {
  localStorage.setItem("fitrashop_akun", JSON.stringify(daftar));
}

function masukkan(akun) {
  localStorage.setItem("fitrashop_user", JSON.stringify({
    nama: akun.nama, email: akun.email, telepon: akun.telepon || "", alamat: akun.alamat || ""
  }));
  var tujuan = localStorage.getItem("fitrashop_setelah_login") || "beranda.html";
  localStorage.removeItem("fitrashop_setelah_login");
  setTimeout(function () { location.href = tujuan; }, 900);
}
