const apiKey = '9c1549895dd33d1535a9f22a8c36955a';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
const movieGrid = document.getElementById('movies-grid');

const modal = document.getElementById('movieModal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementsByClassName('close')[0];

closeModal.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


function displayMovies(movieList) {
    movieGrid.innerHTML = ''; 

    movieList.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/150'}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview || "Sin descripción disponible."}</p>
            <button class="favorite-button">Favorito</button>
        `;

        movieGrid.appendChild(movieCard);
        movieCard.addEventListener('click', function () {
            modalTitle.textContent = movie.title;
            modalImg.src = movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/150';
            modalDescription.textContent = movie.overview || "Sin descripción disponible.";
            modal.style.display = "flex"; 
        });

        const favoriteButton = movieCard.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', function (e) {
            e.stopPropagation();
            favoriteButton.classList.toggle('favorited');
        });
    });
}

function getMovies(genreId = 'all') {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es&sort_by=popularity.desc`;

    if (genreId !== 'all') {
        url += `&with_genres=${genreId}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results); 
        })
        .catch(error => {
            console.error('Error al obtener películas de la API:', error);
        });
}

document.getElementById('genre-select').addEventListener('change', function () {
    const genre = this.value;
    getMovies(genre);
});

getMovies();
