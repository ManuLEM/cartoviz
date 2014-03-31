var map = L.map('map').setView([48.8567, 2.3508], 13);

var southWest = new L.latLng([48.81, 2.22], map.getMaxZoom());
var northEast = new L.latLng([48.91, 2.48], map.getMaxZoom());
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	subdomains: '1234',
	minZoom: 13
}).addTo(map);

var myLayer = L.geoJson().addTo(map);
var data = false;

function getColor() {
    return "#ff7800";
}

function get_data(layer){
	setTimeout(function(){
		$.getJSON("./data/liste-des-cafes-a-un-euro.geojson", function(bars) {
			for( var i = 0 in bars.features){
				var arr_number = 75000 + parseInt(layer.feature.properties.Name);
				if (arr_number === bars.features[i].properties.arrondissement) {
					L.marker(bars.features[i].properties.lat_lon).addTo(map);
				};
			}
		});
	}, 200);
}

$.getJSON("./data/arrondissements.geojson", function(collection) {
	var geojson = L.geoJson(collection, {
		onEachFeature: onEachFeature,
		style: {
	        fillColor: getColor(),
	        color: 'white',
	        dashArray: '7',
		    weight: 2,
		    opacity: 1,
		    fillOpacity: 0.3
	    }
	}).addTo(map);

	function clickFeature(e) {
		var layer = e.target;
		map.fitBounds(layer.getBounds());
		if (!data) {
			get_data(layer);
			data = true;
		};
		// console.log(map.getCenter());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			click: clickFeature
		});
	}
});



// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }
// map.on('click', onMapClick);