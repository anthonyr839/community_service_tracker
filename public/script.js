// ============================================================
// public/script.js
// Handles all user interactions on the page:
//   - Submitting new service records
//   - Loading all records into the table
//   - Generating the hours report
// ============================================================
//
// TASK (FIX BUGS): There are TWO bugs in this file.
//     Find them, fix them, and write a short comment next to each
//     fix explaining what was wrong.
//
//     Hint 1: In the form submit handler, one field is missing from
//             the object sent to the server. Check index.html to see
//             all the fields the form collects, then make sure every
//             field is included in the fetch body.
//
//     Hint 2: loadReport() fetches from the wrong URL.
//             The server route for the report is GET /api/service/report
//             (Check routes/service.js to confirm after you fix that bug too.)
//
// ============================================================


// -- SUBMIT FORM ---------------------------------------------
document.getElementById("serviceForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const student_name  = document.getElementById("student_name").value;
  const student_id    = document.getElementById("student_id").value;
  const activity_date = document.getElementById("activity_date").value;
  const hours         = document.getElementById("hours").value;
  const recipient     = document.getElementById("recipient").value;

  const res = await fetch("/api/service", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // BUG 1 is inside the object below (one field is missing)
    body: JSON.stringify({ student_name, student_id, activity_date, hours, recipient }),
  });

  const msg = document.getElementById("formMessage");
  if (res.ok) {
    msg.textContent = "Record saved!";
    msg.style.color = "green";
    e.target.reset();
  } else {
    msg.textContent = "Something went wrong. Check the console.";
    msg.style.color = "red";
  }
});


// -- LOAD ALL RECORDS ----------------------------------------
document.getElementById("loadRecordsBtn").addEventListener("click", loadRecords);

async function loadRecords() {
  const res     = await fetch("/api/service");
  const records = await res.json();

  const tbody = document.getElementById("recordsBody");
  tbody.innerHTML = "";

  records.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + r.student_name + "</td>" +
      "<td>" + r.student_id + "</td>" +
      "<td>" + (r.activity_date ? r.activity_date.slice(0, 10) : "") + "</td>" +
      "<td>" + r.hours + "</td>" +
      "<td>" + r.recipient + "</td>";
    tbody.appendChild(tr);
  });

  document.getElementById("recordsTable").classList.remove("hidden");
}


// -- HOURS REPORT --------------------------------------------
document.getElementById("loadReportBtn").addEventListener("click", loadReport);

async function loadReport() {
  // BUG 2 is on the line below (wrong URL)
  const res    = await fetch("/api/service/report");
  const report = await res.json();

  const tbody = document.getElementById("reportBody");
  tbody.innerHTML = "";

  report.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + row.student_name + "</td>" +
      "<td>" + row.student_id + "</td>" +
      "<td>" + row.total_hours + "</td>";
    tbody.appendChild(tr);
  });

  document.getElementById("reportTable").classList.remove("hidden");
}
