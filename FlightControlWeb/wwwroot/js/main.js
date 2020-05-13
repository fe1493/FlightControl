let flightplan = {"companyname":"EL-AL" }
function addflightplan() {

    let postOption = preparePost(flightplan);
    fetch("/api/flightplan", postOption).
        then(response => response.json).
        catch(error => console.log(error))

}
let i =0
function getFlights() {
    $.getJSON("../api/flight", function (data) {

        data.forEach(function (flight) {
            $(flight).each(function (index, value) {
                addFlightsTable(value);
            })

        })



    });
}



function addFlightsTable(flight) {
    $("#tbid > tbody:last-child").append("<tr><td>" + flight.flightId + "</td>" +
        "<td>" + flight.companyName + "</td>" +
        "<td>" + flight.isExternal + "</td></tr>");

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























