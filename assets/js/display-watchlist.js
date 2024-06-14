// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w300";

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
