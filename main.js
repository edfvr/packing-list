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

onValue(packingListInDB, function(dataInDB) {
    // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
    if (dataInDB.exists()) {
        let dataInDBArr = Object.entries(dataInDB.val())
        packingListEl.innerHTML = ""
        
        for (let i = 0; i < dataInDBArr.length; i++) {
            let currentItem = dataInDBArr[i]
            appendValueToPackingListEl(currentItem)
        }
    } else {
        packingListEl.innerHTML = "No items here... yet"
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