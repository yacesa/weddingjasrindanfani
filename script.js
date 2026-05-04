const cover = document.getElementById("cover");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const video = document.getElementById("bgVideo");

let musicPlaying = false;

openBtn.addEventListener("click", () => {
  cover.classList.add("hide");
  document.body.classList.remove("locked");

  if (video) {
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  music.play()
    .then(() => {
      musicPlaying = true;
      musicToggle.innerHTML = `<i data-lucide="volume-2"></i>`;
      lucide.createIcons();
    })
    .catch(() => {
      musicPlaying = false;
      musicToggle.innerHTML = `<i data-lucide="music"></i>`;
      lucide.createIcons();
    });
});

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicToggle.innerHTML = `<i data-lucide="music"></i>`;
    musicPlaying = false;
  } else {
    music.play();
    musicToggle.innerHTML = `<i data-lucide="volume-2"></i>`;
    musicPlaying = true;
  }

  lucide.createIcons();
});

const targetDate = new Date("2026-05-23T19:30:00+08:00").getTime();

function setText(id, value) {
  document.getElementById(id).textContent = String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    setText("days", 0);
    setText("hours", 0);
    setText("minutes", 0);
    setText("seconds", 0);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  setText("days", days);
  setText("hours", hours);
  setText("minutes", minutes);
  setText("seconds", seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const count = document.getElementById("guestCount").value;
  const message = document.getElementById("guestMessage").value.trim();

  const waText =
    `Assalamualaikum, saya ingin konfirmasi kehadiran.%0A%0A` +
    `Nama: ${encodeURIComponent(name)}%0A` +
    `Kehadiran: ${encodeURIComponent(attendance)}%0A` +
    `Jumlah Tamu: ${encodeURIComponent(count)}%0A` +
    `Ucapan: ${encodeURIComponent(message)}`;

  window.open(`https://wa.me/6282293939218?text=${waText}`, "_blank");
});

/* =========================
   BUKU TAMU GOOGLE SHEET
========================= */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzozjlrVaW8o9KBXIj-gnVR3yT4o8UipnAsLVmsl-qeDsU_TeoWJrrKY-Yrq6KNeCdi/exec";

const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, function(tag) {
    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    };

    return chars[tag];
  });
}

async function loadWishes() {
  wishList.innerHTML = `
    <div class="wish">
      <p>Memuat ucapan...</p>
    </div>
  `;

  try {
    const response = await fetch(SCRIPT_URL);
    const wishes = await response.json();

    if (!wishes.length) {
      wishList.innerHTML = `
        <div class="wish">
          <p>Belum ada ucapan.</p>
        </div>
      `;
      return;
    }

    wishList.innerHTML = wishes.map(wish => `
      <div class="wish">
        <strong>${escapeHTML(wish.nama)}</strong>
        <p>${escapeHTML(wish.ucapan)}</p>
      </div>
    `).join("");

  } catch (error) {
    wishList.innerHTML = `
      <div class="wish">
        <p>Ucapan belum bisa dimuat.</p>
      </div>
    `;
  }
}

wishForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("wishName").value.trim();
  const text = document.getElementById("wishText").value.trim();

  if (!name || !text) return;

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        nama: name,
        ucapan: text
      })
    });

    wishForm.reset();
    loadWishes();

  } catch (error) {
    alert("Maaf, ucapan belum berhasil dikirim.");
  }
});

loadWishes();

/* =========================
   SALIN REKENING
========================= */

const copyButton = document.getElementById("copyRek");

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText("2010201184773");

  const oldText = copyButton.textContent;
  copyButton.textContent = "Berhasil Disalin";

  setTimeout(() => {
    copyButton.textContent = oldText;
  }, 1600);
});

/* =========================
   NAMA TAMU DARI LINK
========================= */
const guestList = [
  "Besty'q safni",
  "Mawarni S.Pd",
  "Febrianty S.Pd",
  "Gita Purwanti Amd.keb",
  "Siti hajar S.keb",
  "Elsa pita. S.Pd",
  "Sri sahrani S.Pd",
  "Besty'q yuni",
  "Besty'q dewi",
  "Sukmawati dan pasangan",
  "Isroyati dan Pasangan",
  "Miranti",
  "Hikma",
  "Nur Jannah",
  "Besty'q windi",
  "Linda dan suami",
  "Elsa",
  "Besty'q jhulian",
  "Fitrawati",
  "Windiani",
  "Sri Novita S.Pd",
  "Elfani S.E",
  "Sri Utami dan pasangan",
  "Hasturi",
  "Putry",
  "Firdayanty",
  "Winda/Windi",
  "Mega dan suami",
  "Riana S.Pd",
  "Ranty lihawa",
  "Windiani",
  "Nur safna dan pasangan",
  "Adek rima",
  "Ibu Nurul dan suami",
  "Ibu guru Sarah",
  "Janah dan suami",
  "Irfan",
  "Fandy",
  "Dewitriana",
  "Ibu nona",
  "Fahril",
  "Wawan",
  "Jasri",
  "Jana dan suami",
  "Gita dan pasangan",
  "Umi dan pasangan",
  "Ibu guru Gita",
  "Yati dan pasangan",
  "Nurazia",
  "Mahmud dan pasangan"
];

const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("to");

const guestElements = document.querySelectorAll(".guest-name");

if (guestName && guestName.trim() !== "") {
  guestElements.forEach(el => {
    el.textContent = decodeURIComponent(guestName);
  });
} else {
  guestElements.forEach(el => {
    el.style.display = "none";
  });
}

lucide.createIcons();