window.addEventListener('DOMContentLoaded', navigator, false); // Llama a funcion al cargar la página
window.addEventListener('hashchange', navigator, false);

function navigator () {
    // Valida el hash actual y llama a la funcion de la pagina que le corresponde

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailPage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
}

// Páginas
function trendsPage () {
    console.log('TRENDS');
}

function searchPage () {
    console.log('SEARCH');
}

function movieDetailPage () {
    console.log('MOVIE');
}

function categoryPage () {
    console.log('CATEGORIES')
}

function homePage () {
    console.log('HOME');
    
    getTrendingMoviesHome();
    getCategoriesMoviesHome();
}