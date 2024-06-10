// DOM elements
const trendingWeekEl = document.querySelector("#trending-week");

// GLOBAL VARIABLES
const TMDB_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const title = "Peaky Blinders";
const encondedTitle = encodeURIComponent(title);
const MAX_TRENDING_MEDIA = 21;
const TMDB_BASE_IMG_URL = "https://image.tmdb.org/t/p/w200";

// fetchMovie();

function fetchMovie() {
  const apiURL = `${TMDB_API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encondedTitle}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

fetchTrending();

function fetchTrending() {
  const apiURL = `${TMDB_API_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
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
    });
}
