import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let dataInDBArr = Object.entries(dataInDB.val())
    
    packingListEl.innerHTML = ""
    
    for (let i = 0; i < dataInDBArr.length; i++) {
        let currentItem = dataInDBArr[i]
        appendValueToPackingListEl(currentItem)
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function appendValueToPackingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent += itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `packingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    packingListEl.append(newEl)
}

//fetched ID, used createElement() instead of innerHTML so we can add event listerners to delete