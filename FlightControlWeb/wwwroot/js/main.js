let mainArrayFlightPlans = [];
let baseURL = "https://localhost:44389";
let flightplan = { "companyname": "EL-AL" }

function addflightplan() {
    let postOption = preparePost(flightplan);
    fetch(baseURL + "/api/FlightPlan", postOption).
        then(response => response.json).
        catch(error => console.log(error))
}

// currentFlight is string that hold all the info about the flight 
// that we get from the server (every request).
let currentFlights = "";

// get the flights from the server.
function getFlights() {
    let currentTime = getCurrentTime();
    let url = baseURL + "/api/Flights?relative_to=" + currentTime;
    $.getJSON(url, function (data) {
        data.forEach(function (flight) {
            $(flight).each(function (index, value) {
                addFlightsTable(value);
            })
            insertFlightPlan(flight);
        })
        $('#tbid tbody').empty();
        $('#tbid tbody').append(currentFlights);
        currentFlights="";
    });
}

// insert new flightplan
// if the flightplan already exist, we update the place of the plane
function insertFlightPlan(flight){
    let length = mainArrayFlightPlans.length;
    for (let i = 0; i < length; ++i){
        if (flight.flight_id === mainArrayFlightPlans[i].flight_id){
            updatePlanOnMap(flight.latitude, flight.longitude, flight.flight_id);
            return;
        }
    }
    addNewPlan(flight.latitude, flight.longitude, flight.flight_id);
    mainArrayFlightPlans.push(flight);
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
}

// delete all the info of the flightplan
// include the flightplan in the server
function deleteFlight(row) {
    // get the element of the row
    let p = row.parentNode.parentNode;
    // get id (first column)
    let id = p.cells[0].innerHTML;
    // delete the flightplan from the server
    deleteFlightFromServer(id);
    // delete the row in the flights table
    p.parentNode.removeChild(p);
    // delete flightplan from the mainArray
    let length = mainArrayFlightPlans.length;
    let i = 0;
    for (i; i < length; ++i){
        if (id === mainArrayFlightPlans[i].flight_id){
            break;
        }
    }
    mainArrayFlightPlans.splice(i, 1);
}

// delete flightplan from the server
function deleteFlightFromServer (id){
    let url = 'http://ronyut2.atwebpages.com/ap2/api/Flights/' + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            console.log(result);
        }
    });
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
    }, 4000);
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






















