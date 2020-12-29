console.log("Notes App")
showNotes();

//if User adds a Note , Add it to the Local Storage
let btn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    if (notesObj === null) notesObj = []; // This sets it to an empty array initially
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // let addBtn = document.getElementById('addBtn');
    // addBtn.addEventListener("click", function(e){

    //    let addtxt = document.getElementById("addTxt")
    //    let notes  = localStorage.getItem("notes")
    //    if(notes == null){

    //     notesObj = []
    //    }else{

    //     notesObj = JSON.parse(notes)
    //    }
    //    notesObj.push(addtxt.Value)
    //    localStorage.setItem("notes", JSON.stringify(notesObj))
    //    addtxt.value = ""
    // console.log(notesObj)
    showNotes();

})

// Function to show elements from LocalStorage
function showNotes() {

    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    if (notesObj === null) notesObj = [];

    let html = "";
    notesObj.forEach(function (element, index) {

        html += `
        <div class="noteCard my-2 mx-2" style="width: 18rem;">
            
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div > 
        `
    })

    let notesElm = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing  to Show! Use "Add a Notes" section above to Add notes`
    }
}

// Function to delete a Note
function deleteNote(index) {

    // console.log('I am Deleting', index);

    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    if (notesObj === null) notesObj = [];

    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    
}

let search = document.getElementById('searchTxt')
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase()
    // console.log("input event fired", inputVal);
    let noteCards = document.getElementsByClassName('notecard')
    Array.from(noteCards).forEach(function(element){

        let cardtxt = element.getElementsByTagName("p")[0].innerText
        // console.log(cardtxt);
        if(cardtxt.includes(inputVal)){

            element.style.display = "block"
        }else{
            element.style.display = "none"
        }
    })

})