
function addServer() {
    const serverURL = document.getElementById("serverId");
    let myServer = {
        ServerId: 21,
        ServerURL: serverURL.value.trim()
    };
    fetch('api/server', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myServer)
    })
        .then(response => response.json())
        .then(() => {
            serverURL.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));



}

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
        center: [32.00, 34.02700],
        zoom: 4
    });

    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

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
                color: [0,0,0],
                width: 3
            };
            var myPolyline = {
                type: "polyline",
                paths: [
                ]
            };
            for (i = 0; i < segments.length; i++) {
                myPolyline.paths.push([segments[i]["lat"], segments[i]["lon"]]);
            }
            polylineGraphic.geometry = myPolyline;
            polylineGraphic.symbol = simpleLineSymbol;

            graphicsLayer.add(polylineGraphic);
            currentPath = polylineGraphic;


        }
        function removeSegments() {
            graphicsLayer.remove(currentPath);
            console.log("in remve");
            
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

function addNewPlan() {
    
    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude");
    var id = document.getElementById("planId");
    const i = id.value;
    const l = Number(lat.value);
    const k = Number(lon.value);
    addPlan(l, k, i);
    const lq = [];
    var seg1 = { "lat": 32, "lon": 32 };
    var seg2 = { "lat": 46, "lon": 21 };
    var seg3 = { "lat": 45, "lon": 36 };
    var seg4 = { "lat": 13, "lon": 55 };
    lq.push(seg1);
    lq.push(seg2);
    lq.push(seg3);
    lq.push(seg4);

    drawSegments(lq);
}
function drawPlanPath(segments) {
    drawSegments(segments);
}
function hidePath() {
    removeSegments();
}



function updatePlanOnMap() {

    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude");
    var id = document.getElementById("planId");
    const i = id.value;
    const l = Number(lat.value);
    const k = Number(lon.value);
    updatePlan(l, k, i);

}
