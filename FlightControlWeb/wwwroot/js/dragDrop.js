
function onChange(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
        // file content
        let x = reader.result;
        let obj = JSON.parse(x);
        postflightplan(obj);
    } 
    reader.onerror = error => reject(error);
    reader.readAsText(file);
}

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
        const content = await rawResponse.json();
    })();
}

