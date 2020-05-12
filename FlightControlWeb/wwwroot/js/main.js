function getFlight() {
    var myFlight = document.getElementById("fly");
    myFlight.innerHTML = "EL-AL";
}
$(function () {
    $.ajax({
        type: 'GET',dataType:"json", url: 'api/flight', success: function (data) {
            console.log('success', data);
        }
    });
    
});