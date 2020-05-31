//pop up the error message and print the error, fade out after 2 seconds
//parameters: status code, and string with the details of the error
async function errorHandle(errStat, errDta) {
    $("#errMsg").text("Status error: " + errStat + ", " + errDta);
    $("#error").show().delay(2000).fadeOut();


}