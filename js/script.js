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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };
    init();
}