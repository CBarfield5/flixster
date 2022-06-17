const imageBaseUrl = 'https://image.tmdb.org/t/p';
 
const movieGridElement = document.querySelector('#movie-grid');

const uri = "https://api.themoviedb.org/3/movie/now_playing?api_key=7cc0f39ba93ab5bf2f814d6f152fd843&language=en-US&page=";

let isQue = false;

async function fetchMe(page) {
    if(isQue) {
        fetchMe1();
    } else {
        uriVal = uri + page
        const response = await fetch(uriVal);
        const data = await response.json();
        const resultData = await data.results;
    
        resultData.forEach(element => {
            doSomething(element);
        });
    }
}


function doSomething(movie) {
    // add catch for movies with no background
    movieGridElement.innerHTML = movieGridElement.innerHTML + `
    <div class="movie-card">
        <img class="movie-poster" src="${imageBaseUrl}/original${movie.poster_path}" alt="${movie.title}" title="${movie.title}"/>
        <div class="movie-title">${movie.original_title} </div>
        <div style="color: transparent"> e</div>
        <div class="rating"> 
            <img src="./images/star.png" alt="star" style="max-height: 10px; max width: 10px;"> </img>
            ${movie.vote_average}
        </div>
    </div>
    `
}

addNewMovies();

let curr = 1 

async function addNewMovies() {
    curr += 1;
    await fetchMe(curr);
}

async function searchSubmit() {

}


let tracker = false;
async function queryFun(){
    isQue = true
    var title = document.getElementById("fname").value;
    if(tracker) {
        window.location.reload();
        fetchMe1(title);
    }
    console.log('jFirst: ', title);
    await fetchMe1(title);
    //alert("Your name is: " + title);

    tracker = !tracker
} 


let pageOn = 1
async function fetchMe1(query) {
    pageOn += 1;
    const response1 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=7cc0f39ba93ab5bf2f814d6f152fd843&language=en-US&query=${query}&page=${pageOn}&include_adult=false`);
    const data1 = await response1.json();
    const resultData1 = await data1.results;
    console.log('resultData1: ', resultData1);

    resultData1.forEach(element => {
        doSomething(element);
    });
    
}

let que = 1; 

async function addQueryMovies() {
    que += 1;
    await fetchMe1(curr);
}


// searchFormElement.addEventListener('submit', (event) => {
//     event.preventDefault();
//     fetchMovies();
// })

// fetchMovies(uri);

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gifAreaDiv = document.getElementById('gif-area');
const showMeMoreBtn = document.getElementById('show-me-more-btn');

async function getResults(searchTerm) {
    const offset = currentApiPage * pageSize;
    const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&limit=${pageSize}&offset=${offset}&api_key=${apiKey}`);
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

/** On form submit, get results and add to list. */

async function handleFormSubmit(event) {
    event.preventDefault();
    gifAreaDiv.innerHTML = '';
    currentSearchTerm = searchInput.value;
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    searchInput.value = '';
    currentApiPage++;
    showMeMoreBtn.classList.remove('hidden');
}

searchForm.addEventListener('submit', handleFormSubmit);

async function handleShowMeMoreClick(event) {
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    currentApiPage++;
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);

function displayResults(results) {
    const gifsHTMLString = results.map(gif => `
        <div class="gif">
            <img src="${gif.images.original.url}" />
        </div>
    `).join('');

    gifAreaDiv.innerHTML = gifAreaDiv.innerHTML + gifsHTMLString;
}

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);













