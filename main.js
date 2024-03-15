const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");
const sortCriteriaSelect = document.getElementById("sortCriteriaSelect");
const sortOrderSelect = document.getElementById("sortOrderSelect");
const btnSaveToLocal = document.getElementById("btnSaveToLocal");

let arrRecords = [];
const tblTHsLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];

// Load records from local storage on page load
loadRecordsFromLocal();

// Display appropriate message if there are no records
if (arrRecords.length === 0) {
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
} else {
    document.getElementById("status").style.display = "none";
}

btnInsertUpdate.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");

    if(btnInsertUpdate.value == "insert") {

        for(const txt of inputTxt) {
            if(txt.value == " " || txt.value == "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        let infoRecord = {
            fname: inputTxt[0].value,
            mname: inputTxt[1].value,
            lname: inputTxt[2].value,
            age:   parseInt(inputTxt[3].value)      
        };
    
        for(const txt of inputTxt) {
            txt.value = "";
        }
      
        arrRecords.push(infoRecord);
    
        iterateRecords();
    
        console.log(inputTxt);
        console.log(infoRecord);
        console.log(arrRecords);

    } else {

        for(const txt of inputTxt) {
            if(txt.value == " " || txt.value == "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        arrRecords[parseInt(btnInsertUpdate.value)].fname = inputTxt[0].value;
        arrRecords[parseInt(btnInsertUpdate.value)].mname = inputTxt[1].value;
        arrRecords[parseInt(btnInsertUpdate.value)].lname = inputTxt[2].value;
        arrRecords[parseInt(btnInsertUpdate.value)].age = parseInt(inputTxt[3].value)  ;
        
        iterateRecords();

        for(const txt of inputTxt) {
            txt.value = "";
        }

        btnInsertUpdate.innerHTML = "Insert";
        btnInsertUpdate.value = "insert";
    }


});

btnClear.addEventListener("click", () => {
    const inputTxt = document.getElementsByTagName("input");

    for(const txt of inputTxt) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
});

btnClearItems.addEventListener("click", () => {
    arrRecords = []; // Clear the array holding records
    saveRecordsToLocal(); // Clear local storage
    while (tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild); // Clear the table
    }
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
});


sortCriteriaSelect.addEventListener("change", sortRecords);
sortOrderSelect.addEventListener("change", sortRecords);

// Function to sort records based on selected criteria and order
function sortRecords() {
    const criteria = sortCriteriaSelect.value;
    const order = sortOrderSelect.value;

    // Sorting logic based on criteria and order
    arrRecords.sort((a, b) => {
        let comparison = 0;
        if (criteria === "firstName") {
            comparison = a.fname.localeCompare(b.fname);
        } else if (criteria === "lastName") {
            comparison = a.lname.localeCompare(b.lname);
        }

        return order === "asc" ? comparison : -comparison;
    });

    // Update displayed records
    iterateRecords();
}

btnSaveToLocal.addEventListener("click", () => {
    // Save records to local storage
    saveRecordsToLocal();
    alert("Records saved to local storage!");
});

function saveRecordsToLocal() {
    // Save records to local storage
    localStorage.setItem("records", JSON.stringify(arrRecords));
}

function loadRecordsFromLocal() {
    const savedRecords = localStorage.getItem("records");
    if (savedRecords) {
        arrRecords = JSON.parse(savedRecords);
        iterateRecords();
    }
}

function saveRecordsToLocal() {
    localStorage.setItem("records", JSON.stringify(arrRecords));
}

function iterateRecords() {
    // const tblTHs = new Array();

    while(tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    if(!(arrRecords.length == 0)) {

        document.getElementById("status").style.display = "none";

        const tblHeaderRow = document.createElement("tr");
        const tblHeader = document.createElement("thead");
        tblHeaderRow.style.borderTop = "1px solid black";
        tblHeaderRow.style.borderBottom = "1px solid black";

        //Generate 4 Theads
        for(let i=0 ; i < 5 ; i++) {
            const tblTHs = document.createElement("th");
            tblTHs.style.padding = "5px";

            if(i != 4) {
                tblTHs.style.borderRight = "1px solid black";
            }

            tblTHs.innerHTML = tblTHsLabels[i];
            tblHeaderRow.appendChild(tblTHs);
        }

        tblHeader.appendChild(tblHeaderRow);
        tblRecords.appendChild(tblHeader);

        //Generate Records
        const tblBody = document.createElement("tbody");
    
        arrRecords.forEach((rec, i)=> {

            const tblRow = document.createElement("tr");
            const tbdataFname = document.createElement("td");
            const tbdataMname = document.createElement("td");
            const tbdataLname = document.createElement("td");
            const tbdataAge= document.createElement("td");
            const tbdataActionBtn= document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnUpdate = document.createElement("button");
            
            tbdataFname.style.borderRight = "1px solid black";
            tbdataFname.style.padding = "10px";

            tbdataMname.style.borderRight = "1px solid black";
            tbdataMname.style.padding = "10px";

            tbdataLname.style.borderRight = "1px solid black";
            tbdataLname.style.padding = "10px";

            tbdataAge.style.borderRight = "1px solid black";
            tbdataAge.style.padding = "10px";

            tbdataActionBtn.style.padding = "10px";

            tblRow.style.borderBottom = "1px solid black";

            tbdataFname.innerHTML = rec.fname;
            tbdataMname.innerHTML = rec.mname;
            tbdataLname.innerHTML = rec.lname;
            tbdataAge.innerHTML = rec.age;

            btnDelete.innerHTML = "Delete";
            btnDelete.setAttribute("onclick", `deleteData(${i})`);
            btnDelete.style.marginRight = "5px";

            btnUpdate.innerHTML = "Edit";
            btnUpdate.setAttribute("value", "update");
            btnUpdate.setAttribute("onclick", `updateData(${i})`);
            btnUpdate.style.marginRight = "5px";

            tbdataActionBtn.appendChild(btnDelete);
            tbdataActionBtn.appendChild(btnUpdate);

            tblRow.appendChild(tbdataFname);
            tblRow.appendChild(tbdataMname);
            tblRow.appendChild(tbdataLname);
            tblRow.appendChild(tbdataAge);
            tblRow.appendChild(tbdataActionBtn);

            tblBody.appendChild(tblRow);
        });

        tblRecords.appendChild(tblBody);



    } else {
        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";
    }
}

function deleteData(i) {
    arrRecords.splice(i,1);
    iterateRecords();
}

function updateData(i) {
    const inputTxt = document.getElementsByTagName("input");

    inputTxt[0].value = arrRecords[i].fname;
    inputTxt[1].value = arrRecords[i].mname;
    inputTxt[2].value = arrRecords[i].lname;
    inputTxt[3].value = arrRecords[i].age;

    btnInsertUpdate.innerHTML = "Update";
    btnInsertUpdate.value = `${i}`;
}