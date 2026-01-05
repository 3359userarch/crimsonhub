/* ================= GLOBAL STATE ================= */
let currentSubject = "";
let currentSemester = 0;
let isLoggedIn = false;

/* ================= UTILITY ================= */
function hideAll() {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
}

/* ================= NAVIGATION ================= */
function showHome() {
  hideAll();
  document.getElementById("home").classList.add("active");
}

function showLogin() {
  hideAll();
  document.getElementById("login").classList.add("active");
}

function showSignup() {
  hideAll();
  document.getElementById("signup").classList.add("active");
}

function showForgot() {
  hideAll();
  document.getElementById("forgot").classList.add("active");
}

function showAbout() {
  hideAll();
  document.getElementById("about").classList.add("active");
}

/* ================= AUTH ================= */
function showStudy() {
  hideAll();
  document.getElementById("streams").classList.add("active");
}

/* ================= PROFILE UI ================= */
function updateProfileName() {
  const nameEl = document.getElementById("profileName");
  if (!nameEl) return;

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  nameEl.textContent =
    profile.name && profile.name.trim() !== ""
      ? profile.name
      : "Profile";
}

/* ================= STREAMS ================= */
function openArts() {
  hideAll();
  document.getElementById("arts").classList.add("active");
}

function openScience() {
  hideAll();
  document.getElementById("science").classList.add("active");
}

/* ✅ BIOLOGY — SINGLE SOURCE OF TRUTH */
function openBiology() {
  hideAll();
  document.getElementById("biology").classList.add("active");
}

function openCS() {
  hideAll();
  document.getElementById("cs").classList.add("active");
}

/* ================= SUBJECT FLOW ================= */
function selectSubject(subject) {
  currentSubject = subject;
  hideAll();
  document.getElementById("semester").classList.add("active");
}

/* ================= SEMESTER ================= */
function selectSemester(sem) {
  currentSemester = sem;
  hideAll();
  document.getElementById("options").classList.add("active");
}

/* ================= OPTIONS ================= */
function openNotes() {
  hideAll();
  document.getElementById("notes-chapters").classList.add("active");
}

function openSyllabus() {
  alert(
    "Opening syllabus for " +
    currentSubject +
    " Semester " +
    currentSemester
  );
}

function openPYQ() {
  alert(
    "Opening PYQ for " +
    currentSubject +
    " Semester " +
    currentSemester
  );
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  updateProfileName();

  fetch("https://crimsonhub.onrender.com/api/health")
    .then(res => res.json())
    .then(data => console.log("Backend OK"))
    .catch(() => console.log("Backend offline"));
});
