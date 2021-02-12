// Get the input field
const input = document.getElementById("user-input");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search").click();
    }
});


//handle search button 
document.getElementById('search').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value;
    const url = `https://api.lyrics.ovh/suggest/${userInput}`
    loadingSpinner()
    fetch(url)
        .then(response => response.json())
        .then(json => displaySong(json.data))
        .catch(error => displayError("Something is wrong !! please try again"))

});


//display song
const displaySong = (songs) => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = " ";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = `single-result row align-items-center my-3 p-3`;
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
             <div class="col-md-3 text-md-right text-center">
                 <button onclick="lyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        searchResult.appendChild(songDiv);
        loadingSpinner();
    });

};

//get lyrics 
const lyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(response => response.json())
        .then(json => showLyrics(json.lyrics))

}

//show lyrics
const showLyrics = (lyrics) => {
    document.getElementById('lyrics').innerText = lyrics

}


//display error
const displayError = (error) => {
    document.getElementById('error').innerHTML = error;
}

//loading spinner
const loadingSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const searchResult = document.getElementById('search-result');
    spinner.classList.toggle('d-none');
    searchResult.classList.toggle('d-none');
}