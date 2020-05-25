
// Variable 
const newTaakbtn = document.querySelector("#nieuwe-taak button");
const listUL = document.getElementById("todo-lijst");
const toDoList = document.getElementById("todo-lijst")


// De functie die de binnen gekomen json omzet naar list items naar DOM zet 
const getTasksToDom = async () => {
    //oproepen van de dataabse
    const tasks = await getTasks();
    console.log(tasks);
    // loop voor de taken naar de DOM te zetten
    tasks.forEach(item => {
        // items die nog niet zijn gedaan "done: False"
        if (item.done == false) {
            const newLi = document.createElement("li");
            const newA = document.createElement("a");
            const newInput = document.createElement("input");
            const newCheckbox = document.createElement("input");
            newLi.id = item.id;
            newCheckbox.type = "checkbox";
            newInput.type = "image";
            newInput.src = "trash-delete-icon.jpg"
            newInput.height = "20";
            //toevoegen van de eventlistner met de delete functie erin 
            newInput.addEventListener("click", event => {
                deleteTasks(item.id);
                toDoList.innerHTML = "";
                setTimeout(() => getTasksToDom(), 500);
            })
            //toevoegen van de evenlistner met de delete en update functie erin
            newCheckbox.addEventListener("click", event => {
                const addUpdateTask = async () => {
                    deleteTasks(item.id);
                    const postTaskInfo = { "description": item.description, "done": true };
                    const newTaskPosten = await updateTask(postTaskInfo)
                    toDoList.innerHTML = "";
                    setTimeout(() => getTasksToDom(), 500);
                }
                addUpdateTask();
            })
            //de nieuwe elementen naar de DOM sturen  
            newA.innerHTML = `${item.description}  `;
            listUL.appendChild(newLi);
            newLi.appendChild(newCheckbox);
            newLi.appendChild(newA);
            newLi.appendChild(newInput);
            // items die zijn gedaan "done: true"
        } else {
            const newLi = document.createElement("li");
            const newA = document.createElement("a");
            const newInput = document.createElement("input");
            const newCheckbox = document.createElement("input");
            newLi.id = item.id;
            newCheckbox.type = "checkbox";
            newInput.type = "image";
            newInput.src = "trash-delete-icon.jpg"
            newInput.height = "20";
            newCheckbox.checked = true;
            //toevoegen van de eventlistner met de delete functie erin
            newInput.addEventListener("click", event => {
                deleteTasks(item.id);
                toDoList.innerHTML = "";
                setTimeout(() => getTasksToDom(), 500);
            })
            //toevoegen van de evenlistner met de delete en update functie erin
            newCheckbox.addEventListener("click", event => {
                const addUpdateTask = async () => {
                    deleteTasks(item.id);
                    const postTaskInfo = { "description": item.description, "done": false };
                    const newTaskPosten = await updateTask(postTaskInfo)
                    toDoList.innerHTML = "";
                    setTimeout(() => getTasksToDom(), 500);
                }
                addUpdateTask();
            })
            //de nieuwe elementen naar de DOM sturen 
            newA.innerHTML = `<s> ${item.description}</s>  `;
            listUL.appendChild(newLi);
            newLi.appendChild(newCheckbox);
            newLi.appendChild(newA);
            newLi.appendChild(newInput);
        }

    })
}
// De funtie die de items naar de DOM zet
getTasksToDom();

//functie die een nieuwe taak die via input binnenkomt naar database stuurt 
const addNewTask = async () => {
    const newTask = document.getElementById("input").value;
    console.log(newTask);
    const postTaskInfo = { "description": newTask, "done": false };
    const newTaskPosten = await postTasks(postTaskInfo)
    toDoList.innerHTML = "";
    setTimeout(() => getTasksToDom(), 500);
}
// Evenlistner die getrikkert wordt door de add task button met de naar database functie
newTaakbtn.addEventListener("click", event => {
    addNewTask();
})
// poging om de script DRY te maken
    // const NewElementsToDom = (id, description, done) => {
    //     const newLi = document.createElement("li");
    //     const newA = document.createElement("a");
    //     const newInput = document.createElement("input");
    //     const newCheckbox = document.createElement("input");
    //     newLi.id = id;
    //     newCheckbox.type = "checkbox";
    //     newInput.type = "image";
    //     newInput.src = "trash-delete-icon.jpg"
    //     newInput.height = "20";
    //     newInput.addEventListener("click", event => {
    //         deleteTasks(id);
    //         toDoList.innerHTML = "";
    //         setTimeout(() => getTasksToDom(), 500);
    //     })
    //     //toevoegen van de evenlistner met de delete en update functie erin
    //     newCheckbox.addEventListener("click", event => {
    //         const addUpdateTask = async () => {
    //             deleteTasks(id);
    //             const postTaskInfo = { "description": description, "done": done };
    //             const newTaskPosten = await updateTask(postTaskInfo)
    //             toDoList.innerHTML = "";
    //             setTimeout(() => getTasksToDom(), 500);
    //         }
    //         addUpdateTask();
    //     })
    //     if (done == false) {
    //         newA.innerHTML = `${description}  `;
    //     } else {
    //         newA.innerHTML = `<s> ${description}</s>  `;
    //     }

    //     listUL.appendChild(newLi);
    //     newLi.appendChild(newCheckbox);
    //     newLi.appendChild(newA);
    //     newLi.appendChild(newInput);
    // }
