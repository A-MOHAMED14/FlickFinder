// DOM elements
const resultsEl = document.querySelector("#results");
const searchFormEl = document.querySelector("#search-form");

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
    })
    .catch((error) => {
      console.error(`Error fetching data: ${error}`);
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
  fetchMedia();
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

function handleMediaSelected(uniqueId) {
  console.log(uniqueId, "<======");

  const queryString = `../media-selected.html?external_source=${uniqueId}`;
  location.assign(queryString);
}
