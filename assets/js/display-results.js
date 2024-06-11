// DOM elements
const resultsEl = document.querySelector("#results");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

const SearchQueryParam = document.location.search;
const titleQueryStr = SearchQueryParam.slice(1, SearchQueryParam.length);
console.log(titleQueryStr);

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
      displayResults(data);
    });
}

function displayResults(data) {
  const results = data.results;

  for (let i = 0; i < results.length; i++) {
    const title = results[i].title || results[i].name;
    const releaseDate = results[i].release_date;
    const overview = results[i].overview;
    const placeholderImg = "../images/placeholder.jpg";

    const posterPathURL = results[i].poster_path
      ? `${TMDB_BASE_IMG_URL}${results[i].poster_path}`
      : placeholderImg;

    const resultContainerEl = document.createElement("div");
    const searchedResultImg = document.createElement("div");
    const searchedResultInfo = document.createElement("div");

    const searchedResultPoster = document.createElement("img");
    const searchedResultTitle = document.createElement("h3");
    const searchedResultReleaseDate = document.createElement("p");
    const searchedResultOverview = document.createElement("p");

    searchedResultPoster.src = posterPathURL;
    searchedResultTitle.textContent = title;
    searchedResultReleaseDate.textContent = releaseDate;
    searchedResultOverview.textContent = overview;

    searchedResultImg.append(searchedResultPoster);

    searchedResultInfo.append(searchedResultTitle);
    searchedResultInfo.append(searchedResultReleaseDate);
    searchedResultInfo.append(searchedResultOverview);

    resultContainerEl.append(searchedResultImg, searchedResultInfo);

    resultsEl.append(resultContainerEl);

    resultContainerEl.setAttribute(
      "style",
      "display: flex; background-color: rgb(59, 59, 59); border: 2px solid rgb(124, 124, 124); border-radius: 7px; margin: 15px 0px; padding: 15px; box-shadow: 1px 1px 5px rgb(90, 223, 176)"
    );
    searchedResultInfo.setAttribute("style", "margin-left: 20px;");
    searchedResultPoster.setAttribute(
      "style",
      "height: 200px; border-radius: 5px"
    );
    searchedResultReleaseDate.setAttribute(
      "style",
      "margin: 10px 0px; color: grey; font-size: 1.25rem"
    );
    searchedResultOverview.setAttribute(
      "style",
      "font-size: 1.35rem; color: lightgrey "
    );
  }
}
