var map = L.map('map').setView([48.8567, 2.3508], 12);

var southWest = new L.latLng([48.81, 2.22], map.getMaxZoom());
var northEast = new L.latLng([48.91, 2.48], map.getMaxZoom());
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	subdomains: '1234',
	minZoom: 12,
	maxZoom: 18
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

for (var i = 0; i < $('#numbers span').length; i++) {
	$('#numbers span').eq(i).css({
		left: ((($('#numbers').width() - 38) / 7) * i) - 10
	});
};

map._layersMaxZoom=12;

map.on('zoomend', function(){
	if (map.getZoom() <= 12) {
		$('.leaflet-control-zoom.leaflet-bar.leaflet-control').hide();
		if(prev_feature && prev_color){
			prev_feature.setStyle({ fillColor: prev_color });
		}
		prev_feature = false;
		prev_color = false;
		for(var z = 0 in parArrondissement){
			parArrondissement[z].visible = false;
		}
		
		removeMarkers();
		map._layersMaxZoom=12;
	};
});

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
	    return '#e91212';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return '#d51883';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return '#f8650f';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return '#02b3cb';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return '#a402c5';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return '#de9b03';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return '#349c06';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return '#6e6e6e';
	}
}

function getColor(feature) {
	if ( age_user >= 7 && age_user <= 10 ){
	    return feature.addedData.elements > 100  ? '#ba0e0e' :
	           feature.addedData.elements > 75   ? '#e91212' :
	           feature.addedData.elements > 50   ? '#ed4141' :
	           feature.addedData.elements > 30   ? '#f17070' :
	           feature.addedData.elements > 15   ? '#f6a0a0' :
	                      						   '#facfcf';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return feature.addedData.elements > 100  ? '#aa1368' :
	           feature.addedData.elements > 75   ? '#d51883' :
	           feature.addedData.elements > 50   ? '#dd469b' :
	           feature.addedData.elements > 30   ? '#e574b4' :
	           feature.addedData.elements > 15   ? '#eea2cd' :
	                      						   '#f6d0e6';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return feature.addedData.elements > 100  ? '#c6500c' :
	           feature.addedData.elements > 75   ? '#f8650f' :
	           feature.addedData.elements > 50   ? '#f9833e' :
	           feature.addedData.elements > 30   ? '#faa26f' :
	           feature.addedData.elements > 15   ? '#fcc19f' :
	                      						   '#fde0cf';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return feature.addedData.elements > 100  ? '#018fa2' :
	           feature.addedData.elements > 75   ? '#02b3cb' :
	           feature.addedData.elements > 50   ? '#34c2d5' :
	           feature.addedData.elements > 30   ? '#67d1df' :
	           feature.addedData.elements > 15   ? '#99e0ea' :
	                      						   '#cceff4';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return feature.addedData.elements > 100  ? '#83019d' :
	           feature.addedData.elements > 75   ? '#a402c5' :
	           feature.addedData.elements > 50   ? '#b634d0' :
	           feature.addedData.elements > 30   ? '#c867dc' :
	           feature.addedData.elements > 15   ? '#da99e7' :
	                      						   '#ecccf3';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return feature.addedData.elements > 100  ? '#b17c02' :
	           feature.addedData.elements > 75   ? '#de9b03' :
	           feature.addedData.elements > 50   ? '#e4af35' :
	           feature.addedData.elements > 30   ? '#ebc367' :
	           feature.addedData.elements > 15   ? '#f1d79a' :
	                      						   '#f8ebcc';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return feature.addedData.elements > 100  ? '#297c04' :
	           feature.addedData.elements > 75   ? '#349c06' :
	           feature.addedData.elements > 50   ? '#5caf37' :
	           feature.addedData.elements > 30   ? '#85c369' :
	           feature.addedData.elements > 15   ? '#add79b' :
	                      						   '#d6ebcd';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return feature.addedData.elements > 100  ? '#585858' :
	           feature.addedData.elements > 75   ? '#6e6e6e' :
	           feature.addedData.elements > 50   ? '#8b8b8b' :
	           feature.addedData.elements > 30   ? '#a8a8a8' :
	           feature.addedData.elements > 15   ? '#c5c5c5' :
	                      						   '#e2e2e2';
	}
}

