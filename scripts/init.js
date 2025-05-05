// create authentication instance and create a logout button
const auth = new Auth()

document.querySelector("#logout").addEventListener("click", (e) => {
    auth.logOut()
})