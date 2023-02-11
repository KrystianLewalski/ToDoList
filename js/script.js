{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));

        render();
    };

    const hideAllDoneTasks = () => {
            hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToogleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done")

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const bindCompleteAllTasksEvents = () => {
        const completeAllTasksButton = document.querySelector(".js-completeAllTasks");

        if (completeAllTasksButton) {
            completeAllTasksButton.addEventListener("click", markAllTasksDone);
        };
    };

    const bindHideDoneTasksEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", hideAllDoneTasks);
        };
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list${task.done && hideDoneTasks ? "list__item--hidden" : ""} list__item">
            <button class="list__button--add js-done">${task.done ? "🗸" : ""}</button>
            <span class= "list ${task.done ? "list__item--done" : "list"}">${task.content}
            </span>
            <button class="list__button--remove js-remove">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const htmlString = tasks < 1 ? "" : `
            <button class="section__buttons js-hideDoneTasks">
            ${hideDoneTasks === false ? "Ukryj" : "Pokaż"} ukończone
            </button>
            <button class="section__buttons js-completeAllTasks" 
           ${tasks.every(({ done }) => done) ? "disabled" : ""}> 
            Ukończ wszystkie 
            </button>
            `;
        document.querySelector(".js-buttons").innerHTML = htmlString;
    };


    const render = () => {
        renderTask();
        renderButtons();

        bindRemoveEvents();
        bindToogleDoneEvents();
        bindCompleteAllTasksEvents();
        bindHideDoneTasksEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}