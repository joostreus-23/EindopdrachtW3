
// functie die de taken uit de database halen
const getTasks = async () => {
    try {
        const apiUrl = "https://wincacademydatabase.firebaseio.com/Joost/Tasks.json";
        const result = await fetch(apiUrl, { method: "GET" });
        const jsonData = await result.json();
        // console.log("Dit staat er in de Tasks json data ", jsonData);
        let tasks = Object.keys(jsonData).map(key => ({
            id: key,
            description: jsonData[key].description,
            done: jsonData[key].done
        }));
        // console.log("After the tasks array", tasks);
        return tasks

    } catch (error) {
        console.log(error);
    }
};
// functie die taken toevoegd aan de database
const postTasks = async (description) => {
    try {
        const apiUrl = "https://wincacademydatabase.firebaseio.com/Joost/Tasks.json";
        const result = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(description),
        });
        result
        const updatedData = await getTasks();
        return updatedData;
    } catch (error) {
        console.log(error);
    }
};
// functie die taken uit de database haalt
const deleteTasks = async (id) => {
    try {
        const apiUrl = `https://wincacademydatabase.firebaseio.com/Joost/Tasks/${id}.json`;
        const result = await fetch(apiUrl, {
            method: 'DELETE',
        })
        result
        const updatedData = await getTasks();
        return updatedData;
    } catch (error) {
        console.log(error);
    }
};
// functie die de taken update in de database
const updateTask = async (description) => {
    try {
        fetch("https://wincacademydatabase.firebaseio.com/Joost/Tasks.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(description),
        })
    } catch (error) {
        console.log(error);
    }
};
