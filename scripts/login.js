let token;

window.onload=function(){
document.querySelector("#loginBtn").addEventListener("click", function() {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    login(username, password)

})}

async function login(username, password) {
    const login_cred = {
        username,
        password
    }

    // send login post request o backend

    const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login_cred)
    })

    if(response.ok){
        //take the token and save to storage
        const tokenResponse = await response.json()
        token = tokenResponse.token
        uname = tokenResponse.username2
        auth = tokenResponse.auth
        console.log(token)

        //saveit
        localStorage.setItem("token", token)
        localStorage.setItem("uname", uname)
        localStorage.setItem("auth", auth)

        // redirect user 
        // this would be the correlated teacher or student dashboard in project
        window.location.replace("/index.html")

    }
    else{
        document.querySelector("#errorMsg").innerHTML = "Bad username and password"
    }
}