import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://packing-list-e2ffb-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const packingListInDB = ref(database, "packingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-btn")
const packingListEl = document.getElementById("packing-list")


addButtonEL.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(packingListInDB, inputValue)
    
    clearInputField()
    
})


//Fetching items from our DB
onValue(packingListInDB, function(dataInDB) {
    let dataInDBArr = Object.values(dataInDB.val())
    packingListEl.innerHTML = ""
    
    for (let i = 0; i < dataInDBArr.length; i++) {
        let item = dataInDBArr[i]
        appendValueToPackingListEl(item)
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function appendValueToPackingListEl(value) {
    packingListEl.innerHTML += `<li>${value}</li>`
}