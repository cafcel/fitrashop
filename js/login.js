/* login */

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

const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email");
    const sandi = document.getElementById("sandi");
    let lolos = true;

    if (!emailValid(email.value.trim())) {
      tampilkanError(email, "Masukkan email yang valid.");
      lolos = false;
    } else {
      hapusError(email);
    }

    if (sandi.value === "") {
      tampilkanError(sandi, "Kata sandi wajib diisi.");
      lolos = false;
    } else {
      hapusError(sandi);
    }

    if (lolos) {
      var cocok = ambilAkun().filter(function (a) {
        return a.email === email.value.trim().toLowerCase() && a.sandi === sandi.value;
      })[0];

      if (!cocok) {
        tampilkanError(sandi, "Email atau kata sandi salah.");
        return;
      }
      tampilkanSukses(formLogin, "Berhasil masuk, mengalihkan...");
      masukkan(cocok);
    }
  });
}

