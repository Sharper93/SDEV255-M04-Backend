addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", addSong)
})

// add the song to db... must be async func because we are calling data outside of our server

async function addSong() {
     //create song obj based on the form that the user fills out
    //makes it easier when we send the data to the backend
    try {
      const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,
        // add username/created by to show who created/added the song in db
        username: localStorage.getItem("uname"),
        
      };
      
      // fetch is GET but we can change to method to change type -- POST 
      const response = await fetch("http://localhost:3000/api/songs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
      });
  
      if (response.ok) {
        const results = await response.json();
        alert("Added song with ID of " + results._id);
        // reset form after song is successfully added
        document.querySelector("form").reset();
      }
      else {
        const error = await response.json();
        document.querySelector("#error").innerHTML = "Cannot Add Song: " + error.error;
      }
    } 
    catch (err) {
      console.error("Fetch error:", err);
      document.querySelector("#error").innerHTML = "Server error: Could not reach API.";
    }
  }
  