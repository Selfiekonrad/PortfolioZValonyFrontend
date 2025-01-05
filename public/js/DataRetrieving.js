document.addEventListener("DOMContentLoaded", () => {
   fetchAllProjects().then( projects => {
       renderProjects(projects);
   });
});

async function fetchAllProjects() {
    const apiURL = "https://portfolio-z-valony-backend-49d545d49619.herokuapp.com/api/project?username=Selfiekonrad";

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (e) {
        console.error("Error fetching data: ", e);
        throw e;
    }
}

function renderProjects(projects) {
    const container = document.getElementById("project-container");

    projects.forEach( project => {

        // TODO check if 0 languages work
        const languageBoxHTML = project.languages.map(singleLanguage =>
            `<a class="project-language">${singleLanguage}</a>`).join("");


        container.innerHTML +=
            `<div class="project-overview">
                <div class="inside-project-overview">
                    <div class="project-column-left">
                        <div class="project-head">
                            <p class="project-title">${project.title}</p>
                            <p>${project.date}</p>
                        </div>
                        <p>${project.description}</p>
                        <div class="project-programming-language-box">
                            ${languageBoxHTML}
                        </div>
                    </div>
                    <img
                        src="${project.profilePictureUrl}"
                        alt="Project Screenshot" class="project-picture"/>
                </div>
            </div>`;
    });
}