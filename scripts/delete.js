document.addEventListener("DOMContentLoaded", async function () {
    const urlparam = new URLSearchParams(window.location.search)
    const songID = urlparam.get('id')

    const response = await fetch("http://localhost:3000/api/songs/" + songID)

    if (response.ok) {
        const song = await response.json()

        document.querySelector("#songId").value = song._id
        document.querySelector("#title").value = song.title
        document.querySelector("#artist").value = song.artist
        document.querySelector("#released").value = song.releaseDate?.substring(0, 10)
        document.querySelector("#popularity").value = song.popularity
    } else {
        console.error("Failed to fetch song data")
    }

    document.querySelector("#deleteBtn").addEventListener("click", deleteSong)
})

async function deleteSong() {
    // create song object from the fields

    const songID = document.querySelector("#songId").value

    const song = {

        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,

    }

    const response = await fetch("http://localhost:3000/api/songs/" + songID, {
        method: "DELETE",
    });

    if (response.ok) {
        alert("Deleted Song")
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot Delete Song"
    }


}