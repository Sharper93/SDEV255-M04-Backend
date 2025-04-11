// event listener to add songs when DOM is triggered
// triggered when page is loaded

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/songs");
    const songs = await response.json();

    let html = "";
    for (let song of songs) {
        html += `<li>${song.title} - ${song.artist}</li>`;
    }

    document.querySelector("#addedsongs").innerHTML = html;
});
