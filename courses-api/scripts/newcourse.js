console.log("js working");
const deptEl = document.getElementById("dept");
const courseNumEl = document.getElementById("courseNum");
const courseNameEl = document.getElementById("courseName");
const instructorEl = document.getElementById("instructor");
const startDateEl = document.getElementById("startDate");
const numDaysEl = document.getElementById("numDays");
const addBtn = document.getElementById("add");
const errMsgEl = document.getElementById("errMsg");
const departments = {
  CompSci: "Computer Science",
  Math: "Math",
  English: "English",
  Finance: "Finance",
};

for (let prop in departments) {
  const opt = new Option(departments[prop], prop);
  deptEl.appendChild(opt);
}

addBtn.addEventListener("click", () => {
  const deptVal = deptEl.value;
  const courseNumVal = courseNumEl.value;
  const courseNameVal = courseNameEl.value;
  const instructorVal = instructorEl.value;
  const startDateVal = startDateEl.value;
  const numDaysVal = numDaysEl.value;
  if (
    deptVal === "choose" ||
    courseNumVal === "" ||
    courseNameVal === "" ||
    instructorVal === "" ||
    startDateVal === "" ||
    numDaysVal === ""
  ) {
    alert("Please complete the form.");
    return;
  }

  const details = {
    dept: deptVal,
    courseNum: courseNumVal,
    courseName: courseNameVal,
    instructor: instructorVal,
    startDate: startDateVal,
    numDays: numDaysVal,
  };
  url = "http://localhost:8081/api/courses";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(details),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((course) => {
      errMsgEl.innerHTML = `Course was successfully added, redirecting to home.`;
      console.log(course);
      setTimeout(() => {
        window.location.href = "./index.html";
      }, "2000");
    })
    .catch((err) => {
      errMsgEl.innerHTML = "An error occurred. ";
    });
});
