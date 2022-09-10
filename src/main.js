const api = axios.create({ // Instancia de axios
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

async function getTrendingMoviesHome () {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    console.log(movies);

    movies.forEach( movie => {
        const movieYear = new Date(movie.release_date).getFullYear();

        const sectionCarousel = document.querySelector('#trendingMoviesHome .section__carousel');

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel__item');

        const element = document.createElement('article');

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
        element.appendChild(imgContainer);
        title.appendChild(titleValue);
        element.appendChild(title);
        element.appendChild(moreDetailContainer);

        carouselItem.appendChild(element);
        sectionCarousel.appendChild(carouselItem);
    });
}

async function getCategoriesMoviesHome () {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach( element => {
        const sectionCarousel = document.querySelector('#categoriesHome .section__carousel');

        const carouselItem = document.createElement('li');
        carouselItem.classList.add('carousel__item');

        const category = document.createElement('a');
        category.classList.add('category');

        const categoryName = document.createTextNode(element.name);
        
        category.appendChild(categoryName);
        carouselItem.appendChild(category);
        sectionCarousel.appendChild(carouselItem);
    })
}