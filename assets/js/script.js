// DOM elements
const searchFormEl = document.querySelector("#search-form");
const filterBtnEl = document.querySelector("#filter-btn");
const dialogEl = document.querySelector("#dialog");
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
  // console.log("GENRE IDs:", genres, "<------");

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
  // console.log("------ Movies by Genre: -----", moviesByGenre);

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
  // console.log("------ Movies by Rating: -----", ratings);

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
  // console.log("------ Movies by Year: ------", movies);

  movies.forEach((movie) => {
    const movieTitle = movie.title;
    // console.log(movieTitle);
  });
}

// -----------------------------------------------------------------------------------------------------------------------------

// For each of the above, you need to figure out a way display the filter selected on the results page.

// POSSIBLE SOLUTION IS TO STORE EACH OF THE MOVIE TITLES INTO AN ARRAY AND SEND IT OVER TO THE RESULST.HTML FILE
// AND DISPLAY EACH MOVIE BY FETCHING EACH MOVIE IN THE ARRAY USING IT'S TITLE - MAY NEED TO USE ASYNC AWAIT FOR THIS.

// -----------------------------------------------------------------------------------------------------------------------------

filterBtnEl.addEventListener("click", (event) => {
  event.preventDefault();
  displayDialogBox();
});

function displayDialogBox() {
  // Genres dropdown
  const genres = [
    "-",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  // Create the form element
  const filterFormEl = document.createElement("form");

  // Create the label element
  const genreLabelEl = document.createElement("label");
  genreLabelEl.setAttribute("for", "genre-names");
  genreLabelEl.textContent = "Genre:";

  // Create the select element
  const genreSelectEl = document.createElement("select");
  genreSelectEl.setAttribute("id", "genre-names");

  // Create and append option elements to the select element
  genres.forEach((genre) => {
    const genreOptionEl = document.createElement("option");
    genreOptionEl.setAttribute("value", genre);
    genreOptionEl.textContent = genre;
    genreSelectEl.append(genreOptionEl);
  });

  // Append the label and select elements to the form
  filterFormEl.append(genreLabelEl);
  filterFormEl.append(genreSelectEl);

  // -----------------------------------------------------------------------------------------------------------------------------
  // Years dropdown

  const years = [
    "-",
    1990,
    1991,
    1992,
    1993,
    1994,
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
  ];

  // Create the label element
  const yearLabelEl = document.createElement("label");
  yearLabelEl.setAttribute("for", "year-released");
  yearLabelEl.textContent = "Year:";

  // Create the select element
  const yearSelectEl = document.createElement("select");
  yearSelectEl.setAttribute("id", "year-released");

  // Create and append option elements to the select element
  years.forEach((year) => {
    const genreOptionEl = document.createElement("option");
    genreOptionEl.setAttribute("value", year);
    genreOptionEl.textContent = year;
    yearSelectEl.append(genreOptionEl);
  });

  // Append the label and select elements to the form
  filterFormEl.append(yearLabelEl);
  filterFormEl.append(yearSelectEl);

  // Ensure dialogEl is properly referenced
  dialogEl.innerHTML = ""; // Clear previous content if any
  dialogEl.append(filterFormEl);

  // -----------------------------------------------------------------------------------------------------------------------------
  // Ratings dropdown

  const ratings = ["-", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Create the label element
  const ratingLabelEl = document.createElement("label");
  ratingLabelEl.setAttribute("for", "movie-ratings");
  ratingLabelEl.textContent = "Rating:";

  // Create the select element
  const ratingSelectEl = document.createElement("select");
  ratingSelectEl.setAttribute("id", "movie-ratings");

  // Create and append option elements to the select element
  ratings.forEach((rating) => {
    const genreOptionEl = document.createElement("option");
    genreOptionEl.setAttribute("value", rating);
    genreOptionEl.textContent = rating;
    ratingSelectEl.append(genreOptionEl);
  });

  // Append the label and select elements to the form
  filterFormEl.append(ratingLabelEl);
  filterFormEl.append(ratingSelectEl);

  // -----------------------------------------------------------------------------------------------------------------------------
  // Clear previous content
  dialogEl.innerHTML = "";
  dialogEl.append(filterFormEl);

  filterFormEl.setAttribute(
    "style",
    "display: flex; justify-content: space-between"
  );

  genreLabelEl.setAttribute("style", "font-weight: bold");
  yearLabelEl.setAttribute("style", "font-weight: bold");
  ratingLabelEl.setAttribute("style", "font-weight: bold");

  dialogEl.setAttribute("style", "width: 100px");

  // Display the dialog using jQuery UI
  $("#dialog").dialog({
    width: 800,
    position: { my: "top", at: "top+28%", of: window },
    buttons: {
      Filter: function () {
        fetchFilteredMovies();
        $(this).dialog("close");
      },
    },
  });
}

// ---------------------------------------------------------------------------------------------------------------------------
function fetchGenreIds() {
  const apiURL = `${TMDB_API_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`;

  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      return data.genres;
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
    });
}

// -------------------------------------------------------------------------------------------------------------------------
// Retrieve value selected from drop down list and use them to fetch filtered movies

function fetchFilteredMovies() {
  const genreSelected = document.querySelector("#genre-names").value;
  const yearSelected = document.querySelector("#year-released").value;
  const ratingSelected = document.querySelector("#movie-ratings").value;
  console.log("Genre:", genreSelected);
  console.log("Year:", yearSelected);
  console.log("Rating:", ratingSelected);

  // Fetch the genre IDs
  fetchGenreIds().then((genres) => {
    console.log("Genres:", genres);

    const genre = genres.find((genre) => genre.name === genreSelected);

    if (genre) {
      const movieGenreId = genre.id;

      const apiURL = `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${movieGenreId}&primary_release_year=${yearSelected}&vote_average.gte=${ratingSelected}`;

      fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
          console.log("Filtered Movies:", data);
          // displayFilteredMovies(data); // Call your display function here if you have one
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });
    } else {
      console.error(`Genre "${genreSelected}" not found.`);
    }
  });
}
