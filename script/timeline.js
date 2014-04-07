function onAgeChange () {
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