/* beranda tamu */

if (ambilPengguna()) location.replace("beranda.html");

/* landing page */

/* produk */
var gridProduk = document.getElementById("grid-produk");
var html = "";
PRODUK.slice(0, 8).forEach(function (p) { html += buatKartu(p); });
gridProduk.innerHTML = html;
pasangTombolSuka(gridProduk);

/* slider */
var slides = document.getElementById("slides");
var daftarSlide = document.querySelectorAll(".slide");
var kotakTitik = document.getElementById("titik");
var hero = document.querySelector(".hero");

var JEDA = 5000;
var slideAktif = 0;
var pewaktu = null;

daftarSlide.forEach(function (_, i) {
  var titik = document.createElement("button");
  titik.setAttribute("aria-label", "Ke slide " + (i + 1));
  titik.addEventListener("click", function () {
    keSlide(i);
    mulaiOtomatis();
  });
  kotakTitik.appendChild(titik);
});

function keSlide(n) {
  var total = daftarSlide.length;
  slideAktif = (n + total) % total;
  slides.style.transform = "translateX(-" + slideAktif * 100 + "%)";

  kotakTitik.querySelectorAll("button").forEach(function (t, i) {
    t.classList.toggle("aktif", i === slideAktif);
  });
}

function berikutnya() { keSlide(slideAktif + 1); }
function sebelumnya() { keSlide(slideAktif - 1); }

document.getElementById("panah-kanan").addEventListener("click", function () {
  berikutnya();
  mulaiOtomatis();
});
document.getElementById("panah-kiri").addEventListener("click", function () {
  sebelumnya();
  mulaiOtomatis();
});

function mulaiOtomatis() {
  berhentiOtomatis();
  pewaktu = setInterval(berikutnya, JEDA);
}

function berhentiOtomatis() {
  clearInterval(pewaktu);
}

hero.addEventListener("mouseenter", berhentiOtomatis);
hero.addEventListener("mouseleave", mulaiOtomatis);

/* geser dengan jari */
var awalSentuh = 0;

hero.addEventListener("touchstart", function (e) {
  awalSentuh = e.touches[0].clientX;
  berhentiOtomatis();
}, { passive: true });

hero.addEventListener("touchend", function (e) {
  var selisih = e.changedTouches[0].clientX - awalSentuh;
  if (selisih < -50) berikutnya();
  if (selisih > 50) sebelumnya();
  mulaiOtomatis();
}, { passive: true });

keSlide(0);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  mulaiOtomatis();
}
