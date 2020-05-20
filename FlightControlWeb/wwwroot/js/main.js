let flightplan = {"companyname":"EL-AL" }
function addflightplan() {

    let postOption = preparePost(flightplan);
    fetch("/api/flightplan", postOption).
        then(response => response.json).
        catch(error => console.log(error))

}
let i =0
function getFlights() {
    var d = new Date();
    let currentTime = d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) +
        "-" + ("00" + d.getDate()).slice(-2) + "T" + ("00" + d.getHours()).slice(-2) +
        ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2) + "Z";
    console.log(currentTime);
    let productsUrl = "http://ronyut.atwebpages.com/ap2/api/Flights?relative_to=" + currentTime;
    $.getJSON(productsUrl, function (data) {
        console.log(data);
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























