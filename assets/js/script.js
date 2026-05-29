const myProjects = [
    { 
        id: 1, 
        title: "Виконання лабораторної роботи", 
        category: "HTML",
        description: "Проєкт написаний на <strong>HTML</strong> з використанням теорії наданої на парах.",
        image: "assets/images/project-1.jpg"
    },
    { 
    id: 2, 
    title: "Стилізація сторінок портфоліо", 
    category: "HTML",
    description: "Проєкт присвячений опануванню базової типографіки, box model та адаптивного компонування.",
    image: "assets/images/project-2.jpg"
    }
];

let appState = {
    searchTerm: "",
    activeCategory: "all"
};

document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
    bindEvents();
    applyStateAndRender();
});

function bindEvents() {
    const searchInput = document.getElementById("search-input");
    const themeBtn = document.getElementById("themeBtn");
    const toolbar = document.querySelector(".toolbar");

    searchInput.addEventListener("input", (e) => {
        appState.searchTerm = e.target.value;
        applyStateAndRender();
    });

    toolbar.addEventListener("click", (e) => {
        const filterBtn = e.target.closest(".filter-btn");
        if (!filterBtn) return;

        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        filterBtn.classList.add("active");

        appState.activeCategory = filterBtn.dataset.category;
        applyStateAndRender();
    });

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
    });
}

function applyStateAndRender() {
    let filtered = myProjects.filter(project => {
        const matchesCategory = appState.activeCategory === "all" || project.category === appState.activeCategory;
        const matchesSearch = project.title.toLowerCase().includes(appState.searchTerm.toLowerCase().trim());
        return matchesCategory && matchesSearch;
    });

    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    filtered.forEach(project => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <h3>${project.title}</h3>
            <span class="badge">${project.category}</span>
            <p>${project.description}</p>
            <img src="${project.image}" alt="Скріншот ${project.title}" class="project-img">
            <a href="#" class="btn" data-action="details" data-id="${project.id}">Деталі</a>
        `;
        container.appendChild(card);
    });

    container.removeAttribute("data-has-listener");
    container.onclick = (e) => {
        const detailsBtn = e.target.closest("[data-action='details']");
        if (!detailsBtn) return;
        e.preventDefault();
        const projId = detailsBtn.dataset.id;
        const selectedProj = myProjects.find(p => p.id == projId);
        alert(`Перегляд проєкту: ${selectedProj.title}\nКатегорія: ${selectedProj.category}`);
    };
}

function loadSettings() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
}
