// To show actual documented notes.
showNotes();

// Handling +Note option
let noteArea = document.getElementById('noteArea');
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {

    // We are storing the values in localstorage.
    // So we need to check the localStorage if it
    // is empty or conatins some data
    let lstore = localStorage.getItem("notes");
    if (lstore == null) {
        notesStack = [];
    } else {
        notesStack = JSON.parse(lstore);
    }

    // Now we will just push the textarea values to our notes stack
    notesStack.push(noteArea.value);

    // Push the value to persist in localStorage
    localStorage.setItem("notes", JSON.stringify(notesStack));

    // Make the text area empty
    noteArea.value = "";

    // Display the added notes on the HTML
    showNotes();
})

function showNotes() {

    let lstore = localStorage.getItem("notes");
    if (lstore == null) {
        notesStack = [];
    } else {
        notesStack = JSON.parse(lstore);
    }

    let divData = "";
    notesStack.forEach(function (element, index) {
        divData += `
                    <div class="taser list-group mt-3">
                        <li class="list-group-item text-body">
                        <p><strong>${element}</strong></p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger btn-sm d-inline-block"><i class="fas fa-times"></i><strong> Delete</strong></button>
                    </div>
                    `;
    });
    let elem = document.getElementById('note');
    if (notesStack.length != 0) {
        elem.innerHTML = divData;
    } else {
        elem.innerHTML = `
        <hr>
        <h5 class="text-center">
            There are no Notes. Use <span class="badge bg-secondary">Add Notes</span> section to create one.
        </h5>`;
    }
}

function deleteNote(index) {
    let lstore = localStorage.getItem("notes");
    if (lstore == null) {
        notesStack = [];
    } else {
        notesStack = JSON.parse(lstore);
    }

    notesStack.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesStack));
    showNotes();
}

// Handling clear option
let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener("click", function (e) {
    noteArea.value = "";
})


// Notes Search
let query = document.getElementById('querySearch');
query.addEventListener("input", function () {

    inputTextValue = query.value.toLowerCase();

    // Get the parent tag which want you to hide
    let noteCheck = document.getElementsByClassName('taser');
    Array.from(noteCheck).forEach(function (e) {
        let actualText = e.getElementsByTagName('p')[0].innerText;
        if (actualText.toLowerCase().includes(inputTextValue)) {
            e.style.display = "block";
        } else {
            e.style.display = "none";
        }
    })
})