function ageChange () {
	age_user = (numbersToShow[Math.round($('#timeline').val())-1][0] + numbersToShow[Math.round($('#timeline').val())-1][1]) /2;
	
	total = 0;
	$.each(data, function( dataSet ){
		if (data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user) {
			total += data[dataSet].features.length;
		};
	});

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
		$.each(data, function( dataSet ){
			if (data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user) {
				parArrondissement[j][dataSet] = 0;
				for( var i = 0 in data[dataSet].features){
					if ( data[dataSet].features[i].geometry && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layers[j].feature.geometry.coordinates[0][0]) ){	
						parArrondissement[j].elements ++;
						data[dataSet].exists = true;
						parArrondissement[j][dataSet] ++;
					}
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