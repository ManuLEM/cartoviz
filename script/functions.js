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
	    return '#c26305';
	}
}

function getColor(feature) {
	if ( age_user >= 7 && age_user <= 10 ){
	    return feature.addedData.elements > (total*0.5)  ? '#ba0e0e' :
	           feature.addedData.elements > (total*0.4)   ? '#e91212' :
	           feature.addedData.elements > (total*0.3)   ? '#ed4141' :
	           feature.addedData.elements > (total*0.2)   ? '#f17070' :
	           feature.addedData.elements > (total*0.1)   ? '#f6a0a0' :
	                      						   '#facfcf';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return feature.addedData.elements > (total*0.5)  ? '#aa1368' :
	           feature.addedData.elements > (total*0.4)   ? '#d51883' :
	           feature.addedData.elements > (total*0.3)   ? '#dd469b' :
	           feature.addedData.elements > (total*0.2)   ? '#e574b4' :
	           feature.addedData.elements > (total*0.1)   ? '#eea2cd' :
	                      						   '#f6d0e6';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return feature.addedData.elements > (total*0.5)  ? '#c6500c' :
	           feature.addedData.elements > (total*0.4)   ? '#f8650f' :
	           feature.addedData.elements > (total*0.3)   ? '#f9833e' :
	           feature.addedData.elements > (total*0.2)   ? '#faa26f' :
	           feature.addedData.elements > (total*0.1)   ? '#fcc19f' :
	                      						   '#fde0cf';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return feature.addedData.elements > (total*0.5)  ? '#018fa2' :
	           feature.addedData.elements > (total*0.4)   ? '#02b3cb' :
	           feature.addedData.elements > (total*0.3)   ? '#34c2d5' :
	           feature.addedData.elements > (total*0.2)   ? '#67d1df' :
	           feature.addedData.elements > (total*0.1)   ? '#99e0ea' :
	                      						   '#cceff4';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return feature.addedData.elements > (total*0.5)  ? '#83019d' :
	           feature.addedData.elements > (total*0.4)   ? '#a402c5' :
	           feature.addedData.elements > (total*0.3)   ? '#b634d0' :
	           feature.addedData.elements > (total*0.2)   ? '#c867dc' :
	           feature.addedData.elements > (total*0.1)   ? '#da99e7' :
	                      						   '#ecccf3';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return feature.addedData.elements > (total*0.5)  ? '#b17c02' :
	           feature.addedData.elements > (total*0.4)   ? '#de9b03' :
	           feature.addedData.elements > (total*0.3)   ? '#e4af35' :
	           feature.addedData.elements > (total*0.2)   ? '#ebc367' :
	           feature.addedData.elements > (total*0.1)   ? '#f1d79a' :
	                      						   '#f8ebcc';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return feature.addedData.elements > (total*0.5)  ? '#297c04' :
	           feature.addedData.elements > (total*0.4)   ? '#349c06' :
	           feature.addedData.elements > (total*0.3)   ? '#5caf37' :
	           feature.addedData.elements > (total*0.2)   ? '#85c369' :
	           feature.addedData.elements > (total*0.1)   ? '#add79b' :
	                      						   '#d6ebcd';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return feature.addedData.elements > (total*0.5)  ? '#9b4f04' :
	           feature.addedData.elements > (total*0.4)   ? '#c26305' :
	           feature.addedData.elements > (total*0.3)   ? '#ce8236' :
	           feature.addedData.elements > (total*0.2)   ? '#daa169' :
	           feature.addedData.elements > (total*0.1)   ? '#e6c09b' :
	                      						   '#f2dfcd';
	}
}

function getIcon(data){
	if ( age_user >= 7 && age_user <= 10 ){
	    var color = 'red';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    var color = 'pink';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    var color = 'orange';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    var color = 'blue';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    var color = 'purple';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    var color = 'yellow';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    var color = 'green';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    var color = 'brown';
	}

	window[data + 'Icon'] = new DataIcon({iconUrl: './markers/marker_'+ data + '_' + color +'.png'});
	return window[data + 'Icon'];
}

function removeMarkers(){
	$.each(data, function( dataSet ){
		for( var i = 0 in data[dataSet].markers){
			map.removeLayer(data[dataSet].markers[i]);
		}
	});
}

function get_data(layer){
	var element_id = 0;
	setTimeout(function(){
		$.each(data, function( dataSet ){
			if (data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user) {
				for( var i = 0 in data[dataSet].features ){
					if ( data[dataSet].features[i].geometry && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layer.feature.geometry.coordinates[0][0]) ){
						data[dataSet].markers[ element_id ] = L.marker([data[dataSet].features[i].geometry.coordinates[1], data[dataSet].features[i].geometry.coordinates[0]], {icon: getIcon(dataSet)}).bindPopup(data[dataSet].features[i].properties.titre+'<br>'+data[dataSet].features[i].properties.adresse+'<br><button class="event">Créer un évènement facebook</button>');
						map.addLayer(data[dataSet].markers[ element_id ]);
						element_id ++;
					};
				};
			}
		});

	}, 300);
}

function onClickFeature(e){
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

function onEachFeatureCustom(feature, layer){
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
}

function ageChange () {
	
	prev_feature = false;
	prev_color = false;
	for(var z = 0 in parArrondissement){
		parArrondissement[z].visible = false;
	}
	
	removeMarkers();
	$('#menu ul li:not(.controls)').hide();
	$.each(data, function( dataSet ){
		if (data[dataSet].exists) {
			data[dataSet].exists = false;
		};
	});
	age_user = (numbersToShow[Math.round($('#timeline').val())-1][0] + numbersToShow[(Math.round($('#timeline').val())-1][1]) /2;
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