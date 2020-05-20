function getFlightPlan(id) {
    var url = "../api/flightplan/";
    var urlPath = url.concat(id.toString());
    $.getJSON(urlPath, function (data) {
        let company = document.getElementById("cmpny");
        company.innerHTML = data["companyName"];

        let passengers = document.getElementById("psng")
        passengers.innerHTML = data["passengers"];

        let initialLocation = data["initialLocation"];
        setInitialLocation(initialLocation);

        var date = new Date();
        date.toUTCString(initialLocation["dateTime"]);
        setDepartureTime(date);

        var flightTime = 0;
        let flightSegments = data["segments"];
        flightSegments.unshift(initialLocation);
        drawPlanPath(flightSegments);
        for (var i = 1; i < flightSegments.length; i++) {
            flightTime += data["segments"][i]["timespanSeconds"];
        }
        setArrivalTime(date, flightTime);
        setFinalLocation(flightSegments[i-1]);


    });
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
    var arrivalDate = new Date();
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