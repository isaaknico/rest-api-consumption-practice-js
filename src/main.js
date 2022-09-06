async function getTrendingMoviesHome () {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    console.log({ res, data });

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
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();

    console.log({ res, data });

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

getTrendingMoviesHome();
getCategoriesMoviesHome();