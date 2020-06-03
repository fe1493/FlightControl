const input = document.getElementById("fileInput");
const customButton = document.getElementById("customButton");
customButton.addEventListener('click', function () {
    input.click();
});

const allowedExtension = /(\.json)$/i;
//Event handler which loads and read the file
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
    const reader = new FileReader();
    reader.onload = () => {
        // file content
        const obj = JSON.parse(reader.result);
        postflightplan(obj);
    }
    $("#fileInput").val('');
    reader.onerror = error => reject(error);
    reader.readAsText(file);
}


// Function that takes the new flight plan and posts it to the server
function postflightplan(flightPlan) {
    (async () => {
        const rawResponse = await fetch("../api/flightplan", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightPlan)


        });
        //if the flight plan locations are invalid
        if (rawResponse.status == 400) {
            errorHandle(rawResponse.status, "Invalid flight plan details");
        }

    })();
}