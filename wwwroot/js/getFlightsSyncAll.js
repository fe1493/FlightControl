// ASYNC - get flights from the sever, according to current time
async function getFlightsSyncAll() {
    try {
        let currentTime = getCurrentTime();
        // build the request
        let url = baseURL + "/api/Flights?relative_to=" + currentTime + "&sync_all";
        let response = await fetch(url);
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
        console.log("GetFlightsSyncAll PROBLEM! " + err.message);
        errorHandle("get flights error: ", err.message);
    }
}