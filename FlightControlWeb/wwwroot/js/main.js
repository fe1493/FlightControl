let flightKeys = [];

let baseURL = "https://localhost:44389";
function addflightplan() {

    let postOption = preparePost(flightplan);
    fetch("/api/flightplan", postOption).
        then(response => response.json).
        catch(error => console.log(error))

}
let currentFlights = "";
function getFlights() {
    let currentTime = getCurrentTime();
    let url = baseURL+ "/api/Flights?relative_to=" + currentTime+"&sync_all";
    $.getJSON(url, function (data) {
        data.forEach(function (flight) {
            $(flight).each(function (index, value) {
                addFlightsTable(value);
            })
        })
        $('#tbid tbody').empty();
        $('#tbid tbody').append(currentFlights);
        currentFlights="";
    });
}


function addFlightsTable(flight) {
    currentFlights += "<tr><td>" + flight.flight_id + "</td>" +
    "<td>" + flight.company_name + "</td>" +
    "<td>" + flight.is_external + "</td>";
    if (!flight.is_external){
        var trash = "<td>";
        trash += "<input class=\"trash\" type=\"image\" src=\"img/trash2.png\"";
        trash += "onclick=\"deleteFlight(this)\"></td></tr>";
        currentFlights += trash;
    }
    else {
        currentFlights += "</tr>";
    }
    drawPlan(flight.flight_id, flight.latitude, flight.longitude);
}

function deleteFlight(row) {
    // send to server to delete this flight
    // ***********************************************************
    var p = row.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

function preparePost(flightplan) {
    let flighplanAsSrt = JSON.stringify(flightplan);
    return {
        "method": 'POST',
        "headers": {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        "body": flighplanAsSrt
    }
}

function flightsTable() {
    setInterval(function() {
        getFlights();
    }, 20000);
}

// Get Current Time
function getCurrentTime(){
    let d = new Date();
    //let x = d.toISOString();
    let currentTime = d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) +
        "-" + ("00" + d.getDate()).slice(-2) + "T" + ("00" + d.getHours()).slice(-2) +
        ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2) + "Z";
    return currentTime;
}






















