// DOM elements
const searchFormEl = document.querySelector("#search-form");
const filterBtnEl = document.querySelector("#filter-btn");
const dialogEl = document.querySelector("#dialog");
const trendingWeekEl = document.querySelector("#trending-week");
const resultsEl = document.querySelector("#results");

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
          displayFilteredMovies(data);
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });
    } else if (!genre) {
      const apiURL = `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&primary_release_year=${yearSelected}&vote_average.gte=${ratingSelected}`;

      fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
          console.log("Filtered Movies:", data);
          displayFilteredMovies(data);
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });
    } else {
      console.error(`No Movies Found`);
    }
  });
}

// -------------------------------------------------------------------------------------------------------------------------

function displayFilteredMovies(data) {
  document.querySelector("#trending-container").innerHTML = "";

  console.log("PASSED OVER FILTERED MOVIES:", data);

  const results = data.results;

  for (let i = 0; i < results.length; i++) {
    const title = results[i].title || results[i].name;
    const releaseDate = results[i].release_date;
    const overview = results[i].overview;

    const posterPathURL = `${TMDB_BASE_IMG_URL}${results[i].poster_path}`;

    const resultContainerEl = document.createElement("div");
    const searchedResultImg = document.createElement("div");
    const searchedResultInfo = document.createElement("div");

    const searchedResultPoster = document.createElement("img");
    const searchedResultTitleEl = document.createElement("p");
    const searchedResultReleaseDate = document.createElement("p");
    const searchedResultOverview = document.createElement("p");
    const viewBtnEl = document.createElement("button");

    searchedResultTitleEl.setAttribute("data-id", results[i].id);

    searchedResultPoster.src = posterPathURL;
    searchedResultTitleEl.textContent = title;
    searchedResultReleaseDate.textContent = releaseDate;
    searchedResultOverview.textContent = overview;

    searchedResultImg.append(searchedResultPoster);

    searchedResultInfo.append(searchedResultTitleEl);
    searchedResultInfo.append(searchedResultReleaseDate);
    searchedResultInfo.append(searchedResultOverview);

    resultContainerEl.append(searchedResultImg, searchedResultInfo);

    resultsEl.append(resultContainerEl);

    // Apply styles to the results elements

    resultContainerEl.setAttribute(
      "style",
      "display: flex; background-color: rgb(59, 59, 59); border: 2px solid rgb(124, 124, 124); border-radius: 7px; margin: 15px 0px; padding: 15px; box-shadow: 1px 1px 5px rgb(90, 223, 176)"
    );
    searchedResultInfo.setAttribute("style", "margin-left: 20px;");
    searchedResultPoster.setAttribute(
      "style",
      "height: 200px; border-radius: 5px"
    );

    searchedResultTitleEl.setAttribute(
      "style",
      "font-size: 1.75rem; font-weight: bold; background-color: rgb(59, 59, 59); border: none; color: rgb(90, 223, 176)"
    );

    searchedResultTitleEl.addEventListener("mouseover", () => {
      searchedResultTitleEl.style.color = "white";
    });

    searchedResultTitleEl.addEventListener("mouseout", () => {
      searchedResultTitleEl.style.color = "rgb(90, 223, 176)";
    });

    searchedResultReleaseDate.setAttribute(
      "style",
      "margin: 10px 0px; color: grey; font-size: 1.25rem"
    );

    // ----------------------------------------------------------------------------------
    // RESPONSIVE DESIGN USING MEDIA QUERIES

    // Create a CSS class for the media query
    const style = document.createElement("style");
    style.innerHTML = `
   @media (max-width: 800px) {
    .limited-overview::after {
      content: '...';
    }
   }
    @media (max-width: 530px) {
     .results-element-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px
      }
    }
   `;

    document.head.appendChild(style);

    // ----------------------------------------------------------------------------------

    // Change flex direction

    function alterFlexDirection() {
      resultContainerEl.classList.add("results-element-container");
    }

    // Update flex direction based on screen width

    function updateFlexDirection() {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 530) {
        alterFlexDirection();
      } else {
        resultContainerEl.classList.remove("results-element-container");
      }
    }

    // Alter flex direction based on initial screen width
    updateFlexDirection();

    // Update flex direction when the window is resized
    window.addEventListener("resize", updateFlexDirection);

    // ----------------------------------------------------------------------------------

    // Apply character limit for overview text
    function applyCharacterLimit(element, maxChars) {
      const originalText = element.textContent;
      if (originalText.length > maxChars) {
        element.textContent = originalText.slice(0, maxChars);
        element.classList.add("limited-overview");
      }
    }

    // Update the overview text based on screen width
    function updateOverviewText() {
      const screenWidth = window.innerWidth;

      // Adjust the character limit as needed
      if (screenWidth <= 520) {
        applyCharacterLimit(searchedResultOverview, 50);
      }

      if (screenWidth <= 800) {
        applyCharacterLimit(searchedResultOverview, 100);
      }

      // Restore the original text if necessary
      if (screenWidth > 800) {
        searchedResultOverview.textContent = overviewText;
        searchedResultOverview.classList.remove("limited-overview");
      }
    }

    // Assume 'overviewText' is the original overview text
    const overviewText = searchedResultOverview.textContent;

    searchedResultOverview.setAttribute(
      "style",
      "font-size: 1.35rem; color: lightgrey"
    );

    // Apply character limit based on initial screen width
    updateOverviewText();

    // Update the overview text when the window is resized
    window.addEventListener("resize", updateOverviewText);

    // ----------------------------------------------------------------------------------

    // Add click event to movie title for redirection

    searchedResultTitleEl.addEventListener("click", (event) => {
      console.log(event.target);
      const uniqueId = event.target.getAttribute("data-id");

      handleMediaSelected(uniqueId);
    });
  }
}
