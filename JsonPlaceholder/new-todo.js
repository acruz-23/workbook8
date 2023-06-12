console.log("js working");
const userIdEl = document.getElementById("userId");
const titleEl = document.getElementById("title");
const completedEl = document.getElementById("completed");
const addBtn = document.getElementById("add");
const errMsgEl = document.getElementById("errMsg");

addBtn.addEventListener("click", () => {
  const userIdVal = userIdEl.value;
  const titleVal = titleEl.value;
  const completedVal = completedEl.value;
  const url = "http://localhost:3000/todos";
  if (userIdVal === "" || titleVal === "" || completedVal === "") {
    alert("Please fill out the form.");
    return;
  }
  const data = {
    userId: userIdVal,
    title: titleVal,
    completed: completedVal,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((task) => {
      errMsgEl.innerHTML = `Task was successfully added to ID:${task.id}.`;
      console.log(task);
    })
    .catch((err) => {
      errMsgEl.innerHTML = "An error occurred. ";
    });
});
