/* register */

function tampilkanError(input, pesan) {
  input.closest(".field").querySelector(".pesan-error").textContent = pesan;
  input.classList.add("salah");
}

function hapusError(input) {
  input.closest(".field").querySelector(".pesan-error").textContent = "";
  input.classList.remove("salah");
}

function emailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function tampilkanSukses(form, teks) {
  let kotak = form.querySelector(".pesan-sukses");
  if (!kotak) {
    kotak = document.createElement("p");
    kotak.className = "pesan-sukses";
    form.appendChild(kotak);
  }
  kotak.textContent = teks;
}

/* tombol lihat sandi */
document.querySelectorAll(".toggle-sandi").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    const input = tombol.previousElementSibling;

    if (input.type === "password") {
      input.type = "text";
      tombol.textContent = "Tutup";
    } else {
      input.type = "password";
      tombol.textContent = "Lihat";
    }
  });
});

const formRegister = document.getElementById("form-register");

if (formRegister) {
  formRegister.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama       = document.getElementById("nama");
    const email      = document.getElementById("email");
    const sandi      = document.getElementById("sandi");
    const konfirmasi = document.getElementById("konfirmasi");
    const setuju     = document.getElementById("setuju");
    let lolos = true;

    if (nama.value.trim() === "") {
      tampilkanError(nama, "Nama wajib diisi.");
      lolos = false;
    } else {
      hapusError(nama);
    }

    if (!emailValid(email.value.trim())) {
      tampilkanError(email, "Masukkan email yang valid.");
      lolos = false;
    } else {
      hapusError(email);
    }

    if (sandi.value.length < 8) {
      tampilkanError(sandi, "Kata sandi minimal 8 karakter.");
      lolos = false;
    } else {
      hapusError(sandi);
    }

    if (konfirmasi.value === "" || konfirmasi.value !== sandi.value) {
      tampilkanError(konfirmasi, "Kata sandi tidak sama.");
      lolos = false;
    } else {
      hapusError(konfirmasi);
    }

    if (!setuju.checked) {
      tampilkanError(setuju, "Centang persetujuan untuk melanjutkan.");
      lolos = false;
    } else {
      hapusError(setuju);
    }

    if (lolos) {
      var daftar = ambilAkun();
      var surel = email.value.trim().toLowerCase();

      if (daftar.some(function (a) { return a.email === surel; })) {
        tampilkanError(email, "Email sudah terdaftar, silakan masuk.");
        return;
      }

      var baru = { nama: nama.value.trim(), email: surel, sandi: sandi.value, telepon: "", alamat: "", gabung: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) };
      daftar.push(baru);
      simpanSemuaAkun(daftar);
      tampilkanSukses(formRegister, "Akun berhasil dibuat, mengalihkan...");
      masukkan(baru);
    }
  });
}
