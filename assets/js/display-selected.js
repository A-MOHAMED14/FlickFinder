// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

const SearchQueryParam = document.location.search;
const mediaId = SearchQueryParam.slice(17, SearchQueryParam.length);
console.log(mediaId, "<-----");

const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

fetchMediaDetails();

function fetchMediaDetails() {
  const apiURL = `${TMDB_API_BASE_URL}/movie/${mediaId}?api_key=${TMDB_API_KEY}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
