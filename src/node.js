/**
 * Note: No incluir elems generados por js
 */

// Sections
const headerSection = document.querySelector('#header');
const sliderHomeSection = document.querySelector('#sliderWrapperHome');
const heroHomeSection = document.querySelector('#heroHome');
const heroDetailSection = document.querySelector('#heroDetail');
const searchFormSection = document.querySelector('#searchForm');
const trendingMoviesHomeSection = document.querySelector('#trendingMoviesHome');
const categoriesHomeSection = document.querySelector('#categoriesHome');
const genericListSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');
const actionsDetail = document.querySelector('#actionsDetail');
const actionsDetailContainer = document.querySelector('#actionsDetail .section__container');
const footerMsg = document.querySelector('#footerMsg');
const footer = document.querySelector('#footer');

// Lists & Containers
const headerContainer = document.querySelector('.header__container');
const searchFormContainer = document.querySelector('.search__container');
const slidesContainerHome = document.querySelector('#slides-container');
const heroContent = document.querySelector('.hero__content');
const heroTagsContainer = document.querySelector('.hero__tags');
const heroDataContainer = document.querySelector('.hero__data');
const heroCategories = document.querySelector('.hero__categories');
const sectionHeader = document.querySelector('.section__header');
const heroMovieDetail = document.querySelector('#movieDetail #heroDetail');
const castSectionHeader = document.querySelector('#castMovieDetail .section__header');
const trendingMoviesCarousel = document.querySelector('#trendingMoviesHome .section__carousel');
const categoriesCarousel = document.querySelector('#categoriesHome .section__carousel');
const sectionGrid = document.querySelector('.section__grid');
const movieImgContainer = document.querySelector('.movie__img-container');
const castMovieDetailCarousel = document.querySelector('#castMovieDetail .section__carousel');
const relatedMoviesDetailCarousel = document.querySelector('#relatedMoviesDetail .section__carousel');
const navbarContainer = document.querySelector('.navbar__container');
const navbarList = document.querySelector('.navbar__list');

// Elements
const headerArrow = document.querySelector('.header__arrow');
const headerLogo = document.querySelector('.header__logo');
const headerIcon = document.querySelector('.header__icon');

const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');

const slide = document.querySelector(".slide");
const prevBtn = document.getElementById("slide-arrow-prev");
const nextBtn = document.getElementById("slide-arrow-next");

const heroImg = document.querySelector('.hero__img');
const heroTitle = document.querySelector('.hero__title');
const heroDescription = document.querySelector('.hero__description');
const heroBtn = document.querySelector('.hero__btn');

const sectionTitle = document.querySelector('#genericList .section__title');
const sectionText = document.querySelector('.section__text');
const trendingBtn = document.querySelector('#trendingBtn');
const categoriesBtn = document.querySelector('#categoriesBtn');

const carouselItem = document.querySelector('.carousel__item');

const movieImg = document.querySelector('.movie__img');
const movieTitle = document.querySelector('.movie__title');
const movieYear = document.querySelector('.movie__year');
const movieScore = document.querySelector('.movie__score');

const category = document.querySelector('.category');

const movieDetailTitle = document.querySelector('#movieDetail .hero__title');
const movieDetailImg = document.querySelector('#movieDetail .hero__img');
const movieDetailYear = document.querySelector('#movieDetail .hero__year');
const movieDetailRuntime = document.querySelector('#movieDetail .hero__runtime');
const movieDetailScore = document.querySelector('#movieDetail .movie__score');
const movieDetailCategoriesList = document.querySelector('#movieDetail .movie__categories');
const movieOverview = document.querySelector('#movieOverview');
const castMovieDetailBtn = document.querySelector('#cast-btn');

const footerAuthor = document.querySelector('.footer__author');

const navbar = document.querySelector('.navbar');
const navbarItem = document.querySelector('.navbar__item');

const homeNavbarBtn = document.querySelector('#homeNavbarBtn');
const exploreNavbarBtn = document.querySelector('#exploreNavbarBtn');
const searchNavbarBtn = document.querySelector('#searchNavbarBtn');

// Templates
const slideTemplate = document.querySelector('#slide-template');
const moviePosterTemplate = document.querySelector('#poster-template');
const categoryTemplate = document.querySelector('#category-template');
const castTemplate = document.querySelector('#cast-template'); 
const movieDetailTemplate = document.querySelector('#movieDetail-template');
const movieMoreDetailTemplate = document.querySelector('#movie-more-detail-template');