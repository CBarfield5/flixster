// Global Constants
const apiKey = 'ADD_API_KEY';
const pageSize = 9;

// Global Variables
var currentApiPage = 0;
var currentSearchTerm = '';

// Page Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gifAreaDiv = document.getElementById('gif-area');
const showMeMoreBtn = document.getElementById('show-me-more-btn');
const movieGridElement = document.querySelector('#movie-grid');
const imageBaseUrl = 'https://image.tmdb.org/t/p';


let pageOn = 1
/** Get results from API. */
async function getResults(query) {
    const response1 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7cc0f39ba93ab5bf2f814d6f152fd843&language=en-US&query=${query}&page=${pageOn}&include_adult=false`);
    const data1 = await response1.json();
    const resultData1 = await data1.results;
    return resultData1;
}

/** Render list of results. */
function displayResults(movie) {
    let poster = movie.poster_path;
    if (movie.poster_path == null){
        poster = "/dykOcAqI01Fci5cKQW3bEUrPWwU.jpg";
    }
    movieGridElement.innerHTML = movieGridElement.innerHTML + `
    <div class="movie-card">
        <img class="movie-poster" src="${imageBaseUrl}/original${poster}" alt="${movie.title}" title="${movie.title}"/>
        <div class="movie-title">${movie.original_title} </div>
        <div style="color: transparent"> e</div>
        <div class="rating"> 
            <img src="./images/star.png" alt="star" style="max-height: 17px; max width: 20px;"> </img>
            ${movie.vote_average}
        </div>
    </div>
    `
}

/** On form submit, get results and add to list. */
async function handleFormSubmit(event) {
    event.preventDefault();
    movieGridElement.innerHTML = '';
    currentSearchTerm = searchInput.value;
    const results = await getResults(currentSearchTerm);
    results.forEach(Element => {
        displayResults(Element);
    });
    searchInput.value = '';
    currentApiPage++;
    showMeMoreBtn.classList.remove('hidden');
}

searchForm.addEventListener('submit', handleFormSubmit);

async function handleShowMeMoreClick(event) {
    pageOn++;
    if(currentSearchTerm == '') {
        const results = await getTop();
        results.forEach(Element => {
        displayResults(Element);
    });
    } else {
        const results = await getResults(currentSearchTerm);
        results.forEach(Element => {
            displayResults(Element);
        });
    }
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);

async function loadInitial() {
    const results = await getTop();
    results.forEach(Element => {
        displayResults(Element);
    });
}

async function getTop() {
    const response1 = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=7cc0f39ba93ab5bf2f814d6f152fd843&language=en-US&page=${pageOn}`);
    const data1 = await response1.json();
    const resultData1 = await data1.results;
    return resultData1;
}

//

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });

  