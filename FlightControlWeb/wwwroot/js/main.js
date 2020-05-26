
//  !!!!!!!!!   need to change!! we cant work just with one specific port!!   !!!!!!!!!
let baseURL = "https://localhost:44389";

//    *********************   GET FLIGHTS   *********************

// get the flight over and over, update every 3 sec
function flightsTable() {
    getFlights();
    setInterval(function () {
        getFlights();
    }, 3000);
}

// ASYNC - get flights from the sever, according to current time
async function getFlights() {
    try {
        let currentTime = getCurrentTime();
        // build the request
        let url = baseURL + "/api/Flights?relative_to=" + currentTime;
        let response = await fetch(url);
        // get all flights
        let flightPlans = await response.json();
        flightPlans.forEach(function (flight) {
            $(flight).each(function (index, value) {
                addFlightsTable(value);
            })
        });
        // update the table with new info.
        $('#tbid tbody').empty();
        $('#tbid tbody').append(currentFlights);
        currentFlights = "";
    }
    catch (err) {
        alert("GetFlights PROBLEM!" + err.message);
    }
}


// currentFlight is string that hold all the info about the flight 
// that we get from the server (every request).
let currentFlights = "";

let colorId = -1;
function addFlightsTable(flight) {
    let id = flight.flight_id;
    currentFlights += "<tr id=\"" + id + "\"";
    if (id === colorId) {
        currentFlights += "style=\"background-color: red;\" ";
    }
    currentFlights += "onclick =\"rowClicked(this)\"><td>" + id + "</td>" +
    "<td>" + flight.company_name + "</td>" +
    "<td>" + flight.is_external + "</td>";
    if (!flight.is_external){
        let trash = "<td>";
        trash += "<input class=\"trash\" type=\"image\" src=\"img/trash2.png\"";
        trash += "onclick=\"deleteFlight(this)\"></td></tr>";
        currentFlights += trash;
    }
    else {
        currentFlights += "</tr>";
    }
    drawPlan(flight.flight_id, flight.latitude, flight.longitude);
}

// Row click event
// 1. color the row. 2. show details. 3. mark plan as chosen.
function rowClicked(row) {
    // another flight has chosen
    if (colorId != -1) {
        // found the preaviuos row and disable the color
        let coloredRow = document.getElementById(colorId);
        changePicNotClicked(colorId);
        coloredRow.style.backgroundColor = "white";
    }
    // 1. color the row.
    row.style.backgroundColor = "red";
    let id = row.cells[0].innerHTML;
    // update the variable, for the update
    colorId = id;
    // 2. show details.
    if (id in airplansDic) {
        showFlightDetails(id);
        changePicClicked(id);
    }
}

// Delete all the info of the flightplan,
// include the flightplan in the server
function deleteFlight(row) {
    // Delete path
    removeSegments();
    // get the element of the row
    let p = row.parentNode.parentNode;
    // get id (first column)
    let id = p.cells[0].innerHTML;
    // delete the flightplan from the server
    deleteFlightFromServer(id);
    // delete the row in the flights table
    p.parentNode.removeChild(p);
    // delete flightId from the dictionary in map.js
    removePlan(id);
    resetDetails();
}

// Delete flightplan from the server
function deleteFlightFromServer(id) {
    // create the flight that need to delete
    let url = baseURL + "/api/Flights/" + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function (result) {
            console.log(result);
        }
    });
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



//   *************************************************************************************
//   ***********************************   OLD CODE - NOT IN USE  ************************
//   *************************************************************************************

//function getFlights() {
//    let currentTime = getCurrentTime();
//    let url = baseURL+ "/api/Flights?relative_to=" + currentTime;
//    $.getJSON(url, function (data) {
//        data.forEach(function (flight) {
//            $(flight).each(function (index, value) {
//                addFlightsTable(value);
//            })
//        })
//        $('#tbid tbody').empty();
//        $('#tbid tbody').append(currentFlights);
//        currentFlights="";
//    });
//}

//$("#tbid tr.flight").click(function () {
//    let id = $(this)[0].innerHTML;
//    console.log(id)
//});

//function addflightplan() {

//    let postOption = preparePost(flightplan);
//    fetch("/api/flightplan", postOption).
//        then(response => response.json).
//        catch(error => console.log(error));

//}

//function preparePost(flightplan) {
//    let flighplanAsSrt = JSON.stringify(flightplan);
//    return {
//        "method": 'POST',
//        "headers": {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//        },
//        "body": flighplanAsSrt
//    }
//}