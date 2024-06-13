// DOM elements
const mediaEl = document.querySelector("#media");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

const SearchQueryParam = document.location.search;
const mediaId = SearchQueryParam.slice(17, SearchQueryParam.length);
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
      console.log(data);
    });
}

fetchRecommendations();

function displaySelectedMedia(data) {
  const selectedMedia = data;

  // Store data into variables
  const title = selectedMedia.title;
  const tagLine = selectedMedia.tagline;
  const releaseDate = selectedMedia.release_date;
  const rating = selectedMedia.vote_average;
  const status = selectedMedia.status;
  const runtime = selectedMedia.runtime;
  const country = selectedMedia.origin_country[0];
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
  const mediaContainerEl = document.createElement("div");
  const mediaBackdropImg = document.createElement("div");
  const mediaPosterImg = document.createElement("div");
  const mediaInfoEl = document.createElement("div");

  const dateReleasedEl = document.createElement("div");
  const genresEl = document.createElement("div");
  const overviewSectionEl = document.createElement("div");
  const saveMediaEl = document.createElement("div");

  const titleEl = document.createElement("h2");
  const tagLineEl = document.createElement("p");
  const releaseDateEl = document.createElement("p");
  //   const ratingEl = document.createElement("p");
  //   const statusEl = document.createElement("p");
  //   const runtimeEl = document.createElement("p");
  //   const countryEl = document.createElement("p");
  const genreEl = document.createElement("p");
  const languageEl = document.createElement("p");
  const overviewHeaderEl = document.createElement("h4");
  const overviewEl = document.createElement("p");
  const saveBtnEl = document.createElement("button");
  const backdropImgEl = document.createElement("img");
  const posterImgEl = document.createElement("img");

  // Add content to the DOM elements
  titleEl.textContent = title;
  releaseDateEl.textContent = `${releaseDate} (${country}) | ⭐ ${rating} | ${runtime} min`;

  //   ratingEl.textContent = ` - ⭐${rating}`;
  //   runtimeEl.textContent = `${runtime}m`;

  //   statusEl.textContent = status;
  //   countryEl.textContent = country;

  genreEl.textContent = `Genre: ${genre}`;

  tagLineEl.textContent = tagLine;
  overviewHeaderEl.textContent = "Overview";
  overviewEl.textContent = overview;
  languageEl.textContent = `Language: ${language}`;
  saveBtnEl.textContent = "📌 Add to Watchlist";

  backdropImgEl.src = `${TMDB_BASE_IMG_URL}/${backdropPath}`;
  posterImgEl.src = `${TMDB_BASE_IMG_URL}/${posterPath}`;

  // append created elements to mediaEl

  //   mediaBackdropImg.append(backdropImgEl); ****************************************************
  mediaPosterImg.append(posterImgEl);

  dateReleasedEl.append(titleEl);
  dateReleasedEl.append(releaseDateEl);

  genresEl.append(genreEl);

  overviewSectionEl.append(tagLineEl);
  overviewSectionEl.append(overviewHeaderEl);
  overviewSectionEl.append(overviewEl);
  overviewSectionEl.append(languageEl);
  saveMediaEl.append(saveBtnEl);
  overviewSectionEl.append(saveMediaEl);

  mediaInfoEl.append(dateReleasedEl);
  mediaInfoEl.append(genresEl);
  mediaInfoEl.append(overviewSectionEl);

  mediaEl.append(mediaPosterImg);
  mediaEl.append(mediaInfoEl);

  // Apply styling to DOM elements
  mediaPosterImg.setAttribute(
    "style",
    "margin-right: 50px; border: 5px solid rgb(90, 223, 176); border-radius: 7px; box-shadow: 3px 3px 5px white; height: fit-content"
  );

  titleEl.setAttribute(
    "style",
    "margin-bottom: 15px; color: rgb(90, 223, 176);"
  );
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

  overviewEl.setAttribute(
    "style",
    "font-size: 1.3rem; line-height: 1.6; margin-bottom: 40px"
  );

  languageEl.setAttribute(
    "style",
    "font-style: italic; font-size: 1.35rem; color: lightgrey"
  );

  saveMediaEl.setAttribute(
    "style",
    "display: flex; justify-content: flex-end; margin-top: 10px"
  );

  saveBtnEl.setAttribute(
    "style",
    "font-size: 1.05rem; font-weight: bold; padding: 10px 15px; border: none; border-radius: 7px; background-color: rgb(90, 223, 176); color: rgb(59, 59, 59); box-shadow: 4px 4px 3px lightgrey"
  );
}

displaySelectedMedia();
