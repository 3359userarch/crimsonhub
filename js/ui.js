/* ================= NAVIGATION ================= */

function authHeader() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  return profile?.token
    ? { Authorization: "Bearer " + profile.token }
    : {};
}

function hideAll() {
  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.remove("active")
  );
}

function showHome() {
  hideAll();
  document.getElementById("home").classList.add("active");
}

function showAbout() {
  hideAll();
  document.getElementById("about").classList.add("active");
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

/* ================= STUDY ENTRY ================= */

function showStudy() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile && profile.loggedIn) {
    hideAll();
    document.getElementById("streams").classList.add("active");
  } else {
    showLogin();
  }
}

/* ================= AUTH BUTTON ================= */

function updateAuthButton(isLoggedIn) {
  const btn = document.getElementById("authBtn");
  if (!btn) return;

  if (isLoggedIn) {
    btn.textContent = "Logout";
    btn.onclick = logout;
  } else {
    btn.textContent = "Login";
    btn.onclick = showLogin;
  }
}

/* ================= LOGIN (BACKEND) ================= */

function loginUser() {
  const email = document.getElementById("loginId").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.token) {
        alert(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("profile", JSON.stringify({
        loggedIn: true,
        token: data.token,
        email: data.user.email,
        institute: data.user.institute
      }));

      document.getElementById("profileIcon").classList.remove("hidden");
      document.getElementById("profileName").textContent = data.user.email;

      updateAuthButton(true);
      showStudy();
    })
    .catch(() => alert("Backend not reachable"));
}

/* ================= SIGNUP (BACKEND) ================= */

function signupUser() {
  const email = document.getElementById("signupId").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();
  const institute = document.getElementById("signupInstitute").value.trim();

  if (!email || !password || !institute) {
    alert("All fields are required");
    return;
  }

  fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, institute })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message !== "Registration successful") {
        alert(data.message || "Registration failed");
        return;
      }
      alert("Registration successful. Please login.");
      showLogin();
    })
    .catch(() => alert("Backend not reachable"));
}

/* ================= RESET PASSWORD (BACKEND) ================= */

function resetPassword() {
  const email = document.getElementById("forgotId").value.trim().toLowerCase();
  const password = document.getElementById("newPassword").value.trim();

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  fetch("http://localhost:5000/api/auth/forgot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.message) {
        alert("Reset failed");
        return;
      }
      alert(data.message);
      showLogin();
    })
    .catch(() => alert("Backend not reachable"));
}

/* ================= LOGOUT ================= */

function logout() {
  localStorage.removeItem("profile");
  document.getElementById("profileIcon").classList.add("hidden");
  updateAuthButton(false);
  showHome();
}

/* ================= STUDY FLOW ================= */

function updateProfile(data) {
  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  localStorage.setItem("profile", JSON.stringify({ ...profile, ...data }));
}

function openArts() {
  updateProfile({ stream: "Arts" });
  hideAll();
  document.getElementById("arts").classList.add("active");
}

function openScience() {
  updateProfile({ stream: "Science" });
  hideAll();
  document.getElementById("science").classList.add("active");
}

function openCS() {
  updateProfile({ stream: "Computer Science" });
  hideAll();
  document.getElementById("cs").classList.add("active");
}

function selectSubject(subject) {
  updateProfile({ subject });
  hideAll();
  document.getElementById("semester").classList.add("active");
}

function selectSemester(sem) {
  updateProfile({ semester: sem });
  hideAll();
  document.getElementById("options").classList.add("active");
}

/* ================= NOTES ================= */

function openNotes() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile || !profile.loggedIn) {
    showLogin();
    return;
  }

  hideAll();
  document.getElementById("notes-chapters").classList.add("active");
}

function openChapter(chapter) {
  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const stream = profile.stream?.toLowerCase();
  const subject = profile.subject?.toLowerCase();

  if (!stream || !subject) {
    alert("Select stream & subject first");
    return;
  }

  window.open(`pdf/${stream}/${subject}/notes/chapter-${chapter}.pdf`, "_blank");
}

/* ================= SYLLABUS ================= */

function openSyllabus() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile || !profile.loggedIn) {
    showLogin();
    return;
  }

  if (profile.subject === "Biology" || profile.subject === "Botany") {
    window.open("pdf/botany/syllabus/botany-syllabus.pdf", "_blank");
  } else {
    alert("Syllabus not uploaded for this subject yet");
  }
}

/* ================= PYQ ================= */

function openPYQ() {
  alert("Previous Year Questions will be available soon");
}

/* ================= SESSION CHECK ================= */

window.addEventListener("DOMContentLoaded", () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  if (profile && profile.loggedIn) {
    document.getElementById("profileIcon").classList.remove("hidden");
    document.getElementById("profileName").textContent = profile.email;
    updateAuthButton(true);
  } else {
    updateAuthButton(false);
  }
});
