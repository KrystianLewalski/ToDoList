{
    const tasks = [
        {
            content: "zrobić coś",
            done: false,
        },
        {
            content: "zrobić drugie coś",
            done: true,
        },
    ];

    const addnewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done")

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list list__item">
            <button class="list__button--add js-done">${task.done ? '🗸' : ''}</button>
            <span class= "list ${task.done ? "list__item--done" : "list"}">${task.content}
            </span>
            <button class="list__button--remove js-remove">🗑️</button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

       bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addnewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form")

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}