// Botones
searchBtn.addEventListener('click', () => {
    searchInputValue = searchInput.value.trim();
    const value = searchInputValue.split(" ").join("-");
    location.hash = '#search=' + value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

headerArrow.addEventListener('click', () => {
    // Valida si al regresar saldrá de la app
    if (document.domain !== '127.0.0.1') {
        location.hash = '#home';
    } else {
        history.back();
    }
});

prevBtn.addEventListener('click', () => {
    const slideWidth = slidesContainerHome.clientWidth; //slide.clientWidth
    slidesContainerHome.scrollLeft -= slideWidth;
});

nextBtn.addEventListener('click', () => {
    const slideWidth = slidesContainerHome.clientWidth;
    slidesContainerHome.scrollLeft += slideWidth;
});

// Navegación
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
        relatedMoviesDetailCarousel.scrollTo(0, 0);
        castMovieDetailCarousel.scrollTo(0,0);
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }

    window.scrollTo(0, 0);
}

// Páginas
function trendsPage () {
    console.log('TRENDS');

    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');

    heroHomeSection.classList.add('inactive');
    heroHomeSection.classList.remove('hero--detailView');
    
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    genericListSection.classList.remove('section--list-search-container');
    movieDetailSection.classList.add('inactive');

    sectionTitle.innerHTML = 'TRENDS';

    getTrendingMovies();
}

function searchPage () {
    console.log('SEARCH');

    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.remove('inactive');

    heroHomeSection.classList.add('inactive');
    heroHomeSection.classList.remove('hero--detailView');
    
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    genericListSection.classList.add('section--list-search-container');
    movieDetailSection.classList.add('inactive');

    // Ejemplo: location.hash = '#search=smile'
    const [_, query] = location.hash.split('='); // ['#search', 'smile']
    getMoviesBySearch(query);
}

function movieDetailPage () {
    console.log('MOVIE');

    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');
    
    sliderWrapperHome.classList.add('inactive');
    // heroImg.style.background = ''; // Limpia img de hero cuando no estemos 
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    heroTagsContainer.classList.add('inactive');

    // Ejemplo: location.hash = '#movie=762968'
    const [_, movieId] = location.hash.split('='); // ['#search', '762968']
    getMovieById(movieId);
}

function categoryPage () {
    console.log('CATEGORY');
    
    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');

    heroHomeSection.classList.add('inactive');
    heroHomeSection.classList.remove('hero--detailView');
    
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    genericListSection.classList.remove('section--list-search-container');
    movieDetailSection.classList.add('inactive');

    // Obtiene id y nombre de categoria a partir del hash (El hash viene de obtener y listar las categorias en main.js)
    // Ejemplo: location.hash = '#category=12-TV Movie'
    const [_, categoryData] = location.hash.split('='); // ['#category', '12-TV-Movie' ]
    const [categoryId, ...rest] = categoryData.split('-'); // ['12', 'TV', 'Movie]

    sectionTitle.innerHTML = rest.join(' '); // eliminar %20(espacios) o '_' de strings

    getMoviesByCategory(categoryId);
}

function homePage () {
    console.log('HOME');

    headerSection.classList.remove('header--detailView');
    headerArrow.classList.add('inactive');
    headerLogo.classList.remove('inactive');
    headerIcon.classList.remove('inactive');
    searchFormSection.classList.remove('inactive');

    sliderWrapperHome.classList.remove('inactive');
    sliderWrapperHome.classList.remove('hero--detailView');
    heroImg.style.background = ''; // Limpia img de hero cuando no estemos en movieDetail

    trendingMoviesHomeSection.classList.remove('inactive');
    categoriesHomeSection.classList.remove('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getNowPlayingMoviesHome('US');
    getTrendingMoviesHome();
    getCategoriesMoviesHome();
}