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
        const slideItem = document.createElement('li');
        slideItem.classList.add('slide');
        slideItem.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        const img = document.createElement('div');
        img.classList.add('slide__img');
        img.style.background ='url(https://image.tmdb.org/t/p/w780' + movie.poster_path+')';
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.style.backgroundRepeat = 'no-repeat';

        const content = document.createElement('div');
        content.classList.add('slide__content');

        const title = document.createElement('h2');
        title.classList.add('hero__title');
        title.classList.add('hero__title--ellipsis');
        const titleValue = document.createTextNode(movie.title);
        const description = document.createElement('p');
        description.classList.add('hero__description')
        const descriptionValue = document.createTextNode(movie.overview);

        const btn = document.createElement('button');
        btn.classList.add('hero__tag');
        const btnValue = document.createTextNode('Now Playing');

        btn.appendChild(btnValue);
        description.appendChild(descriptionValue);
        title.appendChild(titleValue);

        
        content.appendChild(btn);
        content.appendChild(title);
        content.appendChild(description);

        slideItem.appendChild(img);
        slideItem.appendChild(content);

        container.appendChild(slideItem);
    });
}

function getAndRenderMoviePosters (array, container) {
    container.innerHTML = '';

    array.forEach( movie => {
        const movieYear = new Date(movie.release_date).getFullYear();

        const article = document.createElement('article');
        article.classList.add('carousel__item');
        article.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

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

        const scoreContainer = document.createElement('div');
        scoreContainer.classList.add('movie__score-container');

        const iconStar = document.createElement('span');
        iconStar.classList.add('material-symbols-outlined');
        iconStar.classList.add('icon-score');
        const iconStarValue = document.createTextNode('star');

        const score = document.createElement('span');
        score.classList.add('movie_score');
        const scoreValue = document.createTextNode(movie.vote_average.toFixed(1));

        
        score.appendChild(scoreValue);
        iconStar.appendChild(iconStarValue);
        scoreContainer.appendChild(iconStar);
        scoreContainer.appendChild(score);
        year.appendChild(yearValue);
        moreDetailContainer.appendChild(year);
        moreDetailContainer.appendChild(scoreContainer);
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

function getAndRenderCast (array, container) {
    container.innerHTML = '';

    array.forEach( cast => {

        const article = document.createElement('article');
        article.classList.add('carousel__item');
        // article.addEventListener('click', () => {
        //    location.hash = '#movie=' + movie.id;
        // });

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('cast__img-container');

        const img = document.createElement('img');
        img.classList.add('movie__img');
        img.setAttribute('alt', cast.name);
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + cast.profile_path);

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('cast__name-container');

        const name = document.createElement('span');
        // name.classList.add('movie__year');
        const nameValue = document.createTextNode(cast.name);

        const character = document.createElement('span');
        character.classList.add('cast__character');
        const characterValue = document.createTextNode(cast.character);

        
        name.appendChild(nameValue);
        character.appendChild(characterValue);
        nameContainer.appendChild(name);
        nameContainer.appendChild(character);
        imgContainer.appendChild(img);
        article.appendChild(imgContainer);
        article.appendChild(nameContainer);

        container.appendChild(article);
    });
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
    const movieYear = new Date(movie.release_date).getFullYear();

    movieDetailTitle.textContent = movie.title; 
    movieDetailImg.style.background = `url(https://www.themoviedb.org/t/p/w780${ movie.backdrop_path })`;
    movieDetailImg.style.backgroundSize = 'cover';
    movieDetailImg.style.backgroundPosition = 'center';
    movieDetailImg.style.backgroundRepeat = 'no-repeat';
    movieDetailYear.textContent = movieYear;
    movieDetailRuntime.textContent = movie.runtime;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);
    getAndRenderCategories(movie.genres, movieDetailCategoriesList);
    movieOverview.textContent = movie.overview;

    getCastMovieByIdDetail(id);
    getRelatedMoviesById(id);
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
    if (query) {
        const { data } = await api('/search/movie', {
            params: {
                query, // query: query, El parametro se llama igual que el nombre del parametro.
            },
        });

        const movies = data.results;

        getAndRenderMoviePosters(movies, sectionGrid);
    }
    
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