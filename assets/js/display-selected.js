// DOM elements
const mediaEl = document.querySelector("#media");
const recommendationsEl = document.querySelector("#recommendations");
const watchlistBtnEl = document.querySelector("#watchlist-btn");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const YT_API_KEY = "AIzaSyBkhpBJMBBVKSvH7G7xVFJjex3Q5bZc6o8";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const YT_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

const SearchQueryParam = document.location.search;
let mediaId = SearchQueryParam.slice(17, SearchQueryParam.length);
console.log(mediaId, "<-----");

const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w300";

function fetchMediaDetails() {
  const apiURL = `${TMDB_API_BASE_URL}/movie/${mediaId}?api_key=${TMDB_API_KEY}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      displaySelectedMedia(data);
    });
}

fetchMediaDetails();

function fetchRecommendations() {
  const apiURL = `${TMDB_API_BASE_URL}/movie/${mediaId}/recommendations?api_key=${TMDB_API_KEY}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      displayRecommendations(data);
    });
}

fetchRecommendations();

function displayRecommendations(data) {
  // Store required data into variables
  console.log(data);
  for (let i = 0; i < 5; i++) {
    const recommendations = data.results;
    const uniqueId = recommendations[i].id;

    const title = recommendations[i].title;
    const posterPathURL = recommendations[i].poster_path;
    const rating = recommendations[i].vote_average;

    // Create the DOM elements
    const recommendationEl = document.createElement("div");

    const posterImgEl = document.createElement("div");
    const contentEl = document.createElement("div");

    const posterEl = document.createElement("img");
    const titleBtnEl = document.createElement("button");
    const ratingEl = document.createElement("p");

    // recommendationsHeaderEl.textContent = "Recommendations";
    posterEl.src = `${TMDB_BASE_IMG_URL}/${posterPathURL}`;
    posterEl.alt = title;
    posterEl.setAttribute("data-id", uniqueId);
    titleBtnEl.textContent = title;
    ratingEl.textContent = `⭐ ${rating}`;

    // Add content to the DOM elements
    posterImgEl.append(posterEl);
    contentEl.append(titleBtnEl);
    contentEl.append(ratingEl);

    recommendationEl.append(posterImgEl);
    recommendationEl.append(contentEl);

    recommendationsEl.append(recommendationEl);

    posterEl.setAttribute("style", "height: 275px; border-radius: 7px");
    contentEl.setAttribute(
      "style",
      "width: 190px; display: flex; flex-direction: column"
    );
    titleBtnEl.setAttribute(
      "style",
      "text-align: cente; font-size: 1.1rem; margin-top: 10px; background-color: #212121; color: white; border: none"
    );
    ratingEl.setAttribute(
      "style",
      "text-align: center; font-size: 1rem; margin-top: 10px; color: lightgrey"
    );

    posterEl.addEventListener("click", (event) => {
      console.log(event.target);
      const uniqueId = event.target.getAttribute("data-id");
      mediaId = uniqueId;

      mediaEl.textContent = "";

      fetchMediaDetails();
    });

    posterEl.addEventListener("mouseover", () => {
      posterEl.style.border = "3px solid rgb(90, 223, 176)";
      posterEl.style.boxShadow = "3px 3px 3px grey";
    });

    posterEl.addEventListener("mouseout", () => {
      posterEl.style.border = "none";
      posterEl.style.boxShadow = "none";
    });
  }
}

displayRecommendations();

