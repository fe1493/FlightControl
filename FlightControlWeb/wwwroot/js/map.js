let myPic;
let myClickedPic;
let airplansDic = {};
let currentPath;
let isPathVisible = false;
let airplanClicked;

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/symbols/PictureMarkerSymbol"
], function (Map, MapView, Graphic, GraphicsLayer, PictureMarkerSymbol) {

    var map = new Map({
        basemap: "streets"
    });



    var view = new MapView({
        container: "map",
        map: map,
        center: [33.80, 32.2700],
        zoom: 3
    });

    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    var alterAirplanPicture = new PictureMarkerSymbol({
        url: "https://cdn0.iconfinder.com/data/icons/vehicles-23/64/vehicles-23-512.png",
        width: "80px",
        height: "80px"
            

    });
    myClickedPic = alterAirplanPicture;

    //event of click on airplan        
    view.on("click", function (evt) {
        var screenPoint = evt.screenPoint;
        view.hitTest(screenPoint)
            .then(function (response) {
                changePlanClicked();
                airplanClicked = response.results[0];
                // click on map
                if (airplanClicked == null) {
                    // console.log("mapclick");
                    if (colorId != -1) {
                        // found the color row and disable the color
                        let coloredRow = document.getElementById(colorId);
                        coloredRow.style.backgroundColor = "white";
                        colorId = -1;
                    }
                }
                // click on plan
                else {
                    airplanClicked.graphic.symbol = myClickedPic;
                    let id = airplanClicked.graphic.attributes.name;
                    colorId = id;
                    let coloredRow = document.getElementById(colorId);
                    coloredRow.style.backgroundColor = "red";
                    showFlightDetails(id);
                }
            });
    });

    var airplanPicture = new PictureMarkerSymbol({
        url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Airplane_silhouette.png",
        width: "50px",
        height: "50px"

    });
    myPic = airplanPicture;

    function drawSegments(segments) {
        let i = 0;

        var polylineGraphic = new Graphic();
        currentPath = polylineGraphic;
        var simpleLineSymbol = {
            type: "simple-line",
            color: "red",
            width: "2px",
            style: "short-dot"
        };
        var myPolyline = {
            type: "polyline",
            paths: [
            ]
        };

        for (i = 0; i < segments.length; i++) {
            myPolyline.paths.push([segments[i]["longitude"], segments[i]["latitude"]]);
        }
        polylineGraphic.geometry = myPolyline;
        polylineGraphic.symbol = simpleLineSymbol;

        graphicsLayer.add(polylineGraphic);
        currentPath = polylineGraphic;

    }
    function removeSegments() {
        graphicsLayer.remove(currentPath);
    }



    function addPlan(lat, lon, id) {
        var airplanGraphic = new Graphic();

        airplanGraphic.attributes = {
            name: id,
        };
        airplansDic[airplanGraphic.attributes.name] = airplanGraphic;
        graphicsLayer.add(airplanGraphic);

        var point = {
            type: "point",
        };
        point.latitude = lat;
        point.longitude = lon;

        airplanGraphic.geometry = point;
        airplanGraphic.symbol = myPic;
    }

    function updatePlan(lat, lon, id) {
        var apg = airplansDic[id];
        var point = {
            type: "point",
        };
        point.latitude = lat;
        point.longitude = lon;
        apg.geometry = point;
    }

        function removePlanOnMap(id) {
            var apg = airplansDic[id];
            graphicsLayer.remove(apg);
        }

    window.addPlan = addPlan;
    window.updatePlan = updatePlan;
    window.drawSegments = drawSegments;
        window.removeSegments = removeSegments;
        window.removePlanOnMap = removePlanOnMap;
});

function drawNewPlan(latitude, longitude, id) {
    addPlan(latitude, longitude, id);
}
function drawPlanPath(segments) {
    if (isPathVisible == true) {
        hidePath();
    }
    drawSegments(segments);
    isPathVisible = true;
}

function hidePath() {
    removeSegments();
}

function updatePlanOnMap(latitude, longitude, id) {
    updatePlan(latitude, longitude, id);

}



//this method calls the getFlightDetails method in details.js and update the "flight details" section
function showFlightDetails(id) {
    hidePath();
    getFlightPlan(id);
}
//cancel the path drawing on the map the cancel the clicked plan
function changePlanClicked() {
    if (airplanClicked != null) {
        airplanClicked.graphic.symbol = myPic;
    }
    for (var key in airplansDic) {
        // check if the property/key is defined in the object itself, not in parent
        //if (airplansDic.hasOwnProperty(key)) {
        //    console.log(key, dictionary[key]);
        //}
        airplansDic[key].symbol = myPic;
    }
    resetDetails();
    hidePath();
}
//delete the graphic of the airplan with the given id
function removePlan(id) {
    removePlanOnMap(id);
}

//draw new plan or update the placement of the old one's
function drawPlan(id, latitude, longitude) {
    if (id in airplansDic) {
        updatePlanOnMap(latitude, longitude, id);
    } else {
        drawNewPlan(latitude, longitude, id);
    }
}

// change the symbol (picture) of the plan - CLICKED
function changePicClicked(id) {
    airplansDic[id].symbol = myClickedPic;
}

// change the symbol (picture) of the plan - NOT CLICKED
function changePicNotClicked(id) {
    airplansDic[id].symbol = myPic;
}