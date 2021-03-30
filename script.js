const btnSearch = document.querySelector(".search-button");
btnSearch.addEventListener("click", async function () {
  try {
    const q = document.querySelector(".keyword");
    const movies = await getMovies(q.value);
    updateListMovies(movies);
  } catch (err) {
    console.log(err);
    const content = document.querySelector(".row-movie");
    const alert = `<div class="alert alert-danger" role="alert">
                      ${err}
                    </div>`;
    content.innerHTML = alert;
  }
});

// Event Binding
document.addEventListener("click", async function (e) {
  try {
    if (e.target.classList.contains("btn-detail-movie")) {
      const movie = await getDetailMovie(e.target.dataset.idmovie);
      updateDetailMovie(movie);
    }
  } catch (err) {
    console.log(err);
  }
});

// Function buat fetch search movies
function getMovies(query) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4dda69557f9d1b4d4930dd9ee950047d&query=${query}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Movie Tidak Ditemukan");
      }
      return res.json();
    })
    .then((data) => data.results);
}

function getDetailMovie(movie) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=4dda69557f9d1b4d4930dd9ee950047d`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Tidak ditemukan");
      }

      return res.json();
    })
    .then((data) => data);
}

function updateListMovies(movies) {
  let content = "";
  movies.forEach((e) => (content += showMovies(e)));
  const listMovies = document.querySelector(".row-movie");
  listMovies.innerHTML = content;
}

function updateDetailMovie(movie) {
  const detail = document.querySelector(".detail-movie");
  const result = showDetailMovie(movie);
  detail.innerHTML = result;
}

function showMovies(movies) {
  return `<div class="col col-md-4 my-3">
  <div class="card">
      <img src="https://image.tmdb.org/t/p/w500/${movies.poster_path}" class="card-img-top" />
          <div class="card-body">
              <h5 class="card-title">${movies.title}</h5>
              <p class="card-text text-muted">${movies.release_date}</p>
              <a href="#" class="btn btn-primary btn-detail-movie" data-bs-toggle="modal"
              data-bs-target="#movieDetail" data-idmovie="${movies.id}" >Detail Movie</a>
          </div>
      </div>
  </div>`;
}

function showDetailMovie(movie) {
  return `<div class="row">
            <div class="col-md-3">
              <img src="https://image.tmdb.org/t/p/w500/${
                movie.poster_path
              }" alt="enggak muncul" class="img-fluid img-movie" />
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class="title">${movie.title}</h4>
                </li>
                <li class="list-group-item">
                  <strong>Description : </strong> <span class="desc">${
                    movie.overview
                  }</span>
                </li>
                <li class="list-group-item">
                  <strong>Populatiry : </strong> <span class="pop">${
                    movie.populaity
                  }</span>
                </li>
                <li class="list-group-item">
                  <strong>Release : </strong> <span class="rilis">${
                    movie.release_date
                  }</span>
                </li>
                <li class="list-group-item">
                  <strong>Genre : </strong> <br />
                  <span class="genre">${getGenre(movie.genres)}</span>
                </li>
              </ul>
            </div>
          </div>`;
}

function getGenre(genres) {
  let genre = "";
  genres.forEach((e) => (genre += `${e.name}, `));

  return genre;
}
