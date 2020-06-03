let baseURL = "..";

//    *********************   GET FLIGHTS   *********************

// get the flight over and over, update every 3 sec
function flightsTable() {
    try {
        getFlightsSyncAll();
        setInterval(function () {
            getFlightsSyncAll();
        }, 3000);
    }
    catch (err) {
        console.log(baseURL);
        console.log('flightsTable PROBLEM!' + err.message);
        errorHandle('flightsTable error: ', err.message);
    }
}

// ASYNC - get flights from the sever, according to current time
async function getFlights() {
    try {
        const currentTime = getCurrentTime();
        // build the request
        let url = baseURL + '/api/Flights?relative_to=' + currentTime;
        const response = await fetch(url);
        // get all flights
        let flightPlans = await response.json();
        // call function to iterate and get the flights
        forEachFlights(flightPlans);
        // update the table with new info.
        $('#tbid tbody').empty();
        $('#tbid tbody').append(currentFlights);
        currentFlights = "";
        if (Object.keys(airplansDic).length > 0) {
            // check if there is a flight in the map than need to delete
            updateMap();
        }
        // clear array for next getFlights
        idArray = [];
    }
    catch (err) {
        console.log('GetFlights PROBLEM!' + err.message);
        errorHandle('get flights error: ', err.message);
    }
}

// iterate the info from server, and add Flights
function forEachFlights(flightPlans) {
    try {
        flightPlans.forEach(function (flight) {
            $(flight).each(function (index, value) {
                addFlightsTable(value);
            })
            // insert id to array, to check if we need to delete from map
            idArray.push(flight.flight_id);
        });
    }
    catch (err) {
        console.log('forEachFlights PROBLEM!' + err.message);
        errorHandle('forEachFlights error: ', err.message);
    }
}

// Check if there is old flight in map that we need to delete.
function updateMap() {
    try {
        for (const [key, value] of Object.entries(airplansDic)) {
            if (idArray.includes(key)) {
                // do nothing
            }
            else {
                // value (=id) are not in server, so erase it from the map
                deleteFromMap(key);
            }
        }
    }
    catch (err) {
        console.log('updateMap PROBLEM!' + err.message);
        errorHandle('updateMap error: ', err.message);
    }
}

// Delete flight from map.
function deleteFromMap(id) {
    try {
        // Delete path
        removeSegments();
        // delete flightId from the dictionary in map.js
        removePlan(id);
        if (id === colorId) {
            resetDetails();
            colorId = -1;
        }
    }
    catch (err) {
        console.log('deleteFromMap PROBLEM!' + err.message);
        errorHandle('deleteFromMap error: ', err.message);
    }
}

// currentFlight is string that hold all the info about the flight 
// that we get from the server (every request).
let currentFlights = "";

let idArray = [];

let colorId = -1;
function addFlightsTable(flight) {
    try {
        const id = flight.flight_id;
        currentFlights += "<tr id=\"" + id + "\"";
        if (id === colorId) {
            currentFlights += "style=\"background-color: red;\" ";
        }
        currentFlights += "onclick =\"rowClicked(this)\"><td>" + id + "</td>" +
            "<td>" + flight.company_name + "</td>" +
            "<td>" + flight.is_external + "</td>";
        if (!flight.is_external) {
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
    catch (err) {
        console.log('addFlightsTable PROBLEM!' + err.message);
        errorHandle('addFlightsTable error: ', err.message);
    }
}

// Row click event
// 1. color the row. 2. show details. 3. mark plan as chosen.
function rowClicked(row) {
    try {
        let id = row.cells[0].innerHTML;
        if (id in airplansDic) {
            changeId(id)
        }
    }
    catch (err) {
        console.log('rowClicked PROBLEM!' + err.message);
        errorHandle('rowClicked error: ', err.message);
    }
}

function changeId(id) {
    try {
        const row = document.getElementById(id);
        if (colorId != -1) {
            // found the preaviuos row and disable the color
            const coloredRow = document.getElementById(colorId);
            changePicNotClicked(colorId);
            coloredRow.style.backgroundColor = "antiquewhite";
        }
        // color the row.
        row.style.backgroundColor = "red";
        // update the variable, for the update
        colorId = id;
        changePicClicked(id);
        showFlightDetails(id);
    }
    catch (err) {
        console.log('changeId PROBLEM!' + err.message);
        errorHandle('changeId error: ', err.message);
    }
}

// Delete all the info of the flightplan,
// include the flightplan in the server
function deleteFlight(row) {
    try {
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
        if (id === colorId) {
            colorId = -1;
        }
    }
    catch (err) {
        console.log('deleteFlight PROBLEM!' + err.message);
        errorHandle('deleteFlight error: ', err.message);
    }
}

// Delete flightplan from the server
function deleteFlightFromServer(id) {
    try {
        // create the flight that need to delete
        let url = baseURL + "/api/Flights/" + id;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function () {

            }
        });
    }
    catch (err) {
        console.log('deleteFlightFromServer PROBLEM!' + err.message);
        errorHandle('deleteFlightFromServer error: ', err.message);
    }
}

// Get Current Time
function getCurrentTime() {
    try {
        const d = new Date();
        //let x = d.toISOString();
        const currentTime = d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) +
            "-" + ("00" + d.getDate()).slice(-2) + "T" + ("00" + d.getHours()).slice(-2) +
            ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2) + "Z";
        return currentTime;
    }
    catch (err) {
        console.log('getCurrentTime PROBLEM!' + err.message);
        errorHandle('getCurrentTime error: ', err.message);
    }
}