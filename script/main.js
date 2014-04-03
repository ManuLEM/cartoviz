var map = L.map('map').setView([48.8567, 2.3508], 12);

var southWest = new L.latLng([48.81, 2.22], map.getMaxZoom());
var northEast = new L.latLng([48.91, 2.48], map.getMaxZoom());
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	subdomains: '1234',
	minZoom: 12,
	zoom: false
}).addTo(map);

var myLayer = L.geoJson().addTo(map);
var parArrondissement = [
	{
		arrondissement: 75001,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75002,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75003,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75004,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75005,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75006,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75007,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75008,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75009,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75010,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75011,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75012,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75013,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75014,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75015,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75016,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75017,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75018,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75019,
		elements: 0,
		visible: false
	},
	{
		arrondissement: 75020,
		elements: 0,
		visible: false
	},
];
var number = 0;
var prev_feature = false;
var prev_color = false;
var data = {};
var age_user = $('#timeline').val();
var layers = [];

function pointIsInPoly(p, polygon) {
    var isInside = false;
    var minX = polygon[0][0], maxX = polygon[0][0];
    var minY = polygon[0][1], maxY = polygon[0][1];
    for (var n = 1; n < polygon.length; n++) {
        var q = polygon[n];
        minX = Math.min(q[0], minX);
        maxX = Math.max(q[0], maxX);
        minY = Math.min(q[1], minY);
        maxY = Math.max(q[1], maxY);
    }

    if (p[0] < minX || p[0] > maxX || p[1] < minY || p[1] > maxY) {
        return false;
    }

    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
        if ( (polygon[i][1] > p[1]) != (polygon[j][1] > p[1]) &&
                p[0] < (polygon[j][0] - polygon[i][1]) * (p[1] - polygon[i][1]) / (polygon[j][0] - polygon[i][1]) + polygon[i][0] ) {
            isInside = !isInside;
        }
    }

    return isInside;
}

function getColor(feature) {
	if ( age_user >= 7 && age_user <= 10 ){
	    return feature.addedData.elements > 20   ? '#e53939' :
	           feature.addedData.elements > 17   ? '#ff4040' :
	           feature.addedData.elements > 13   ? '#ff5353' :
	           feature.addedData.elements > 10   ? '#ff6666' :
	           feature.addedData.elements > 7    ? '#ff7979' :
	           feature.addedData.elements > 4    ? '#ff8c8c' :
	           feature.addedData.elements > 2    ? '#ff9f9f' :
	                      						   '#ffb2b2';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return feature.addedData.elements > 20   ? '#cf338b' :
	           feature.addedData.elements > 17   ? '#e6399b' :
	           feature.addedData.elements > 13   ? '#e84ca5' :
	           feature.addedData.elements > 10   ? '#eb60af' :
	           feature.addedData.elements > 7    ? '#ed74b9' :
	           feature.addedData.elements > 4    ? '#f088c3' :
	           feature.addedData.elements > 2    ? '#f29ccd' :
	                      						   '#f5afd7';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return feature.addedData.elements > 20   ? '#e57939' :
	           feature.addedData.elements > 17   ? '#ff8740' :
	           feature.addedData.elements > 13   ? '#ff9353' :
	           feature.addedData.elements > 10   ? '#ff9f66' :
	           feature.addedData.elements > 7    ? '#ffab79' :
	           feature.addedData.elements > 4    ? '#ffb78c' :
	           feature.addedData.elements > 2    ? '#ffc39f' :
	                      						   '#ffcfb2';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return feature.addedData.elements > 20   ? '#31c56c' :
	           feature.addedData.elements > 17   ? '#37db79' :
	           feature.addedData.elements > 13   ? '#4bde86' :
	           feature.addedData.elements > 10   ? '#5ee293' :
	           feature.addedData.elements > 7    ? '#73e5a1' :
	           feature.addedData.elements > 4    ? '#87e9ae' :
	           feature.addedData.elements > 2    ? '#9bedbc' :
	                      						   '#aff0c9';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return feature.addedData.elements > 20   ? '#095793' :
	           feature.addedData.elements > 17   ? '#0b61a4' :
	           feature.addedData.elements > 13   ? '#2370ad' :
	           feature.addedData.elements > 10   ? '#3b80b6' :
	           feature.addedData.elements > 7    ? '#5490bf' :
	           feature.addedData.elements > 4    ? '#6ca0c8' :
	           feature.addedData.elements > 2    ? '#85b0d1' :
	                      						   '#9dbfda';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return feature.addedData.elements > 20   ? '#095793' :
	           feature.addedData.elements > 17   ? '#0b61a4' :
	           feature.addedData.elements > 13   ? '#2370ad' :
	           feature.addedData.elements > 10   ? '#3b80b6' :
	           feature.addedData.elements > 7    ? '#5490bf' :
	           feature.addedData.elements > 4    ? '#6ca0c8' :
	           feature.addedData.elements > 2    ? '#85b0d1' :
	                      						   '#9dbfda';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return feature.addedData.elements > 20   ? '#095793' :
	           feature.addedData.elements > 17   ? '#0b61a4' :
	           feature.addedData.elements > 13   ? '#2370ad' :
	           feature.addedData.elements > 10   ? '#3b80b6' :
	           feature.addedData.elements > 7    ? '#5490bf' :
	           feature.addedData.elements > 4    ? '#6ca0c8' :
	           feature.addedData.elements > 2    ? '#85b0d1' :
	                      						   '#9dbfda';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return feature.addedData.elements > 20   ? '#095793' :
	           feature.addedData.elements > 17   ? '#0b61a4' :
	           feature.addedData.elements > 13   ? '#2370ad' :
	           feature.addedData.elements > 10   ? '#3b80b6' :
	           feature.addedData.elements > 7    ? '#5490bf' :
	           feature.addedData.elements > 4    ? '#6ca0c8' :
	           feature.addedData.elements > 2    ? '#85b0d1' :
	                      						   '#9dbfda';
	}
}

