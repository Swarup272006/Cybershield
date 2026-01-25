
// /* ========= INIT ========= */
// updateThreatStats();
function showThreats() {
  document.getElementById("threatsPage").style.display = "block";
  document.getElementById("activityPage").style.display = "none";
  updateThreatStats();
  setActive(0);
}

function showActivity() {
  document.getElementById("threatsPage").style.display = "none";
  document.getElementById("activityPage").style.display = "block";
  loadActivities();
  setActive(1);
}

/* ========= LOAD ACTIVITIES ========= */
function loadActivities() {
  const logs = JSON.parse(localStorage.getItem("activityLogs")) || [];
  const table = document.querySelector(".activity-table");

  table.querySelectorAll(".table-row").forEach(row => row.remove());

  logs.forEach((log, index) => {
    const row = document.createElement("div");
    row.className = "table-row";

    row.innerHTML = `
      <span>${log.time}</span>
      <span class="pill">${log.type}</span>
      <span class="badge ${log.severity.toLowerCase()}">${log.severity}</span>
      <span>${log.description}</span>
      <span class="status resolved">✔ ${log.status}</span>
      <span class="action" onclick="deleteActivity(${index})">🗑️</span>
    `;

    table.appendChild(row);
  });
}

/* ========= DELETE ACTIVITY ========= */
function deleteActivity(index) {
  let logs = JSON.parse(localStorage.getItem("activityLogs")) || [];
  logs.splice(index, 1);
  localStorage.setItem("activityLogs", JSON.stringify(logs));

  loadActivities();
  updateThreatStats();
}

/* ========= UPDATE THREAT STATS ========= */
function updateThreatStats() {
  const logs = JSON.parse(localStorage.getItem("activityLogs")) || [];

  const totalScans = logs.length;
  const threatsDetected = logs.filter(l => l.severity !== "LOW").length;
  const activeIncidents = threatsDetected;
  const alertsSent = threatsDetected;

  document.querySelectorAll(".stat-card h3")[0].textContent = totalScans;
  document.querySelectorAll(".stat-card h3")[1].textContent = threatsDetected;
  document.querySelectorAll(".stat-card h3")[2].textContent = activeIncidents;
  document.querySelectorAll(".stat-card h3")[3].textContent = alertsSent;

  const allClear = document.querySelector(".all-clear");
  allClear.style.display = threatsDetected === 0 ? "block" : "none";
}

/* ========= NAV ACTIVE ========= */
function setActive(index) {
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[index].classList.add("active");
}

function logout() {
  window.location.href = "index.html";
}

/* ========= INIT ========= */
updateThreatStats();



