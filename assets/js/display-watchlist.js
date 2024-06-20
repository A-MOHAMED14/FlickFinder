// DOM ELEMENTS
const watchlistEl = document.querySelector("#watchlist");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

let responseArr = [];

// localStorage.clear();

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
  for (let i = 0; i < responseArr.length; i++) {
    // store data to be displayed in to variables
    const savedMedia = responseArr[i];

    const title = savedMedia.title;
    const rating = savedMedia.vote_average;
    const posterPathURL = savedMedia.poster_path;

    // Create DOM elements
    const savedMediaEl = document.createElement("div");
    const savedMediaImgEl = document.createElement("div");
    const savedMediaInfoEl = document.createElement("div");

    const titleEl = document.createElement("h4");
    const ratingEl = document.createElement("p");
    const removeBtnEl = document.createElement("button");
    const posterImgEl = document.createElement("img");

    titleEl.textContent = title;
    ratingEl.textContent = `⭐ ${rating}`;
    removeBtnEl.textContent = "Remove";
    removeBtnEl.setAttribute("data-id", savedMedia.id);
    posterImgEl.src = `${TMDB_BASE_IMG_URL}/${posterPathURL}`;
    posterImgEl.alt = title;
    posterImgEl.setAttribute("data-id", savedMedia.id);

    // Add content to the DOM elements
    savedMediaImgEl.append(posterImgEl);
    savedMediaInfoEl.append(titleEl);
    savedMediaInfoEl.append(ratingEl);
    savedMediaInfoEl.append(removeBtnEl);

    savedMediaEl.append(savedMediaImgEl);
    savedMediaEl.append(savedMediaInfoEl);

    watchlistEl.append(savedMediaEl);

    savedMediaEl.setAttribute("style", "margin-bottom: 60px");
    posterImgEl.setAttribute(
      "style",
      "border-radius: 10px ; transition: transform 0.3s ease"
    );
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

    removeBtnEl.setAttribute(
      "style",
      "margin-top: 20px; padding: 5px 7px; font-weight: bold; color: black; background-color: rgb(90, 223, 176); border: none; border-radius: 5px "
    );

    removeBtnEl.addEventListener("click", () => {
      let mediaIdArr = JSON.parse(localStorage.getItem("searchedmedia"));
      const btnClickedId = removeBtnEl.getAttribute("data-id");

      // Find the index of the mediaId in the array
      const index = mediaIdArr.findIndex(
        (id) => id.toString() === btnClickedId
      );

      if (index !== -1) {
        // Remove the media ID from the array
        mediaIdArr.splice(index, 1);

        // Update local storage
        localStorage.setItem("searchedmedia", JSON.stringify(mediaIdArr));

        // Remove the media element from the DOM
        savedMediaEl.remove();
      }
    });

    posterImgEl.addEventListener("click", (event) => {
      const uniqueId = event.target.getAttribute("data-id");

      const queryString = `../media-selected.html?external_source=${uniqueId}`;
      location.assign(queryString);
    });

    posterImgEl.addEventListener("mouseover", () => {
      posterImgEl.style.transform = "scale(1.1)";
    });

    posterImgEl.addEventListener("mouseout", () => {
      posterImgEl.style.transform = "scale(1)";
    });
  }
}