function removeMarkers(){
	$.each(data, function( dataSet ){
		for( var i = 0 in data[dataSet].markers){
			map.removeLayer(data[dataSet].markers[i]);
		}
	});
}

$.getJSON("./data/liste-des-cafes-a-un-euro.geojson", function(bars) {
	data.bars = bars;
	data.bars.markers = [];
	data.bars.ages = [18, 35];

	$.getJSON("./data/les_salles_de_cinemas_en_ile-de-france.geojson", function(cinemas) {
		data.cinemas = cinemas;
		data.cinemas.markers = [];
		data.cinemas.ages = [7, 77];
	});

	$.getJSON("./data/manege_et_jeux.geojson", function(maneges) {
		data.maneges = maneges;
		data.maneges.markers = [];
		data.maneges.ages = [7, 10];
	});
}).done(function(){
	function get_data(layer){
		var element_id = 0;
		setTimeout(function(){
			$.each(data, function( dataSet ){
				for( var i = 0 in data[dataSet].features ){
					if ( data[dataSet].features[i].geometry && data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layer.feature.geometry.coordinates[0][0]) ){
						data[dataSet].markers[ element_id ] = L.marker([data[dataSet].features[i].geometry.coordinates[1], data[dataSet].features[i].geometry.coordinates[0]]);
						map.addLayer(data[dataSet].markers[ element_id ]);
						element_id ++;
					};
				};
			});

		}, 300);
	}

	$.getJSON("./data/arrondissements.geojson", function(collection) {
		window.geojson = L.geoJson(collection, {
			onEachFeature: onEachFeature,
			style: {
		        color: 'white',
		        dashArray: '7',
			    weight: 2,
			    opacity: 1,
			    fillOpacity: 0.9
		    }
		}).addTo(map);

		function clickFeature(e) {
			var layer = e.target;
			map.fitBounds(layer.getBounds());
			if (parArrondissement[parseInt(layer.feature.properties.Name) - 1].visible === false) {
				if(prev_feature && prev_color){
					prev_feature.setStyle({ fillColor: prev_color });
				}
				prev_feature = e.layer;
				prev_color = e.layer.options.fillColor;
				for(var z = 0 in parArrondissement){
					parArrondissement[z].visible = false;
				}

				layer.setStyle({ fillColor: 'transparent' });
				
				removeMarkers();
				get_data(layer);

				parArrondissement[parseInt(layer.feature.properties.Name) - 1].visible = true;
			};
		}

		function onEachFeature(feature, layer) {
			$.each(data, function( dataSet ){
				for( var i = 0 in data[dataSet].features){
					if ( data[dataSet].features[i].geometry && data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layer.feature.geometry.coordinates[0][0]) ){	
						parArrondissement[number].elements ++;
					}
				}
			});

			layers[number] = layer;

			feature.addedData = parArrondissement[number];
			number ++;
			layer.setStyle({
				fillColor: getColor(feature)
			});

			layer.on({
				click: clickFeature
			});
		}

		$('#timeline').on('change', function(){
			age_user = $(this).val();

			for( var j = 0 in layers){
				parArrondissement[j].elements = 0;
				$.each(data, function( dataSet ){
					for( var i = 0 in data[dataSet].features){
						if ( data[dataSet].features[i].geometry && data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layers[j].feature.geometry.coordinates[0][0]) ){	
							parArrondissement[j].elements ++;
						}
					}
				});
				collection.features[j].addedData = parArrondissement[j];

				layers[j].setStyle({
					fillColor: getColor(collection.features[j])
				});
			}
		});
	});
});

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }
// map.on('click', onMapClick);