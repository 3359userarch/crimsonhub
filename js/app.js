

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

function showAbout() {
  hideAll();
  document.getElementById("about").classList.add("active");
}

/* ================= AUTH ================= */
function showStreams() {
  hideAll();
  document.getElementById("streams").classList.add("active");

  // login state
  isLoggedIn = true;

  // show profile icon
  const profileIcon = document.getElementById("profileIcon");
  if (profileIcon) profileIcon.classList.remove("hidden");

  // update profile name
  updateProfileName();

  // change Login → Logout
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.textContent = "Logout";
    authBtn.onclick = logout;
  }
}

function logout() {
  isLoggedIn = false;

  // hide profile icon
  const profileIcon = document.getElementById("profileIcon");
  if (profileIcon) profileIcon.classList.add("hidden");

  // change Logout → Login
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.textContent = "Login";
    authBtn.onclick = showLogin;
  }

  // go home
  hideAll();
  document.getElementById("home").classList.add("active");
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

/* ================= COMPUTER SCIENCE LEVEL ================= */
function openCSLevel(subject) {
  currentSubject = subject;
  hideAll();
  document.getElementById("cs-level").classList.add("active");
}

/* ================= SEMESTER ================= */
function selectSemester(sem) {
  currentSemester = sem;
  hideAll();
  document.getElementById("options").classList.add("active");
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
  document.getElementById("pyq-options").classList.add("active");
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

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  updateProfileName();

  // backend health check (safe, silent)
  fetch("https://crimsonhub.onrender.com/api/health")
    .then(res => res.json())
    .then(data => {
      console.log("Backend status:", data.status);
      window.backendAvailable = true;
    })
    .catch(() => {
      console.log("Backend not available, using frontend-only mode");
      window.backendAvailable = false;
    });
});

/* ================= POPSTATE (BACK BUTTON) ================= */
window.addEventListener("popstate", e => {
  if (!e.state || !e.state.section) return;

  hideAll();
  const el = document.getElementById(e.state.section);
  if (el) el.classList.add("active");
});

/* ================= INIT STATE ================= */
window.addEventListener("DOMContentLoaded", () => {
  const hash = location.hash.replace("#", "");
  if (hash) {
    hideAll();
    const el = document.getElementById(hash);
    if (el) el.classList.add("active");
  } else {
    history.replaceState({ section: "home" }, "", "#home");
  }
});
/* ================= HASH NAVIGATION (BACK/FORWARD FIX) ================= */

/* map section */
function navigate(sectionId) {
  hideAll();
  const el = document.getElementById(sectionId);
  if (el) el.classList.add("active");
  location.hash = sectionId;
}

/* hook existing navigation */
const _showHome = showHome;
showHome = () => navigate("home");

const _showLogin = showLogin;
showLogin = () => navigate("login");

const _showSignup = showSignup;
showSignup = () => navigate("signup");

const _showForgot = showForgot;
showForgot = () => navigate("forgot");

const _showAbout = showAbout;
showAbout = () => navigate("about");

const _showStudy = showStudy;
showStudy = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile && profile.loggedIn) {
    navigate("streams");
  } else {
    navigate("login");
  }
};

/* stream flow */
const _openArts = openArts;
openArts = () => navigate("arts");

const _openScience = openScience;
openScience = () => navigate("science");
const _openBiology = openBiology;
openBiology = () => navigate("biology");

const _openCS = openCS;
openCS = () => navigate("cs");


const _selectSubject = selectSubject;
selectSubject = subject => {
  updateProfile({ subject });
  navigate("semester");
};

const _selectSemester = selectSemester;
selectSemester = sem => {
  updateProfile({ semester: sem });
  navigate("options");
};

const _openNotes = openNotes;
openNotes = () => navigate("notes-chapters");

/* BACK / FORWARD HANDLER */
window.addEventListener("hashchange", () => {
  const section = location.hash.replace("#", "");
  if (!section) return;
  hideAll();
  const el = document.getElementById(section);
  if (el) el.classList.add("active");
});

/* INIT ON REFRESH */
window.addEventListener("DOMContentLoaded", () => {
  const section = location.hash.replace("#", "") || "home";
  hideAll();
  const el = document.getElementById(section);
  if (el) el.classList.add("active");
});
function showBiology() {
  openBiology();
}
