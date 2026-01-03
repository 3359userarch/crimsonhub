/* ================= GLOBAL STATE ================= */
let currentSubject = "";
let currentSemester = 0;

/* ================= UTILITY ================= */
function hideAll() {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
}

/* ================= BASIC NAVIGATION ================= */
function showHome() {
  hideAll();
  document.getElementById("home")?.classList.add("active");
}

function showLogin() {
  hideAll();
  document.getElementById("login")?.classList.add("active");
}

function showAbout() {
  hideAll();
  document.getElementById("about")?.classList.add("active");
}

/* ================= PROFILE STORAGE ================= */
function updateProfile(data) {
  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  localStorage.setItem(
    "profile",
    JSON.stringify({ ...profile, ...data })
  );
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

/* ================= AUTH FLOW ================= */
function showStreams() {
  hideAll();
  document.getElementById("streams")?.classList.add("active");

  // show profile icon
  const profileIcon = document.getElementById("profileIcon");
  if (profileIcon) profileIcon.classList.remove("hidden");

  // update profile name
  updateProfileName();

  // hide logo on mobile
  const logo = document.getElementById("navLogo");
  if (logo) logo.style.display = "none";

  // change Login → Logout
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.textContent = "Logout";
    authBtn.onclick = logout;
  }
}

/* ================= STREAMS ================= */
function openArts() {
  hideAll();
  document.getElementById("arts")?.classList.add("active");
}

function openScience() {
  hideAll();
  document.getElementById("science")?.classList.add("active");
}

function openBiology() {
  hideAll();
  document.getElementById("biology")?.classList.add("active");
}

function openCS() {
  hideAll();
  document.getElementById("cs")?.classList.add("active");
}

/* ================= SUBJECT FLOW ================= */
function selectSubject(subject) {
  currentSubject = subject;
  updateProfile({ subject });
  hideAll();
  document.getElementById("semester")?.classList.add("active");
}

/* ================= COMPUTER SCIENCE LEVEL ================= */
function openCSLevel(subject) {
  currentSubject = subject;
  updateProfile({ subject });
  hideAll();
  document.getElementById("cs-level")?.classList.add("active");
}

/* ================= SEMESTER ================= */
function selectSemester(sem) {
  currentSemester = sem;
  updateProfile({ semester: sem });
  hideAll();
  document.getElementById("options")?.classList.add("active");
}

/* ================= OPTIONS ================= */
function openSyllabus() {
  alert(
    "Opening syllabus for " +
    currentSubject +
    " Semester " +
    currentSemester
  );
}

function openNotes() {
  alert("Opening notes for " + currentSubject);
}

function openPYQ() {
  hideAll();
  document.getElementById("pyq-options")?.classList.add("active");
}

/* ================= PYQ ================= */
function openPYQYears() {
  alert(
    "Past 4 years question papers for " +
    currentSubject +
    " Semester " +
    currentSemester +
    " will be available here."
  );
}

function openPYQAnswers() {
  alert(
    "Answer keys for " +
    currentSubject +
    " Semester " +
    currentSemester +
    " will be available here."
  );
}

/* ================= HASH NAVIGATION ================= */
function navigate(sectionId) {
  hideAll();
  document.getElementById(sectionId)?.classList.add("active");
  location.hash = sectionId;
}

/* ================= SAFE FUNCTION HOOKING ================= */
showHome = () => navigate("home");
showLogin = () => navigate("login");
showAbout = () => navigate("about");

if (typeof showSignup === "function") {
  showSignup = () => navigate("signup");
}

if (typeof showForgot === "function") {
  showForgot = () => navigate("forgot");
}

if (typeof showStudy === "function") {
  showStudy = () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.loggedIn) {
      navigate("streams");
    } else {
      navigate("login");
    }
  };
}

openArts = () => navigate("arts");
openScience = () => navigate("science");
openCS = () => navigate("cs");

/* ================= BACK / FORWARD HANDLER ================= */
window.addEventListener("hashchange", () => {
  const section = location.hash.replace("#", "");
  if (!section) return;
  hideAll();
  document.getElementById(section)?.classList.add("active");
});

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  updateProfileName();

  // restore section on refresh
  const section = location.hash.replace("#", "") || "home";
  hideAll();
  document.getElementById(section)?.classList.add("active");

  // backend health check (silent)
  fetch("https://crimsonhub.onrender.com/api/health")
    .then(res => res.json())
    .then(data => {
      console.log("Backend status:", data.status);
      window.backendAvailable = true;
    })
    .catch(() => {
      console.log("Backend not available, frontend-only mode");
      window.backendAvailable = false;
    });
});
/* ================= PROFILE DROPDOWN TOGGLE ================= */

function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (!menu) return;

  menu.classList.toggle("hidden");
}

/* close menu when clicking outside */
document.addEventListener("click", e => {
  const profileIcon = document.getElementById("profileIcon");
  const menu = document.getElementById("profileMenu");

  if (!menu || !profileIcon) return;

  if (!profileIcon.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hidden");
  }
});
