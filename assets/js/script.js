const TMBD_API_KEY = "7b928560fcfa8991abeaa28e946a0252";
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const title = "Peaky Blinders";
const encondedTitle = encodeURIComponent(title);

function fetchMovie() {
  const apiURL = `${TMDB_API_BASE_URL}/search/movie?api_key=${TMBD_API_KEY}&query=${encondedTitle}`;

  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

// fetchMovie();
