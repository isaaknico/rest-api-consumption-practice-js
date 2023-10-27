const api = axios.create({ // Instancia de axios
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});


// Utils

function getAndRenderSlides (array, container) {
    container.innerHTML = '';

    array.forEach( movie => {
        const li = slideTemplate.content.cloneNode(true);

        li.querySelector('.slide').addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });
        li.querySelector('.slide__img').style.background ='url(https://image.tmdb.org/t/p/w780' + movie.poster_path + ')';
        li.querySelector('.slide__img').style.backgroundSize = 'cover';
        li.querySelector('.slide__img').style.backgroundPosition = 'center';
        li.querySelector('.slide__img').style.backgroundRepeat = 'no-repeat';
        li.querySelector('.hero__tag').textContent = 'Now playing';
        li.querySelector('.hero__title').textContent = movie.title;
        li.querySelector('.hero__description').textContent = movie.overview;
        li.querySelector('.hero__description').classList.remove('skeleton');
        li.querySelector('.hero__description').classList.remove('skeleton__text');
        container.append(li);
    });
}

function getAndRenderMoviePosters (array, container) {
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    container.innerHTML = '';

    array.forEach( movie => {
        const movieYear = new Date(movie.release_date).getFullYear();
        const article = moviePosterTemplate.content.cloneNode(true);

        article.querySelector('.carousel__item').addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });
        const srcImg = movie.poster_path 
            ? 'https://image.tmdb.org/t/p/w300' + movie.poster_path 
            : 'https://www.svgrepo.com/show/370055/film.svg';
        const img = article.querySelector('.movie__img');
        img.src = srcImg;
        img.addEventListener('load', () => img.classList.remove('skeleton'));
        article.querySelector('.movie__title').textContent = movie.title;
        article.querySelector('.movie__year').textContent = movieYear
            ? movieYear
            : 'NA';
        article.querySelector('.icon-score').textContent = 'star';
        article.querySelector('.movie__score').textContent = movie.vote_average
            ? movie.vote_average.toFixed(1)
            : 'NR';
        container.append(article);
    });
}

function getAndRenderCategories (array, container) {
    container.innerHTML = '';

    array.forEach( element => {
        const li = categoryTemplate.content.cloneNode(true);

        li.querySelector('.carousel__item').addEventListener('click', () => {
            const name = element.name.replace(' ', '-');
            location.hash = `#category=${ element.id }-${ name }`;
        });
        li.querySelector('.category').classList.remove('skeleton');
        li.querySelector('.category').classList.remove('skeleton__category');
        li.querySelector('.category').textContent = element.name;
        container.append(li);
    });
}

function getAndRenderCast (array, container) {
    container.innerHTML = '';

    array.forEach( cast => {
        const article = castTemplate.content.cloneNode(true);
        const srcImg = cast.profile_path 
            ? 'https://image.tmdb.org/t/p/w500' + cast.profile_path 
            : 'https://www.svgrepo.com/show/458421/user-cicrle.svg';
        const img = article.querySelector('.movie__img');
        img.src = srcImg;
        img.addEventListener('load', () => img.classList.remove('skeleton'));
        article.querySelector('.cast__name').textContent = cast.name;
        article.querySelector('.cast__character').textContent = cast.character;
        container.append(article);
    });
}

// Clone the template for loading skeletons
function renderSkeletons (template, container, num) {
    container.innerHTML = '';

    for (let i = 0; i < num; i++) {
        container.append(template.content.cloneNode(true));
    }
}


// Llamados a la API

async function getNowPlayingMoviesHome (region) {
    const { data } = await api('/movie/now_playing', {
        params: {
            region,
        },
    });
    const movies = data.results;

    getAndRenderSlides(movies, slidesContainerHome);
}

async function getTrendingMoviesHome () {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    getAndRenderMoviePosters(movies, trendingMoviesCarousel);
}

async function getCategoriesMoviesHome () {
    const { data } = await api('/genre/movie/list');
    const categories = data.genres;

    getAndRenderCategories(categories, categoriesCarousel);
}

async function getMovieById (id) {
    const { data: movie } = await api('/movie/' + id); // Axios recibe obj data y se renombra como movie.
    const movieYear = new Date(movie.release_date).getFullYear()
    console.log(movie);

    heroMovieDetail.innerHTML = '';
    const movieDetail = movieDetailTemplate.content.cloneNode(true);
    const srcImg = movie.backdrop_path
        ? `https://www.themoviedb.org/t/p/w780${ movie.backdrop_path }`
        : 'https://www.svgrepo.com/show/370055/film.svg';
    const img = movieDetail.querySelector('.movie__img');
    img.style.backgroundImage = `url(${ srcImg })`;
    const cloneImg = new Image();
    cloneImg.src = srcImg;
    cloneImg.addEventListener('load', () => img.classList.remove('skeleton'));
    movieDetail.querySelector('.movie__title').textContent = movie.title;
    movieDetail.querySelector('.movie__year').textContent = movieYear
        ? movieYear
        : 'Not Available';
    movieDetail.querySelector('.movie__runtime').textContent = movie.runtime
        ? movie.runtime + ' m'
        : 'Unknown';
    movieDetail.querySelector('.movie__icon-score').textContent = 'star';
    movieDetail.querySelector('.movie__score').textContent = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : 'No Rating';
    getAndRenderCategories(movie.genres, movieDetail.querySelector('.movie__categories'));
    heroMovieDetail.append(movieDetail);

    actionsDetailContainer.innerHTML = '';
    const movieMoreDetail = movieMoreDetailTemplate.content.cloneNode(true);
    movieMoreDetail.querySelector('.movie__overview').textContent = movie.overview;
    movieMoreDetail.querySelector('.movie__overview').classList.remove('skeleton');
    movieMoreDetail.querySelector('.movie__overview').classList.remove('skeleton__text');
    actionsDetailContainer.append(movieMoreDetail);
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
    const { data } = await api('/search/movie', {
        params: {
            query, // query: query, El parametro se llama igual que el nombre del parametro.
        },
    });
    const movies = data.results;

    getAndRenderMoviePosters(movies, sectionGrid);
}

async function getTrendingMovies () {
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    getAndRenderMoviePosters(movies, sectionGrid);
}

async function getCategoriesMovies () {
    const { data } = await api('/genre/movie/list');
    const categories = data.genres;

    getAndRenderCategories(categories, sectionGrid);
} 

async function getRelatedMoviesById (id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    getAndRenderMoviePosters(relatedMovies, relatedMoviesDetailCarousel);
}

async function getCastMovieByIdDetail (id) {
    const { data } = await api(`/movie/${id}/credits`);
    const castf = data.cast;

    getAndRenderCast(castf, castMovieDetailCarousel);
}

async function getCastMovieById (id) {
    const { data } = await api(`/movie/${id}/credits`);
    const castf = data.cast;

    getAndRenderCast(castf, sectionGrid);
}