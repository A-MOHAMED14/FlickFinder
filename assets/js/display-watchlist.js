// DOM ELEMENTS
const watchlistEl = document.querySelector("#watchlist");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

let responseArr = [];

// localStorage.clear();
console.log(localStorage, "<=========");

async function fetchMediaDetails() {
  // Get media ID from local storage
  const mediaIdArr = JSON.parse(localStorage.getItem("searchedmedia"));

  if (!Array.isArray(mediaIdArr)) {
    console.error("mediaIdArr is not an array.");
    return;
  }

  // Use a for loop to await each fetch request
  for (let i = 0; i < mediaIdArr.length; i++) {
    const mediaId = mediaIdArr[i];
    const apiURL = `${TMDB_API_BASE_URL}/movie/${mediaId}?api_key=${TMDB_API_KEY}`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      responseArr.push(data);
    } catch (error) {
      console.error("Error fetching media details:", error);
    }
  }

  // Call displaySavedMedia after all fetch requests are complete
  displaySavedMedia();
}

fetchMediaDetails();

function displaySavedMedia() {
  console.log(responseArr);

  for (let i = 0; i < responseArr.length; i++) {
    // store data to be displayed in to variables
    const savedMedias = responseArr;

    const title = savedMedias[i].title;
    const rating = savedMedias[i].vote_average;
    const posterPathURL = savedMedias[i].poster_path;

    // Create DOM elements
    const savedMediaEl = document.createElement("div");
    const savedMediaImgEl = document.createElement("div");
    const savedMediaInfoEl = document.createElement("div");

    const titleEl = document.createElement("h4");
    const ratingEl = document.createElement("p");
    // const removeBtnEl = document.createElement("button");
    const posterImgEl = document.createElement("img");

    titleEl.textContent = title;
    ratingEl.textContent = `⭐ ${rating}`;
    // removeBtnEl.textContent = "Remove";
    posterImgEl.src = `${TMDB_BASE_IMG_URL}/${posterPathURL}`;
    posterImgEl.alt = title;

    // Add content to the DOM elements
    savedMediaImgEl.append(posterImgEl);
    savedMediaInfoEl.append(titleEl);
    savedMediaInfoEl.append(ratingEl);
    // savedMediaInfoEl.append(removeBtnEl);

    savedMediaEl.append(savedMediaImgEl);
    savedMediaEl.append(savedMediaInfoEl);

    watchlistEl.append(savedMediaEl);

    posterImgEl.setAttribute("style", "border-radius: 10px");
    savedMediaInfoEl.setAttribute(
      "style",
      "display: flex; flex-direction: column; align-items: center; width: 200px"
    );
    titleEl.setAttribute(
      "style",
      "margin-top: 10px; text-align: center; font-size: 1.25rem"
    );
    ratingEl.setAttribute(
      "style",
      "color: grey; margin-top: 10px; font-size: 1.1rem"
    );
  }
}
