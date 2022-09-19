// Botones
searchBtn.addEventListener('click', () => {
    const searchInputValue = searchInput.value.trim();
    const value = searchInputValue.split(" ").join("-");
    location.hash = '#search=' + value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

categoriesBtn.addEventListener('click', () => {
    location.hash = '#categories';
});

headerArrow.addEventListener('click', () => {
    // Valida si al regresar saldrá de la app
    if (document.domain !== '127.0.0.1') {
        location.hash = '#home';
    } else {
        console.log(history.back);
        history.back();
    }
});

homeNavbarBtn.addEventListener('click', () => {
    location.hash = '#home';
});

exploreNavbarBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

searchNavbarBtn.addEventListener('click', () => {
    location.hash = '#search=';
});

castMovieDetailBtn.addEventListener('click', () => {
    // Ejemplo: location.hash = '#movie=762968'
    const [_, movieId] = location.hash.split('='); // ['#movie', '762968']
    location.hash = '#cast=' + movieId;
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
    } else if (location.hash.startsWith('#cast=')) {
        castPage();
    } else if (location.hash.startsWith('#categories')) {
        categoriesPage();
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

    sliderHomeSection.classList.add('inactive');
    sliderHomeSection.classList.remove('hero--detailView');
    
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

    sliderHomeSection.classList.add('inactive');
    sliderHomeSection.classList.remove('hero--detailView');
    
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    genericListSection.classList.add('section--list-search-container');
    sectionGrid.innerHTML = 'Aun no has buscado nada.';
    movieDetailSection.classList.add('inactive');

    // Ejemplo: location.hash = '#search=smile'
    const [_, query] = location.hash.split('='); // ['#search', 'smile']
    
    sectionTitle.innerHTML = 'Search: ' + query;
    getMoviesBySearch(query);
}

function movieDetailPage () {
    console.log('MOVIE');

    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');
    
    sliderHomeSection.classList.add('inactive');
    // heroImg.style.background = ''; // Limpia img de hero cuando no estemos 
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    heroTagsContainer.classList.add('inactive');

    // Ejemplo: location.hash = '#movie=762968'
    const [_, movieId] = location.hash.split('='); // ['#movie', '762968']
    getMovieById(movieId);
}

function castPage () {
    console.log('CAST');

    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');

    sliderHomeSection.classList.add('inactive');
    sliderHomeSection.classList.remove('hero--detailView');
    
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    genericListSection.classList.remove('section--list-search-container');
    movieDetailSection.classList.add('inactive');

    sectionTitle.innerHTML = 'CAST';

    // Ejemplo: location.hash = '#cast=762968'
    const [_, movieId] = location.hash.split('='); // ['#cast', '762968']
    getCastMovieById(movieId);
}

function categoriesPage () {
    console.log('CATEGORIES');

    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');

    sliderHomeSection.classList.add('inactive');
    sliderHomeSection.classList.remove('hero--detailView');
    
    trendingMoviesHomeSection.classList.add('inactive');
    categoriesHomeSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    genericListSection.classList.remove('section--list-search-container');
    movieDetailSection.classList.add('inactive');

    sectionTitle.innerHTML = 'CATEGORIES';

    getCategoriesMovies();
}

function categoryPage () {
    console.log('CATEGORY');
    
    headerSection.classList.add('header--detailView');
    headerArrow.classList.remove('inactive');
    headerLogo.classList.add('inactive');
    headerIcon.classList.add('inactive');
    searchFormSection.classList.add('inactive');

    sliderHomeSection.classList.add('inactive');
    sliderHomeSection.classList.remove('hero--detailView');
    
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

    sliderHomeSection.classList.remove('inactive');
    sliderHomeSection.classList.remove('hero--detailView');
    heroImg.style.background = ''; // Limpia img de hero cuando no estemos en movieDetail

    trendingMoviesHomeSection.classList.remove('inactive');
    categoriesHomeSection.classList.remove('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getNowPlayingMoviesHome('US');
    getTrendingMoviesHome();
    getCategoriesMoviesHome();
}