function displaySelectedMedia(data) {
  const selectedMedia = data;

  // Store data into variables

  const title = selectedMedia.title;
  const tagLine = selectedMedia.tagline;
  const releaseDate = selectedMedia.release_date;
  const rating = selectedMedia.vote_average;
  const runtime = selectedMedia.runtime;
  const country = selectedMedia.origin_country
    ? selectedMedia.origin_country[0]
    : "Unknown";
  const overview = selectedMedia.overview;
  const backdropPath = selectedMedia.backdrop_path;
  const posterPath = selectedMedia.poster_path;

  // retrieve the genres
  const genres = selectedMedia.genres;
  let genresArr = [];

  genres.forEach((genre) => {
    const genreType = genre.name;
    genresArr.push(genreType);
  });
  const genre = genresArr.join(", ");

  // retrieve the languages
  const languages = selectedMedia.spoken_languages;
  let languagesArr = [];

  languages.forEach((language) => {
    const languageName = language.english_name;
    languagesArr.push(languageName);
  });
  const language = languagesArr.join(", ");

  //Create DOM elements

  const mediaPosterImg = document.createElement("div");
  const mediaInfoEl = document.createElement("div");

  const dateReleasedEl = document.createElement("div");
  const genresEl = document.createElement("div");
  const overviewSectionEl = document.createElement("div");
  const saveMediaEl = document.createElement("div");

  const titleEl = document.createElement("h2");
  const tagLineEl = document.createElement("p");
  const releaseDateEl = document.createElement("p");

  const genreEl = document.createElement("p");
  const languageEl = document.createElement("p");
  const overviewHeaderEl = document.createElement("h4");
  const overviewEl = document.createElement("p");
  const trailerBtnEl = document.createElement("button");
  const saveBtnEl = document.createElement("button");
  const backdropImgEl = document.createElement("img");
  const posterImgEl = document.createElement("img");

  // Add content to the DOM elements
  titleEl.textContent = title;
  releaseDateEl.textContent = `${releaseDate} (${country}) | ⭐ ${rating} | ${runtime} min`;

  genreEl.textContent = `Genre: ${genre}`;

  tagLineEl.textContent = tagLine;
  overviewHeaderEl.textContent = "Overview";
  overviewEl.textContent = overview;
  languageEl.textContent = `Language: ${language}`;
  trailerBtnEl.textContent = "▶️ Watch trailer";
  saveBtnEl.textContent = "📌 Add to Watchlist";

  backdropImgEl.src = `${TMDB_BASE_IMG_URL}/${backdropPath}`;
  posterImgEl.src = `${TMDB_BASE_IMG_URL}/${posterPath}`;

  // append created elements to mediaEl

  mediaPosterImg.append(posterImgEl);

  dateReleasedEl.append(titleEl);
  dateReleasedEl.append(releaseDateEl);

  genresEl.append(genreEl);

  overviewSectionEl.append(tagLineEl);
  overviewSectionEl.append(overviewHeaderEl);
  overviewSectionEl.append(overviewEl);
  overviewSectionEl.append(languageEl);
  saveMediaEl.append(trailerBtnEl);
  saveMediaEl.append(saveBtnEl);
  overviewSectionEl.append(saveMediaEl);

  mediaInfoEl.append(dateReleasedEl);
  mediaInfoEl.append(genresEl);
  mediaInfoEl.append(overviewSectionEl);

  mediaEl.append(mediaPosterImg);
  mediaEl.append(mediaInfoEl);

  // RESPONSIVE DESIGN USING MEDIA QUERIES

  // Create a CSS class for the media query
  const style = document.createElement("style");
  style.innerHTML = `
 @media (max-width: 1020px) {
  .limited-overview::after {
    content: '...';
  }
 }

 @media (max-width: 850px) {
  .responsive-title {
    font-size: 1.5rem;
 }
 `;
  document.head.appendChild(style);

  // Apply styling to DOM elements
  mediaPosterImg.setAttribute(
    "style",
    "margin-right: 50px; border: 5px solid rgb(90, 223, 176); border-radius: 7px; box-shadow: 3px 3px 5px white; height: fit-content"
  );

  titleEl.setAttribute(
    "style",
    "margin-bottom: 15px; color: rgb(90, 223, 176);"
  );

  titleEl.classList.add("responsive-title");

  releaseDateEl.setAttribute(
    "style",
    "font-size: 1.2rem; color: lightgrey; margin-bottom: 15px"
  );

  genreEl.setAttribute("style", "margin-bottom: 50px");

  tagLineEl.setAttribute(
    "style",
    "font-style: italic; color: lightgray; margin-bottom: 15px; font-size: 1.3rem"
  );

  overviewHeaderEl.setAttribute("style", "margin-bottom: 10px");

  // Apply character limit
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
    if (screenWidth <= 850) {
      applyCharacterLimit(overviewEl, 70);
    }

    if (screenWidth <= 1020) {
      applyCharacterLimit(overviewEl, 110);
    }

    // Restore the original text if necessary
    if (screenWidth > 1020) {
      overviewEl.textContent = overviewText;
      overviewEl.classList.remove("limited-overview");
    }
  }

  // Assume 'overviewText' is the original overview text
  const overviewText = overviewEl.textContent;

  overviewEl.setAttribute(
    "style",
    "font-size: 1.3rem; line-height: 1.6; margin-bottom: 40px"
  );

  // Apply character limit based on initial screen width
  updateOverviewText();

  // Update the overview text when the window is resized
  window.addEventListener("resize", updateOverviewText);

  languageEl.setAttribute(
    "style",
    "font-style: italic; font-size: 1.35rem; color: lightgrey"
  );

  saveMediaEl.setAttribute(
    "style",
    "display: flex; justify-content: flex-end; margin-top: 10px"
  );

  trailerBtnEl.setAttribute(
    "style",
    "margin-right: 20px;font-size: 1.05rem; font-weight: bold; padding: 10px 15px; border: none; border-radius: 7px; background-color: rgb(90, 223, 176); color: rgb(59, 59, 59); box-shadow: 4px 4px 3px lightgrey"
  );

  saveBtnEl.setAttribute(
    "style",
    "font-size: 1.05rem; font-weight: bold; padding: 10px 15px; border: none; border-radius: 7px; background-color: rgb(90, 223, 176); color: rgb(59, 59, 59); box-shadow: 4px 4px 3px lightgrey"
  );

  saveBtnEl.addEventListener("mouseover", () => {
    saveBtnEl.style.color = "white";
    saveBtnEl.style.backgroundColor = "rgb(50, 124, 98)";
    saveBtnEl.style.boxShadow = "4px 4px 3px darkgrey";
  });

  saveBtnEl.addEventListener("mouseout", () => {
    saveBtnEl.style.color = "black";
    saveBtnEl.style.backgroundColor = "rgb(90, 223, 176)";
    saveBtnEl.style.boxShadow = "4px 4px 3px lightgrey";
  });

  // trailerBtnEl.addEventListener("click", playTheTrailer(title));

  saveBtnEl.addEventListener("click", () => {
    handleSaveBtn(selectedMedia.id);
  });
}

displaySelectedMedia();

// function playTheTrailer(title) {
//   // // Create the dialog element if it doesn't already exist
//   // if (!document.getElementById("dialog")) {
//   //   const dialogEl = document.createElement("div");
//   //   dialogEl.id = "dialog";
//   //   dialogEl.title = "Trailer";
//   //   // dialogEl.innerHTML = "<p>Trailer content goes here.</p>";
//   //   document.body.appendChild(dialogEl);
//   // }

//   // // Initialize and open the dialog
//   // $("#dialog").dialog({
//   //   autoOpen: true,
//   //   modal: true,
//   // });
//   console.log(title);
// }

// Save the media ID to local storage and load the watchlist page

function handleSaveBtn(mediaId) {
  if (mediaId) {
    let mediaArr = JSON.parse(localStorage.getItem("searchedmedia")) || [];
    if (!mediaArr.includes(mediaId)) {
      mediaArr.push(mediaId);
      localStorage.setItem("searchedmedia", JSON.stringify(mediaArr));
    } else {
      console.log("Media ID already saved");
      return;
    }
  }

  const queryString = `../watchlist.html`;
  location.assign(queryString);
}
