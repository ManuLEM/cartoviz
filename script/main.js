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
var layers = [];
var agesNumber = '';
var numbersToShow = [[7,10], [11,14], [15,17], [18,24], [25,34], [35,49], [50,64], [65,77]];
for (var i = 0; i < numbersToShow.length; i++) {
	agesNumber += "<span>"+ numbersToShow[i][0] +" - "+ numbersToShow[i][1] +"</span>";
};

$('#numbers').html( agesNumber );

for (var i = 0; i < $('#numbers span').length; i++) {
	$('#numbers span').eq(i).css({
		left: ((($('#numbers').width() - 29) / 7) * i)
	});
};
var age_user = (numbersToShow[$('#timeline').val()-1][0] + numbersToShow[$('#timeline').val()-1][1]) /2;

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

function getIconColor() {
	if ( age_user >= 7 && age_user <= 10 ){
	    return '#ff4040';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return '#e6399b';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return '#e57939';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return '#269954';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return '#2b95a4';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return '#942da8';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return '#b2812c';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return '#297c04';
	}
}

function getColor(feature) {
	if ( age_user >= 7 && age_user <= 10 ){
	    return feature.addedData.elements > 18   ? '#992626' :
	           feature.addedData.elements > 15   ? '#cc3333' :
	           feature.addedData.elements > 10   ? '#ff4040' :
	           feature.addedData.elements > 7   ? '#ff6666' :
	           feature.addedData.elements > 3    ? '#ff8c8c' :
	                      						   '#ffb2b2';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return feature.addedData.elements > 18   ? '#8a225d' :
	           feature.addedData.elements > 15   ? '#b82d7c' :
	           feature.addedData.elements > 10   ? '#e6399b' :
	           feature.addedData.elements > 7    ? '#eb60af' :
	           feature.addedData.elements > 3    ? '#f088c3' :
	                      						   '#f5afd7';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return feature.addedData.elements > 18   ? '#7f4320' :
	           feature.addedData.elements > 15   ? '#b25e2c' :
	           feature.addedData.elements > 10   ? '#e57939' :
	           feature.addedData.elements > 7    ? '#ff9353' :
	           feature.addedData.elements > 3    ? '#ffab79' :
	                      						   '#ffc39f';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return feature.addedData.elements > 18   ? '#1b6d3c' :
	           feature.addedData.elements > 15   ? '#269954' :
	           feature.addedData.elements > 10   ? '#31c56c' :
	           feature.addedData.elements > 7    ? '#4bde86' :
	           feature.addedData.elements > 3    ? '#73e5a1' :
	                      						   '#9bedbc';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return feature.addedData.elements > 18   ? '#20707b' :
	           feature.addedData.elements > 15   ? '#2b95a4' :
	           feature.addedData.elements > 10   ? '#36bbce' :
	           feature.addedData.elements > 7    ? '#5ec8d7' :
	           feature.addedData.elements > 3    ? '#86d6e1' :
	                      						   '#aee3eb';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return feature.addedData.elements > 18   ? '#6f227e' :
	           feature.addedData.elements > 15   ? '#942da8' :
	           feature.addedData.elements > 10   ? '#b939d3' :
	           feature.addedData.elements > 7    ? '#c760db' :
	           feature.addedData.elements > 3    ? '#d588e4' :
	                      						   '#e3afed';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return feature.addedData.elements > 18   ? '#7f5c20' :
	           feature.addedData.elements > 15   ? '#b2812c' :
	           feature.addedData.elements > 10   ? '#e5a639' :
	           feature.addedData.elements > 7    ? '#ffc053' :
	           feature.addedData.elements > 3    ? '#ffce79' :
	                      						   '#ffdc9f';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return feature.addedData.elements > 18   ? '#1f5d03' :
	           feature.addedData.elements > 15   ? '#297c04' :
	           feature.addedData.elements > 10   ? '#349c06' :
	           feature.addedData.elements > 7    ? '#5caf37' :
	           feature.addedData.elements > 3    ? '#85c369' :
	                      						   '#add79b';
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
	data.bars.exists = false;
	$('#menu ul').append('<li class="bars"><img src="Icons/barsjeunes.png" /></li>');

	$.getJSON("./data/les_salles_de_cinemas_en_ile-de-france.geojson", function(cinemas) {
		data.cinemas = cinemas;
		data.cinemas.markers = [];
		data.cinemas.ages = [7, 77];
		data.cinemas.exists = false;
		$('#menu ul').append('<li class="cinemas"><img src="Icons/cinema.png" /></li>');
	});

	$.getJSON("./data/manege_et_jeux.geojson", function(maneges) {
		data.maneges = maneges;
		data.maneges.markers = [];
		data.maneges.ages = [7, 10];
		data.maneges.exists = false;
		$('#menu ul').append('<li class="maneges"><img src="Icons/manege.png" /></li>');
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
		$('#menu ul li').hide();
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
						data[dataSet].exists = true;
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
		$.each(data, function( dataSet ){
			if (data[dataSet].exists) {
				$('#menu ul li.'+dataSet).show();
			};
		});

		$('#timeline').on('change', function(){
			$('#menu ul li').hide();
			$.each(data, function( dataSet ){
				if (data[dataSet].exists) {
					data[dataSet].exists = false;
				};
			});
			age_user = (numbersToShow[$('#timeline').val()-1][0] + numbersToShow[$('#timeline').val()-1][1]) /2;
			$('#menu ul li').css('background-color', getIconColor());

			for( var j = 0 in layers){
				parArrondissement[j].elements = 0;
				$.each(data, function( dataSet ){
					for( var i = 0 in data[dataSet].features){
						if ( data[dataSet].features[i].geometry && data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layers[j].feature.geometry.coordinates[0][0]) ){	
							parArrondissement[j].elements ++;
							data[dataSet].exists = true;
						}
					}
				});
				collection.features[j].addedData = parArrondissement[j];

				layers[j].setStyle({
					fillColor: getColor(collection.features[j])
				});
				$.each(data, function( dataSet ){
					if (data[dataSet].exists) {
						$('#menu ul li.'+dataSet).show();
					};
				});
			}
		});


		$('#menu ul li').css('background-color', getIconColor());
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