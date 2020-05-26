async function errorHandle(data, errorDta) {
    $("#errMsg").text("Status error: " + data.status + " " + errorDta);
    $("#error").show().delay(2000).fadeOut();


}