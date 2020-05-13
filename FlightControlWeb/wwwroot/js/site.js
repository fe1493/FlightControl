

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








require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function (Map, MapView, Graphic, GraphicsLayer) {

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
        var point = {
            type: "point",
            longitude: 32.80657463861,
            latitude: 34.0005930608889
        };

        var simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],  // orange
            outline: {
                color: [255, 255, 255], // white
                width: 1
            }
        };
        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        var point2 = {
            type: "point",
            longitude: 30.80657463861,
            latitude: 34.0005930608889
        };


        var pointGraphic1 = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
        });
        var pointGraphic2 = new Graphic({
            geometry: point2,
            symbol: simpleMarkerSymbol
        });

        graphicsLayer.add(pointGraphic1);
        graphicsLayer.add(pointGraphic2);

});



function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}