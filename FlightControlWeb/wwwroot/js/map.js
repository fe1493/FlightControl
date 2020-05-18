
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
let myGraphLayer
var airplansDic = {};

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
    myGraphicsLayer = graphicsLayer;

    var airplanPicture = new PictureMarkerSymbol({
        url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Airplane_silhouette.png",
        width: "50px",
        height: "50px"
    });
    myPic = airplanPicture;


    var simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // orange
        width: 2
    };

    var polyline = {
        type: "polyline",
        paths: [
            [32.821527826096, 34.0139576938577],
            [32.814893761649, 34.0080602407843],
            [33.808878330345, 34.0016642996246]
        ]
    };

        var polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: simpleLineSymbol
        });

    graphicsLayer.add(polylineGraphic);





    function addPlan(a, b, id) {
        var airplanGraphic = new Graphic();
        airplanGraphic.attributes = {
            name: id,
        };
        airplansDic[airplanGraphic.attributes.name] = airplanGraphic;
        myGraphicsLayer.add(airplanGraphic);

        var point = {
            type: "point",
        };
        point.latitude = a;
        point.longitude = b;

        airplanGraphic.geometry = point;
        airplanGraphic.symbol = myPic;
    }


    function updatePlan(a, b, name) {
        var apg = airplansDic[name];
        var point = {
            type: "point",
        };
        point.latitude = a;
        point.longitude = b;
        apg.geometry = point;
    }

    window.addPlan = addPlan;
    window.updatePlan = updatePlan;


});

function test() {

    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude")
    const l = Number(lat.value);
    const k = Number(lon.value);
    addPlan(l, k, "elal");

}
function testUpdate() {

    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude")
    const l = Number(lat.value);
    const k = Number(lon.value);
    updatePlan(l, k, "elal");
}