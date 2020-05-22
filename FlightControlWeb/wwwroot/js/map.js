let myPic;
var airplansDic = {};
var currentPath;

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


    //event of click on airplan        
    view.on("click", function (evt) {
        var screenPoint = evt.screenPoint;
        view.hitTest(screenPoint)
            .then(function (response) {

                var airplanClicked = response.results[0].graphic.attributes.name;
                showFlightDetails(airplanClicked);
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
            color: [0, 0, 0],
            width: 3
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

    window.addPlan = addPlan;
    window.updatePlan = updatePlan;
    window.drawSegments = drawSegments;
    window.removeSegments = removeSegments;
});

function addNewPlan(latitude, longitude, id) {
    addPlan(latitude, longitude, id);
}
function drawPlanPath(segments) {
    drawSegments(segments);
}
function hidePath() {
    removeSegments();
}

function updatePlanOnMap(latitude, longitude, id) {
    updatePlan(latitude, longitude, id);

}
//this method calls the getFlightDetails method in details.js
function showFlightDetails(id) {
    getFlightPlan(id);

}