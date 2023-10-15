//Challenge: Make it so that when you click the 'Add' button, whatever is written in the input field should be console logged.


const inputFieldEl = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-btn")


addButtonEL.addEventListener("click", function() {
    console.log(inputFieldEl.value)
})
