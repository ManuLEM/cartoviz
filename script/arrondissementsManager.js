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
	    return feature.addedData.elements > 100  ? '#9b4f04' :
	           feature.addedData.elements > 75   ? '#c26305' :
	           feature.addedData.elements > 50   ? '#ce8236' :
	           feature.addedData.elements > 30   ? '#daa169' :
	           feature.addedData.elements > 15   ? '#e6c09b' :
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