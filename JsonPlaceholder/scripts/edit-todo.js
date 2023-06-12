console.log("js working");
const editformEl = document.getElementById("editform");
const taskIdEl = document.getElementById("taskId");
const searchBtn = document.getElementById("search");
const userIdEl = document.getElementById("userId");
const titleEl = document.getElementById("title");
const completedEl = document.getElementById("completed");
const editBtn = document.getElementById("edit");
const errMsgEl = document.getElementById("errMsg");
editformEl.style.display = "none";
searchBtn.addEventListener("click", async () => {
  editformEl.style.display = "inherit";
  const taskIdVal = taskIdEl.value;
  const promise = await fetch(`http://localhost:3000/todos/${taskIdVal}`);
  const task = await promise.json();
  userIdEl.value = task.userId;
  titleEl.value = task.title;
  completedEl.value = task.completed;
  taskIdEl.readOnly = true;
});

editBtn.addEventListener("click", () => {
  const userIdVal = userIdEl.value;
  const titleVal = titleEl.value;
  const completedVal = completedEl.value;
  const taskIdVal = taskIdEl.value;
  const url = `http://localhost:3000/todos/${taskIdVal}`;
  if (userIdVal === "" || titleVal === "" || completedVal === "") {
    alert("Please fill out the form.");
    return;
  }
  const data = {
    userId: userIdVal,
    id: taskIdVal,
    title: titleVal,
    completed: completedVal,
  };
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((task) => {
      errMsgEl.innerHTML = `Task was successfully changed`;
      console.log(task);
    })
    .catch((err) => {
      errMsgEl.innerHTML = "An error occurred. ";
    });
});
