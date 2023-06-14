const urlParams = new URLSearchParams(location.search);
const deleteMsgEl = document.getElementById("deleteMsg");
const courseTbl = document.getElementById("course");
const deleteBtnEl = document.getElementById("deleteBtn");
const errMsgEl = document.getElementById("errMsg");
const headers = {
  id: "Course ID",
  dept: "Department",
  courseNum: "Course Number",
  courseName: "Course Name",
  instructor: "Instructor",
};
let id = -1;
if (urlParams.has("courseid") === true) {
  id = urlParams.get("courseid");
  const tableBodyEl = courseTbl.createTBody();
  deleteMsgEl.textContent = `Are you sure you want to delete the following:`;
  fetch(`http://localhost:8081/api/courses/${id}`)
    .then((response) => response.json())
    .then((course) => {
      for (let prop in headers) {
        const row = tableBodyEl.insertRow();
        const headerCell = row.insertCell();
        const dataCell = row.insertCell();

        headerCell.outerHTML = `<th>${headers[prop]}:</th>`;
        dataCell.textContent = course[prop];
      }
    });
} else {
  deleteMsgEl.textContent =
    "Please select a valid course from the main course list";
  deleteBtnEl.textContent = "Course List";
}
deleteBtnEl.addEventListener("click", () => {
  if (id === -1) {
    window.location.href = "./index.html";
    return;
  }
  url = `http://localhost:8081/api/courses/${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      errMsgEl.innerHTML = `Course was successfully Removed, redirecting to home.`;
      console.log(errMsgEl.textContent);
      setTimeout(() => {
        window.location.href = "./index.html";
      }, "1500");
    })
    .catch((err) => {
      errMsgEl.innerHTML = "An error occurred.";
    });
});
