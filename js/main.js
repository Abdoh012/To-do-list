const input = document.querySelector("input"); // Input field to enter tasks
const btn = document.querySelector("button"); //
const tasksContainer = document.querySelector(".tasks");
let tasksArr = [];
let allTasksArr = [];
// Window onload
window.onload = () => {
    // If local storage contains items show it
  if (localStorage.length > 0) {
    tasksContainer.innerHTML = localStorage.getItem("allTasks");
    allTasksArr = localStorage.getItem("allTasksArr").split(",");
  }
  isTaskCompleted();
  removeTask();
};

// Add done class to the clicked it and remove it when it is clicked again
function isTaskCompleted() {
  const tasks = document.querySelectorAll(".tasks > div"); // Tasks
  tasks.forEach((task) => {
    task.addEventListener("click", (e) => {
      task.classList.toggle("done");
      // show checked image if the task contains done class and unchecked image if the task does not contains done class
      if (task.classList.contains("done")) {
        let uncheckedImg = task.children[0].children[0];
        let checkedImg = task.children[0].children[1];
        uncheckedImg.classList.remove("active");
        checkedImg.classList.add("active");
      } else {
        let uncheckedImg = task.children[0].children[0];
        let checkedImg = task.children[0].children[1];
        uncheckedImg.classList.add("active");
        checkedImg.classList.remove("active");
      }
      localStorage.setItem("allTasks", tasksContainer.innerHTML);
    });
  });
}

// Remove the task when the cancel button is clicked and remove it from the all tasks array
function removeTask() {
  const removeBtns = document.querySelectorAll(".cancel");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // Show popup confirmation to delete
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          btn.parentElement.remove();
          localStorage.setItem("allTasks", tasksContainer.innerHTML);
          let taskToRemove = btn.previousElementSibling.children[2].textContent;
          if (allTasksArr.includes(taskToRemove)) {
            allTasksArr.splice(allTasksArr.indexOf(taskToRemove), 1);
          }
          localStorage.setItem("allTasksArr", allTasksArr);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    });
  });
}

// Show popup Task Added!
function addedSuccefully() {
  Swal.fire({
    title: "Task Added!",
    icon: "success",
    draggable: true,
  });
}

// Show popup Task already exists!
function alreadyExists() {
  Swal.fire({
    icon: "error",
    title: "Oops...\nThe task already exists",
  });
}

// Add task when clicking add button
function addTask() {
  
  btn.addEventListener("click", () => {
    // Add task when the input field is not empty
    if (input.value) {
      tasksArr = [];
      tasksArr.push(input.value);
      // Add the task to the task container

      if (!allTasksArr.includes(input.value)) {
        tasksContainer.innerHTML += `
<div class="space-between">
  <div class="task-text-img center">
    <img class="active" src="./images/unchecked.png" alt="" />
    <img src="./images/checked.png" alt="" />
      <p>${tasksArr[0]}</p>
  </div>
  <button class="cancel center">
    <i class="fa fa-close" aria-hidden="true"></i>
  </button>
</div>`;
        allTasksArr.push(input.value);
        localStorage.setItem("allTasksArr", allTasksArr);
        addedSuccefully();
      } else alreadyExists();

    //   Check if the task is completed and apply new style
      isTaskCompleted();

      // Save all tasks in localStorage
      localStorage.setItem("allTasks", tasksContainer.innerHTML);
      // Remove task
      removeTask();
    }
  });
}


addTask();
