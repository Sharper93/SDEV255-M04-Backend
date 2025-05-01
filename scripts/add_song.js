addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addBtn").addEventListener("click", addSong)
})

// add the song to db... must be async func because we are calling data outside of our server

async function addSong() {

    const song = {

        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,

        // if more than one value in genre put it in an array 
        // genre:document.querySelector("#genre").value ? document.querySelector("#genre").value.split(",") : []
   
    }
    // fetch is GET but we can change to method to change type -- POST 
    const response = await fetch("http://localhost:3000/api/songs/", {
        method: "POST",
        //type of data using
        headers: {
            "Content-Type" : "application/json"
        },
        // translate song data to json so backend can see it
        body: JSON.stringify(song)

    })

    if(response.ok){
        const results = await response.json()
        alert("Added song with ID of" + results._id)

        // reset form after song is successfully added
        document.querySelector("form").reset()
    }

    else { 
        document.querySelector("#error").innerHTML = "Cannot Add Song"
    }

}

async function addSong() {
     //create song obj based on the form that the user fills out
    //makes it easier when we send the data to the backend
    try {
      const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,
        
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
  