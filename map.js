var map = L.map('map').setView([51.0447, -114.0719], 12);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=cEgaV9M2KZkGEYF5k2vO',{
       tileSize: 512,
       zoomOffset: -1,
       minZoom: 1,
       attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
       crossOrigin: true
     }).addTo(map);

L.control.scale().addTo(map);

map.pm.addControls({
  position: 'topleft',
  drawCircle: false,
});

var layer;
var geojson;
var options;
var simplified;
var line;

map.on('pm:create', function(e) {
    layer = e.layer; //e.layer
    geojson = layer.toGeoJSON();


    options = {tolerance: 0.5, highQuality: false};
    simplified = turf.simplify(geojson, options);

    line = L.geoJSON(null);
    line.addData(simplified);

      e.layer.on('pm:edit', function(x) {
          console.log("editting")
        console.log('edit', x)
      });
    });

function simplify(){
    map.removeLayer(layer);
    line.addTo(map);
}


function remove(){
    map.removeLayer(line);
    map.removeLayer(layer);
    map.removeLayer(simplified);
  }
