function getFlightPlan(id) {
    var url = baseURL + "/api/flightplan/";
    var urlPath = url.concat(id.toString());
    $.getJSON(urlPath, function (data) {
        const company = document.getElementById("cmpny");
        company.innerHTML = data["company_name"];

        const passengers = document.getElementById("psng")
        passengers.innerHTML = data["passengers"];

        const initialLocation = data["initial_location"];
        setInitialLocation(initialLocation);

        const date = new Date();
        date.toUTCString(initialLocation["date_time"]);
        setDepartureTime(date);

        var flightTime = 0;
        let flightSegments = data["segments"];
        flightSegments.unshift(initialLocation);
        drawPlanPath(flightSegments);
        for (var i = 1; i < flightSegments.length; i++) {
            flightTime += data["segments"][i]["timespan_seconds"];
        }
        setArrivalTime(date, flightTime);
        setFinalLocation(flightSegments[i - 1]);


    }).fail(function (data) {
        errorHandle(data.status, "Could not find flight plan");
    });
}

function setInitialLocation(initialLocation) {
    const initialLocationLat = document.getElementById("iniloclat");
    initialLocationLat.innerHTML = initialLocation["latitude"].toFixed(3);
    const initialLocationLon = document.getElementById("iniloclon");
    initialLocationLon.innerHTML = initialLocation["longitude"].toFixed(3);
}

function setDepartureTime(date) {
    const initialLocationTime = document.getElementById("dep");
    initialLocationTime.innerHTML = date;
}

function setArrivalTime(date, flightTime) {
    const arrivalDate = new Date();
    arrivalDate.setSeconds(date.getSeconds() + flightTime);
    const arrivalTime = document.getElementById("arvl");
    arrivalTime.innerHTML = arrivalDate;
}

function setFinalLocation(finalLocation) {
    const finalLocationLat = document.getElementById("finloclat");
    finalLocationLat.innerHTML = finalLocation["latitude"].toFixed(3);
    const finalLocationLon = document.getElementById("finloclon");
    finalLocationLon.innerHTML = finalLocation["longitude"].toFixed(3);
}

function resetDetails() {
    const company = document.getElementById("cmpny");
    company.innerHTML = "";

    const passengers = document.getElementById("psng")
    passengers.innerHTML = "";

    const initialLocationLat = document.getElementById("iniloclat");
    initialLocationLat.innerHTML = "";

    const initialLocationLon = document.getElementById("iniloclon");
    initialLocationLon.innerHTML = "";

    const arrivalTime = document.getElementById("arvl");
    arrivalTime.innerHTML = "";

    const initialLocationTime = document.getElementById("dep");
    initialLocationTime.innerHTML = "";

    const finalLocationLat = document.getElementById("finloclat");
    finalLocationLat.innerHTML = "";

    const finalLocationLon = document.getElementById("finloclon");
    finalLocationLon.innerHTML = "";
}