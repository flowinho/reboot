function toggleDarkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}

function handleDarkmode(){
    var element = document.body;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        element.classList.toggle("dark-mode");
    }
}