console.log("js Works");

const userNameEl = document.getElementById("userName");
const studentRadio = document.getElementById("student");
const instructorRadio = document.getElementById("instructor");
const enterBtn = document.getElementById("enter");

enterBtn.addEventListener("click", () => {
  if (userNameEl.value === "") {
    alert("Please complete the form");
    return;
  }
  sessionStorage.setItem("Name", userNameEl.value);
  if (studentRadio.checked) sessionStorage.setItem("Role", "Student");
  else sessionStorage.setItem("Role", "Instructor");
  location.href = "./info.html";
});
