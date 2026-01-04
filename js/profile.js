/* =================================================
   PROFILE PAGE SCRIPT (FINAL – FULL FILE)
   ================================================= */

/* ---------- GLOBALS ---------- */
let memoryImages = [];
let currentIndex = 0;
function authHeader() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  return profile?.token
    ? { Authorization: "Bearer " + profile.token }
    : {};
}

/* ---------- PAGE LOAD ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  /* 🔒 Protect profile page */
  if (!profile || !profile.loggedIn) {
    alert("Please login first");
    window.location.href = "index.html";
    return;
  }

  /* 👤 Profile info */
  document.getElementById("profileNameText").textContent =
    profile.name || "Student";

  document.getElementById("nameText").textContent =
    profile.name || "-";

  document.getElementById("instituteText").textContent =
    profile.institute || "-";

  /* 🎓 Academic info */
  document.getElementById("streamText").textContent =
    profile.stream || "-";

  document.getElementById("subjectText").textContent =
    profile.subject || "-";

  document.getElementById("semesterText").textContent =
    profile.semester ? "Semester " + profile.semester : "-";

  /* 📝 Feedback */
  const feedback = localStorage.getItem("feedback");
  if (feedback) {
    document.getElementById("feedbackText").value = feedback;
  }

  /* 🖼️ Init memories + access */
  initMemories();
  checkMemoriesAccess();
});

/* ---------- MENU SWITCH ---------- */
function showSection(id) {
  document.querySelectorAll(".detail-box").forEach(box =>
    box.classList.remove("active")
  );

  document.getElementById(id).classList.add("active");

  if (id === "memories") {
    checkMemoriesAccess();
  }
}

/* ---------- FEEDBACK ---------- */
function saveFeedback() {
  const text = document.getElementById("feedbackText").value.trim();

  if (!text) {
    alert("Please write feedback before submitting");
    return;
  }

  localStorage.setItem("feedback", text);
  alert("Feedback saved. Thank you!");
}

/* ---------- NAV ---------- */
function goHome() {
  window.location.href = "index.html";
}

/* ================= MEMORY ACCESS (FIXED) ================= */
function checkMemoriesAccess() {
  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  fetch("https://crimsonhub.onrender.com/api/memories/list", {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  ...authHeader()
},

    body: JSON.stringify({
      institute: (profile.institute || "").trim().toLowerCase()
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.locked) {
        document.getElementById("memoriesContent").style.display = "none";
        document.getElementById("memoriesLocked").style.display = "block";
      } else {
        document.getElementById("memoriesContent").style.display = "block";
        document.getElementById("memoriesLocked").style.display = "none";
      }
    })
    .catch(() => {
      document.getElementById("memoriesContent").style.display = "none";
      document.getElementById("memoriesLocked").style.display = "block";
    });
}

/* ================= MEMORY VIEWER ================= */

/* Collect images */
function initMemories() {
  memoryImages = Array.from(
    document.querySelectorAll("#memoriesGrid img")
  ).map(img => img.src);
}

/* Open fullscreen */
function openViewer(src) {
  const viewer = document.getElementById("imageViewer");
  const img = document.getElementById("viewerImg");

  if (!viewer || !img) return;

  currentIndex = memoryImages.indexOf(src);
  img.src = src;

  viewer.style.display = "flex";
  document.body.style.overflow = "hidden";
}

/* Close viewer */
function closeViewer() {
  const viewer = document.getElementById("imageViewer");
  viewer.style.display = "none";
  document.body.style.overflow = "";
}

/* Next image */
function nextImage() {
  currentIndex = (currentIndex + 1) % memoryImages.length;
  document.getElementById("viewerImg").src =
    memoryImages[currentIndex];
}

/* Previous image */
function prevImage() {
  currentIndex =
    (currentIndex - 1 + memoryImages.length) % memoryImages.length;
  document.getElementById("viewerImg").src =
    memoryImages[currentIndex];
}

/* Mouse scroll */
document.addEventListener("wheel", e => {
  const viewer = document.getElementById("imageViewer");
  if (!viewer || viewer.style.display !== "flex") return;

  e.deltaY > 0 ? nextImage() : prevImage();
});

/* Keyboard */
document.addEventListener("keydown", e => {
  const viewer = document.getElementById("imageViewer");
  if (!viewer || viewer.style.display !== "flex") return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeViewer();
});
