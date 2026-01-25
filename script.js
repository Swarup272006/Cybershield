const password = document.getElementById("password");

function logActivity(type, severity, description) {
  const logs = JSON.parse(localStorage.getItem("activityLogs")) || [];

  logs.unshift({
    id: Date.now(),
    time: new Date().toLocaleString(),
    type,
    severity,
    description,
    status: "Resolved"
  });

  localStorage.setItem("activityLogs", JSON.stringify(logs));
}


/* ========= PASSWORD RULES ========= */
const rules = {
  len: p => p.length >= 12,
  upper: p => /[A-Z]/.test(p),
  lower: p => /[a-z]/.test(p),
  num: p => /[0-9]/.test(p),
  special: p => /[^A-Za-z0-9]/.test(p),
  common: p => !["password","123456","qwerty","admin"].includes(p.toLowerCase()),
  seq: p => !/(012|123|234|345|456|567|678|789|abc|qwe)/i.test(p)
};

/* ========= LIVE CRITERIA UPDATE ========= */
password.addEventListener("input", () => {
  Object.keys(rules).forEach(id => {
    const el = document.getElementById(id);
    if (rules[id](password.value)) {
      el.textContent = "✅ " + el.textContent.slice(2);
      el.style.color = "#4ade80";
    } else {
      el.textContent = "❌ " + el.textContent.slice(2);
      el.style.color = "#f87171";
    }
  });
});

/* ========= ANALYZE BUTTON ========= */
document.querySelector(".analyze-btn").onclick = () => {
  const pwd = password.value;
  if (!pwd) return;

  let severity = "LOW";
  if (pwd.length < 10) severity = "MEDIUM";
  if (pwd.length < 6) severity = "HIGH";

  logActivity(
    "Password Check",
    severity,
    `Password strength analyzed. Length: ${pwd.length}`
  );
};

/* ========= TOGGLE PASSWORD ========= */
document.getElementById("toggle").onclick = () => {
  password.type = password.type === "password" ? "text" : "password";
};

/* ========= ADMIN MODAL ========= */
function openAdmin() {
  document.getElementById("adminModal").style.display = "flex";
}

function closeAdmin() {
  document.getElementById("adminModal").style.display = "none";
}

/* ========= ADMIN LOGIN (BACKEND READY) ========= */
function loginAdmin() {
  // Authentication will be handled by backend
  window.location.href = "admin.html";
}

function forgotPassword() {
  alert("Password reset will be handled by backend (demo)");
}

