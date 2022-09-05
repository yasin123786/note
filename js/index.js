console.log("This is Project 1 of cwh playlist");
showNote();

function insertNewNote() {
    let newNote = document.getElementById("notes").value;
    if (newNote === "")
        return;
    let notesArray = localStorage.getItem("notes");
    console.log(notesArray);
    if (notesArray == null) {
        notesArrayObj = [];
    }
    else {
        notesArrayObj = JSON.parse(notesArray);
    }
    notesArrayObj.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesArrayObj));
    showNote();
    document.getElementById("notes").value = "";
}

function showNote() {
    let html = "";
    let showNotesContainer = document.getElementById("showNotesContainer");
    let notesArray = localStorage.getItem("notes");
    console.log(notesArray);
    let notesArrayObj = [];
    if (notesArray == '[]') {
        showNotesContainer.innerHTML = `<br><u class="text-muted m-auto">Add New Records by adding notes in above Box and press Button</u>`;
        return;
    }
    else {
        notesArrayObj = JSON.parse(notesArray);
    }
    notesArrayObj.forEach((element, index) => {
        console.log(index);
        html += `
            <div class="col-sm-2 col-md-4 mt-3">
                <div class="card cardNotes">
                    <div class="card-body">
                        <h4 class="card-title text-success">Note ${index + 1} </h4>
                        <p class="card-text">${element}
                        </p>
                             <button onclick = "deleteNote(${index})" class="bn btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        `;
        showNotesContainer.innerHTML = html;
    });
}
function deleteNote(index) {

    let notesArray = localStorage.getItem("notes");
    if (notesArray == null) {
        notesArrayObj = [];
    }
    else {
        notesArrayObj = JSON.parse(notesArray);
    }
    console.log(index, notesArrayObj[index]);
    notesArrayObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArrayObj));

    showNote();
    console.log(index);

}

document.getElementById("navSearchBox").addEventListener("input", searchNotes);
document.getElementById("searchBtn").addEventListener("click", searchNotes);
function searchNotes(e) {
    console.log("Serching Notes");
    let searchText = document.getElementById("navSearchBox").value.toLowerCase();
    console.log(searchText);
    let myNotestext = document.querySelectorAll(".cardNotes");
    console.log(myNotestext);
    Array.from(myNotestext).forEach((element) => {
        console.log(element.getElementsByTagName("p")[0].innerText);
        if (element.getElementsByTagName("p")[0].innerText.toLowerCase().includes(searchText)) {
            element.parentElement.style.display = "block";
            console.log(element.parentElement);
        }
        else {
            element.parentElement.style.display = "none";
            console.log(element.parentElement);
        }
    });
    e.preventDefault();
}