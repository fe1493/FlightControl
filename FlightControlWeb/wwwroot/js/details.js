function getFlightPlan(id) {
    let url = baseURL + "/api/flightplan/";
     let urlPath = url.concat(id.toString());
     console.log(urlPath);
    $.getJSON(urlPath, function (data) {
        setDetails(data);

    });
}
function setDetails(data) {

    let company = document.getElementById("cmpny");
    company.innerHTML = data["company_name"];

    let passengers = document.getElementById("psng")
    passengers.innerHTML = data["passengers"];

    let initialLocation = data["initial_location"];
    setInitialLocation(initialLocation);

    let date = new Date();
    date.toUTCString(initialLocation["date_time"]);
    setDepartureTime(date);

    let flightTime = 0;
    let flightSegments = data["segments"];
    flightSegments.unshift(initialLocation);
    drawPlanPath(flightSegments);
    for (var i = 1; i < flightSegments.length; i++) {
        flightTime += data["segments"][i]["timespan_seconds"];
    }
    setArrivalTime(date, flightTime);
    setFinalLocation(flightSegments[i - 1]);

}

function setInitialLocation(initialLocation) {
    let initialLocationLat = document.getElementById("iniloclat");
    initialLocationLat.innerHTML = initialLocation["latitude"].toFixed(3);
    let initialLocationLon = document.getElementById("iniloclon");
    initialLocationLon.innerHTML = initialLocation["longitude"].toFixed(3);
}

function setDepartureTime(date) {
    let initialLocationTime = document.getElementById("dep");
    initialLocationTime.innerHTML = date;
}

function setArrivalTime(date, flightTime) {
    let arrivalDate = new Date();
    arrivalDate.setSeconds(date.getSeconds() + flightTime);
    let arrivalTime = document.getElementById("arvl");
    arrivalTime.innerHTML = arrivalDate;
}

function setFinalLocation(finalLocation) {
    let finalLocationLat = document.getElementById("finloclat");
    finalLocationLat.innerHTML = finalLocation["latitude"].toFixed(3);
    let finalLocationLon = document.getElementById("finloclon");
    finalLocationLon.innerHTML = finalLocation["longitude"].toFixed(3);
};
function clearDetails() {
    document.getElementById("cmpny").innerHTML = "";
    document.getElementById("psng").innerHTML = "";
    document.getElementById("iniloclat").innerHTML = "";
    document.getElementById("iniloclon").innerHTML = "";
    document.getElementById("finloclat").innerHTML = "";
    document.getElementById("finloclon").innerHTML = "";
    document.getElementById("arvl").innerHTML = "";
    document.getElementById("dep").innerHTML = "";
}