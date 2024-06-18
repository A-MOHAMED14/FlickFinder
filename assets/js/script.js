// DOM elements
const searchFormEl = document.querySelector("#search-form");
const trendingWeekEl = document.querySelector("#trending-week");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector("#search-field").value;

  console.log(searchInputVal, "<-----");

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  const queryString = `../search-results.html?query=${searchInputVal}`;

  location.assign(queryString);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

function fetchTrending() {
  const apiURL = `${TMDB_API_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayTrending(data);
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });
}

fetchTrending();

function displayTrending(data) {
  const trendingArr = data.results;

  for (let i = 0; i < trendingArr.length; i++) {
    const posterPath = trendingArr[i].poster_path;
    const title = trendingArr[i].title || trendingArr[i].name;
    const mediaType = trendingArr[i].media_type;

    const posterEl = document.createElement("img");
    const trendingCard = document.createElement("div");
    const titleEl = document.createElement("p");
    const mediaTypeEl = document.createElement("p");

    posterEl.src = `${TMDB_BASE_IMG_URL}${posterPath}`;
    posterEl.alt = title;
    titleEl.textContent = title;
    mediaTypeEl.textContent = mediaType;

    trendingCard.append(posterEl);
    trendingCard.append(titleEl);
    trendingCard.append(mediaTypeEl);

    trendingWeekEl.append(trendingCard);

    trendingCard.setAttribute(
      "style",
      "width: 200px;text-align: center; margin: 30px"
    );

    posterEl.setAttribute("style", "border-radius: 10px");

    titleEl.setAttribute("style", "margin-top: 10px");

    mediaTypeEl.setAttribute(
      "style",
      "font-size: 1.2rem; color: grey; margin-top: 5px"
    );
  }
}

// -----------------------------------------------------------------------------------------------------------------------------
// FETCH MOVIE BY GENRE

function fetchGenreIds() {
  const apiURL = `${TMDB_API_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      const genres = data.genres;
      fetchMoviesByGenre(genres);
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });
}

fetchGenreIds();

function fetchMoviesByGenre(genres) {
  // console.log(genres, "<------");

  genres.forEach((genre) => {
    const movieGenreId = genre.id;
    const movieGenreName = genre.name;

    const apiURL = `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${movieGenreId}`;

    const movieGenreSelected = "Comedy";
    if (movieGenreName === movieGenreSelected) {
      fetch(apiURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          const moviesByGenre = data.results;
          fetchMoviesGenre(moviesByGenre);
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });
    }
  });
}

function fetchMoviesGenre(moviesByGenre) {
  console.log("------ Movies by Genre: -----", moviesByGenre);

  moviesByGenre.forEach((movie) => {
    const movieTitle = movie.title;
    // console.log(movieTitle);
  });
}

// -----------------------------------------------------------------------------------------------------------------------------

// FETCH MOVIE BY RATING

function fetchMovieRatings() {
  const movieRatingSelected = 7;

  const movieRatingLowerRange = Math.floor(movieRatingSelected);
  const movieRatingUpperRange = Math.ceil(movieRatingSelected + 0.1) - 0.1;

  const apiURL = `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&vote_average.gte=${movieRatingLowerRange}&vote_average.lte=${movieRatingUpperRange}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const ratings = data.results;
      fetchMoviesByRating(ratings);
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });
}

fetchMovieRatings();

function fetchMoviesByRating(ratings) {
  console.log("------ Movies by Rating: -----", ratings);

  ratings.forEach((rating) => {
    const movieTitle = rating.title;
    // console.log(movieTitle);
    // NEED TO DISPLAY EACH MOVIE USING EACH MOVIE TITLE ON THE RESULTS PAGE
  });
}

// -----------------------------------------------------------------------------------------------------------------------------

// FETCH MOVIE BY YEAR RELEASED

function fetchMoviesYearReleased() {
  const movieYearReleased = 1999;
  const apiURL = `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&primary_release_year=${movieYearReleased}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      const movies = data.results;
      displayMoviesByYearReleased(movies);
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });
}

fetchMoviesYearReleased();

function displayMoviesByYearReleased(movies) {
  console.log("------ Movies by Year: ------", movies);

  movies.forEach((movie) => {
    const movieTitle = movie.title;
    // console.log(movieTitle);
  });
}

// -----------------------------------------------------------------------------------------------------------------------------
