// DOM elements

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

const SearchQueryParam = document.location.search;
const titleQueryStr = SearchQueryParam.slice(1, SearchQueryParam.length);

const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

fetchMedia();

function fetchMedia() {
  const apiURL = `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&${titleQueryStr}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

console.log(titleQueryStr);
