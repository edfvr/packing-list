import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://packing-list-e2ffb-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-btn")


addButtonEL.addEventListener("click", function() {
    console.log(inputFieldEl.value)
})
