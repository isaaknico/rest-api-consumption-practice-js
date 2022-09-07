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

    movies.forEach( movie => {
        const carousel = document.querySelector('#trendingMovies .carousel');

        const carouselItem = document.createElement('article');
        carouselItem.classList.add('carousel__item');

        const element = document.createElement('div');
        element.classList.add('movie');

        const img = document.createElement('img');
        img.classList.add('movie__img');
        img.setAttribute('alt', movie.title);
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        element.appendChild(img);
        carouselItem.appendChild(element);
        carousel.appendChild(carouselItem);
    });
}

async function getCategoriesMoviesHome () {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach( element => {
        const carousel = document.querySelector('#categoriesMoviesHome .carousel');

        const carouselItem = document.createElement('li');
        carouselItem.classList.add('carousel__item');

        const category = document.createElement('a');
        category.classList.add('category');

        const categoryName = document.createTextNode(element.name);
        
        category.appendChild(categoryName);
        carouselItem.appendChild(category);
        carousel.appendChild(carouselItem);
    })
}