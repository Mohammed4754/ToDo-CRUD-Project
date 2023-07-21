let tasks = [
  /*
  {
    title: "قراءة كتاب",
    date: "30/07/2023",
    isDone: false,
  },
  {
    title: "لعب بلاستيشن",
    date: "30/07/2023",
    isDone: true,
  },
  {
    title: "شرب القهوة",
    date: "30/07/2023",
    isDone: false,
  },
*/
];

//==================================================================================

function getTasksFromStorage() {
  let dataFromStorage = JSON.parse(localStorage.getItem("tasks"));

  tasks = dataFromStorage ?? [];
}
getTasksFromStorage();

//==================================================================================

function addTasksToPage() {
  document.querySelector(".tasks").innerHTML = "";

  let index = 0;

  for (let task of tasks) {
    let content = `<div class="task ${task.isDone ? "is-done" : ""}">
 <div class="icons">
   <span class="update" onclick="updateTask(${index})"
     ><i class="fa-solid fa-pen" style="color: #fff"></i
   ></span>
   ${
     task.isDone
       ? `<span class="not-done" onclick="completeTask(${index})"
       ><i class="fa-solid fa-xmark" style="color: #fff"></i
     ></span>`
       : `<span class="done" onclick="completeTask(${index})"
   ><i class="fa-solid fa-check" style="color: #fff"></i
 ></span>`
   }
   
   <span class="delete" onclick="deleteTask(${index})"
     ><i class="fa-solid fa-trash-can" style="color: #fff"></i
   ></span>
 </div>
 <div class="text">
   <h2>${task.title}</h2>
   <div class="date">
     <span>${task.date}</span>
     <span><i class="fa-regular fa-calendar-days"></i></span>
   </div>
 </div>
</div>`;

    document.querySelector(".tasks").innerHTML += content;

    index++;
  }
}

addTasksToPage();

//==================================================================================

let addSpan = document.querySelector(".header span");

addSpan.addEventListener("click", function () {
  let taskName = prompt("الرجاء ادخال عنوان المهمة");

  let dateNow = new Date();
  let days = dateNow.getDate();
  let months = dateNow.getMonth() + 1;
  let year = dateNow.getFullYear();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let fullDate = `التاريخ ${days < 9 ? `0${days}` : days}/${
    months < 9 ? `0${months}` : months
  }/${year} الوقت ${hours}:${minutes}`;

  let taskObj = {
    title: taskName,
    date: fullDate,
    isDone: false,
  };

  tasks.push(taskObj);

  storeTasks();

  addTasksToPage();
});

//==================================================================================

function deleteTask(index) {
  let delTask = tasks[index];

  let isConfirmed = confirm(`هل انت متأكد من حذف المهمة ${delTask.title}`);

  if (isConfirmed) {
    tasks.splice(index, 1);

    storeTasks();
  }

  addTasksToPage();
}

//==================================================================================

function updateTask(index) {
  let updateName = prompt(
    "الرجاء ادخال العنوان الجديد للمهمة",
    tasks[index].title
  );
  tasks[index].title = updateName;
  storeTasks();

  addTasksToPage();
}

//==================================================================================

function completeTask(index) {
  let task = tasks[index];

  //task.isDone = task.isDone ? false : true;
  task.isDone = !task.isDone;

  storeTasks();

  addTasksToPage();
}

//==================================================================================

function storeTasks() {
  let tasksString = JSON.stringify(tasks);

  localStorage.setItem("tasks", tasksString);
}
