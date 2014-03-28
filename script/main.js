var map = L.map('map').setView([48.8567, 2.3508], 13);

var southWest = new L.latLng([48.81, 2.22], map.getMaxZoom());
var northEast = new L.latLng([48.91, 2.48], map.getMaxZoom());
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
	minZoom: 13
}).addTo(map);

var myLayer = L.geoJson().addTo(map);

$.getJSON("./data/arrondissements.geojson", function(collection) {
	var geojson = L.geoJson(collection, {
		onEachFeature: onEachFeature,
		style: {
	        fillColor: "#ff7800",
		    color: "red",
		    weight: 1,
		    opacity: 1,
		    fillOpacity: 0.3
	    }
	}).addTo(map);

	function clickFeature(e) {
		var layer = e.target;
		map.fitBounds(layer.getBounds());
		//console.log(layer.feature.properties.name); //country info from geojson
	}

	function onEachFeature(feature, layer) {
		layer.on({
		  click: clickFeature
		});
	}

	myLayer.on({
		click: function() {
			map.setView([0,0],8);
		}
	});
});

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);