function removeMarkers(){
	$.each(data, function( dataSet ){
		for( var i = 0 in data[dataSet].markers){
			map.removeLayer(data[dataSet].markers[i]);
		}
	});
}
$.getJSON("./data/recensement_des_equipements_sportifs_a_paris.geojson", function(multi_sport) {
	data.multi_sport = multi_sport;
	data.multi_sport.markers = [];
	data.multi_sport.ages = [7, 77];
	data.multi_sport.exists = false;
	$('#menu ul').append('<li class="multi_sport"><img src="Icons/sports.png" /> <span>Centre Sportif</span></li>');

	$.getJSON("./data/les_salles_de_cinemas_en_ile-de-france.geojson", function(cinemas) {
		data.cinemas = cinemas;
		data.cinemas.markers = [];
		data.cinemas.ages = [7, 77];
		data.cinemas.exists = false;
		$('#menu ul').append('<li class="cinemas"><img src="Icons/cinema.png" /> <span>Cinéma</span></li>');
	});

	$.getJSON("./data/manege_et_jeux.geojson", function(maneges) {
		data.maneges = maneges;
		data.maneges.markers = [];
		data.maneges.ages = [7, 10];
		data.maneges.exists = false;
		$('#menu ul').append('<li class="maneges"><img src="Icons/manege.png" /> <span>Manège</span></li>');
	});

	$.getJSON("./data/liste-des-cafes-a-un-euro.geojson", function(bars) {
		data.bars = bars;
		data.bars.markers = [];
		data.bars.ages = [18, 35];
		data.bars.exists = false;
		$('#menu ul').append('<li class="bars"><img src="Icons/barsjeunes.png" /> <span>Bar</span></li>');
	});

	$.getJSON("./data/poker.geojson", function(poker) {
		data.poker = poker;
		data.poker.markers = [];
		data.poker.ages = [18, 77];
		data.poker.exists = false;
		$('#menu ul').append('<li class="poker"><img src="Icons/poker.png" /> <span>Poker</span></li>');
	});
	$.getJSON("./data/carte-des-pharmacies-de-paris.geojson", function(pharmacie) {
		data.pharmacie = pharmacie;
		data.pharmacie.markers = [];
		data.pharmacie.ages = [25, 49];
		data.pharmacie.exists = false;
		$('#menu ul').append('<li class="pharmacie"><img src="Icons/pharmacie.png" /> <span>Pharmacies</span></li>');
	});
		$.getJSON("./data/les_etablissements_hospitaliers_franciliens.geojson", function(hopital) {
		data.hopital = hopital;
		data.hopital.markers = [];
		data.hopital.ages = [10, 77];
		data.hopital.exists = false;
		$('#menu ul').append('<li class="hopital"><img src="Icons/hopital.png" /> <span>Hopitaux</span></li>');
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
			map._layersMaxZoom=18;
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
				$('.leaflet-control-zoom.leaflet-bar.leaflet-control').show();
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

		function ageChange(){
			$('#menu ul li').hide();
			$.each(data, function( dataSet ){
				if (data[dataSet].exists) {
					data[dataSet].exists = false;
				};
			});
			age_user = (numbersToShow[$('#timeline').val()-1][0] + numbersToShow[$('#timeline').val()-1][1]) /2;
			$('#menu ul li').css({
				'background-color': getIconColor(),
				'color': getIconColor()
			});

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
		}

		$('#timeline').on('change', function(){
			ageChange();
		});

		$('#numbers span').on('click', function(){
			$('#timeline').val($(this).data('value'));
			ageChange();
		});

		$('#menu ul li').css({
			'background-color': getIconColor(),
			'color': getIconColor()
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