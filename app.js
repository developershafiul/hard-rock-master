document.getElementById('search').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const url = `https://api.lyrics.ovh/suggest/${userInput}`
    fetch(url)
        .then(response => response.json())
        .then(json => displaySong(json.data))
        .catch(error =>console.log(error))
});



//display song
const displaySong = (song) => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = " ";
    song.forEach(function (song) {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = `single-result row align-items-center my-3 p-3`
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
    });

};

//get lyrics 
const lyrics = (artist, title)=>{
     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
         fetch(url)
        .then(response => response.json())
        .then(json => showLyrics(json.lyrics))
    
}

//show lyrics
const showLyrics = (lyrics)=>{
    document.getElementById('lyrics').innerText = lyrics

}