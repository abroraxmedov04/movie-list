// Define constants
const fragmentMain = new DocumentFragment();
const elTemplateMovieCard = document.querySelector(
  ".js-tempalte-movie-card"
).content;
const elUlWrapper = document.querySelector(".movie-list");


// Slice the movie array
const movieSliced = movies.slice(0, 40);

// Render function
function renderMovieCard(movie) {
  const { ytid, Title, imdb_rating, movie_year, runtime, Categories } = movie;
  const cloneNodeTemplate = elTemplateMovieCard.cloneNode(true);
  const imgSrc = ytid
    ? `https://img.youtube.com/vi/${ytid}/0.jpg`
    : "https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg";

  cloneNodeTemplate.querySelector(".movie-img").src = imgSrc;
  cloneNodeTemplate.querySelector(".movie-title").textContent = String(
    Title
  ).substring(0, 10);
  cloneNodeTemplate.querySelector(".movie-popularity").textContent =
    imdb_rating;
  cloneNodeTemplate.querySelector(".movie-data-release").textContent =
    movie_year;
  cloneNodeTemplate.querySelector(
    ".movie-watch-hours"
  ).textContent = `${Math.floor(runtime / 60)} h ${runtime % 60} min`;
  cloneNodeTemplate.querySelector(".movie-genres").textContent =
    Categories.replaceAll("|", " ").split(" ").splice(0, 4).join(" ");
  cloneNodeTemplate.querySelector(".js-btn-more-info").dataset.movieId = ytid;

  fragmentMain.appendChild(cloneNodeTemplate);
}

function renderListMovies(arr, node) {
  arr.forEach(renderMovieCard);
  node.appendChild(fragmentMain);
}

function findMovieById(movies, id) {
  return movies.find((movie) => movie.ytid === id);
}

// Event listener
elUlWrapper.addEventListener("click", function (event) {
  const targetEvent = event.target;
  if (targetEvent.matches(".js-btn-more-info")) {
    const itemId = targetEvent.dataset.movieId;
    const movie = findMovieById(movieSliced, itemId);
    if (movie) {
      console.log(movie);
      displayModal(movie);
    }
  }
});

renderListMovies(movieSliced, elUlWrapper);





function displayModal(movie) {
  const elModal = document.querySelector(".modal");
  const elClose = elModal.querySelector("#close");
  const modalContent = elModal.querySelector(".modal-content");

  modalContent.innerHTML = `
      <div class="close-btn">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="modal-header">
        <h2 class="movie-modal-title">${movie.Title}</h2>
        <ul class="movie-datas-modal">
          <li class="movie-modal-popularity">${movie.imdb_rating}</li>
          <li class="movie-data-modal-release">${movie.movie_year}</li>
          <li class="movie-watch-modal-hours">${movie.runtime}</li>
        </ul>
      </div>
      <div class="modal-main">
        <div class="movie-iframe">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/${movie.imdb_id}"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="movie-modal-main-info">
          <p>${movie.Categories}</p>
          <p class="movie-overview">${movie.summary}</p>
          <a href="#" class="movie-link">IMDb</a>
        </div>
      </div>
    `;

  elModal.style.display = "block";

  elClose.addEventListener("click", (e) => {
    e.preventDefault();
    elModal.style.display = "none";
  });
}
