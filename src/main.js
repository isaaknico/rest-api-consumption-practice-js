const api = axios.create({ // Instancia de axios
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// Utils

function getAndRenderMoviePosters (array, container) {
    container.innerHTML = '';

    array.forEach( movie => {
        const movieYear = new Date(movie.release_date).getFullYear();

        const article = document.createElement('article');
        article.classList.add('carousel__item');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('movie__img-container');

        const img = document.createElement('img');
        img.classList.add('movie__img');
        img.setAttribute('alt', movie.title);
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const title = document.createElement('p');
        title.classList.add('movie__title');
        const titleValue = document.createTextNode(movie.title);

        const moreDetailContainer = document.createElement('div');
        moreDetailContainer.classList.add('movie__more-detail');

        const year = document.createElement('span');
        year.classList.add('movie__year');
        const yearValue = document.createTextNode(movieYear);

        const score = document.createElement('span');
        score.classList.add('movie_score');
        const scoreValue = document.createTextNode(movie.vote_average.toFixed(1));

        const iconStar = document.createElement('span');
        iconStar.classList.add('material-symbols-outlined');
        iconStar.classList.add('material-symbols-outlined--primary');
        const iconStarValue = document.createTextNode('star');

        iconStar.appendChild(iconStarValue);
        score.appendChild(iconStar);
        year.appendChild(yearValue);
        moreDetailContainer.appendChild(year);
        score.appendChild(scoreValue);
        moreDetailContainer.appendChild(score);
        imgContainer.appendChild(img);
        article.appendChild(imgContainer);
        title.appendChild(titleValue);
        article.appendChild(title);
        article.appendChild(moreDetailContainer);

        container.appendChild(article);
    });
}

function getAndRenderCategories (array, container) {
    container.innerHTML = '';

    array.forEach( element => {

        const carouselItem = document.createElement('li');
        carouselItem.classList.add('carousel__item');

        const category = document.createElement('a');
        category.classList.add('category');
        category.addEventListener('click', () => {
            const name = element.name.replace(' ', '-');
            location.hash = `#category=${ element.id }-${ name }`;
        });

        const categoryName = document.createTextNode(element.name);
        
        category.appendChild(categoryName);
        carouselItem.appendChild(category);
        container.appendChild(carouselItem);
    })
}

// Llamados a la API

async function getTrendingMoviesHome () {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    console.log(movies);

    getAndRenderMoviePosters(movies, trendingMoviesCarousel);
}

async function getCategoriesMoviesHome () {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    getAndRenderCategories(categories, categoriesCarousel);
}

async function getMoviesByCategory (id) {
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id,
        }
    });

    const movies = data.results;

    getAndRenderMoviePosters(movies, sectionGrid);
}

async function getMoviesBySearch (query) {
    const { data } = await api('search/movie', {
        params: {
            query, // query: query, El parametro se llama igual que el nombre del parametro.
        },
    });
    
    const movies = data.results;

    getAndRenderMoviePosters(movies, sectionGrid);
}

async function getTrendingMovies () {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    console.log(movies);

    getAndRenderMoviePosters(movies, sectionGrid);
}