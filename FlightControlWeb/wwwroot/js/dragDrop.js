let input = document.getElementById("fileInput");
let customButton = document.getElementById("customButton"); 
let customText = document.getElementById("customText"); 

customButton.addEventListener('click', function () {
    input.click();
});

let allowedExtension = /(\.json)$/i;
function onChange(event) {
    let file = event.target.files[0];
    let filePath = file.name;
    //check the file extension is .json
    if (!allowedExtension.exec(filePath)) {
        alert('Please upload a .json file only');
        $("#fileInput").val('');
        return false;
    }
    //read the file and send to the function in charge of sending to the server
    let reader = new FileReader();
    reader.onload = (event) => {
        // file content
        let obj = JSON.parse(reader.result);
        // ********************  NEED TO DELETE BEFORE SUBMIT !!!!! **************************
        obj.initial_location.date_time = getCurrentTime();
        postflightplan(obj);
    }
    $("#fileInput").val('');
    reader.onerror = error => reject(error);
    reader.readAsText(file);
}

// Function that takes the new flight plan and posts it to the server
function postflightplan(flightPlan) {
    (async () => {
        const rawResponse = await fetch("https://localhost:44389/api/flightplan", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightPlan)
        });
    })();
}