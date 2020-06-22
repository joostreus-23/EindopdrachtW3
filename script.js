// Variable
const newTaakbtn = document.querySelector("#nieuwe-taak button");
const listUL = document.getElementById("todo-lijst");
const toDoList = document.getElementById("todo-lijst");

//functie die de to do list ververst
const refreshTheList = () => {
  toDoList.innerHTML = "";
  setTimeout(() => ElementsToDom(), 500);
};

//functie die de taak true of false maakt
const addUpdateTask = async (item, done) => {
  deleteTasks(item.id);
  const postTaskInfo = { description: item.description, done: done };
  const newTaskPosten = await updateTask(postTaskInfo);
  refreshTheList();
  return newTaskPosten;
};

//functie die een nieuwe taak die via input binnenkomt naar database stuurt
const addNewTask = async () => {
  const newTask = document.getElementById("input").value;
  console.log(newTask);
  const postTaskInfo = { description: newTask, done: false };
  const newTaskPosten = await postTasks(postTaskInfo);
  refreshTheList();
  return newTaskPosten;
};
// Evenlistner die getrikkert wordt door de add task button met de naar database functie
newTaakbtn.addEventListener("click", (event) => {
  addNewTask();
});

const ElementsToDom = async () => {
  //oproepen van de dataabse
  const tasks = await getTasks();
  console.log(tasks);
  tasks.forEach((item) => {
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    const newInput = document.createElement("input");
    const newCheckbox = document.createElement("input");
    newLi.id = item.id;
    newCheckbox.type = "checkbox";
    newInput.type = "image";
    newInput.src = "trash-delete-icon.jpg";
    newInput.height = "20";
    newInput.addEventListener("click", (event) => {
      deleteTasks(item.id);
      refreshTheList();
    });
    //toevoegen van de evenlistner met de delete en update functie erin

    if (item.done == false) {
      newA.innerHTML = `${item.description}  `;
      newCheckbox.addEventListener("click", (event) => {
        addUpdateTask(item, true);
      });
    } else {
      newA.innerHTML = `<s> ${item.description}</s>  `;
      newCheckbox.checked = true;
      newCheckbox.addEventListener("click", (event) => {
        addUpdateTask(item, false);
      });
    }

    listUL.appendChild(newLi);
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newA);
    newLi.appendChild(newInput);
  });
};

ElementsToDom();
