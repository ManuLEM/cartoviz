function ageChange () {
	age_user = (numbersToShow[Math.round($('#timeline').val())-1][0] + numbersToShow[Math.round($('#timeline').val())-1][1]) /2;
	
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
	$('#menu ul li').css({
		'background-color': getIconColor(),
		'color': getIconColor()
	});

	for( var j = 0 in layers){
		parArrondissement[j].elements = 0;
		$.each(data, function( dataSet ){
			parArrondissement[j][dataSet] = 0;
			if (data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user) {
				if(data[dataSet].filtered == false){
					parArrondissement[j][dataSet] = 0;
					for( var i = 0 in data[dataSet].features){
						if ( data[dataSet].features[i].geometry && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layers[j].feature.geometry.coordinates[0][0]) ){	
							parArrondissement[j].elements ++;
							data[dataSet].exists = true;
							parArrondissement[j][dataSet] ++;
						}
					}
				}
			}
		});
		features[j].addedData = parArrondissement[j];

		layers[j].setStyle({
			fillColor: getColor(features[j])
		});
		$.each(data, function( dataSet ){
			if (data[dataSet].exists) {
				$('#menu ul li.'+dataSet).show();
			};
		});
	}
}

function filterHide (type){
	if (prev_feature) {
		for( var i = 0 in data[type].markers){
        	if (data[type].filtered) {
	            map.removeLayer(data[type].markers[i]);
        	}
        }
    }

	for( var j = 0 in layers){
		if (!parArrondissement[j].visible) {
			parArrondissement[j].elements =- parArrondissement[j][type];
			parArrondissement[j][type] = 0;
			
			features[j].addedData = parArrondissement[j];

			layers[j].setStyle({
				fillColor: getColor(features[j])
			});
		}
	}
}

function filterShow (type){
	if (prev_feature) {
		for( var i = 0 in data[type].features ){
			if ( data[type].features[i].geometry && pointIsInPoly( data[type].features[i].geometry.coordinates, prev_layer.feature.geometry.coordinates[0][0]) && data[type].filtered == false ){
			    data[type].markers[ i ] = L.marker([data[type].features[i].geometry.coordinates[1], data[type].features[i].geometry.coordinates[0]], {icon: getIcon(type)}).bindPopup(data[type].features[i].properties.titre+'<br>'+data[type].features[i].properties.adresse+'<br><button class="event">Créer un évènement facebook</button>');
			    map.addLayer(data[type].markers[ i ]);
			};
		}
    }

	for( var j = 0 in layers){
		if (!parArrondissement[j].visible) {
			parArrondissement[j][type] = 0;
			parArrondissement[j].elements = 0;
			if (data[type].ages[0] <= age_user && data[type].ages[1] >= age_user) {
				if(data[type].filtered == false){
					parArrondissement[j][type] = 0;
					for( var i = 0 in data[type].features){
						if ( data[type].features[i].geometry && pointIsInPoly( data[type].features[i].geometry.coordinates, layers[j].feature.geometry.coordinates[0][0]) ){	
							parArrondissement[j].elements ++;
							parArrondissement[j][type] ++;
						}
					}
				}
			};
			features[j].addedData = parArrondissement[j];

			layers[j].setStyle({
				fillColor: getColor(features[j])
			});
		}
	}
}