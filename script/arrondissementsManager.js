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
	var percents = {};
	var finalPercent = 0;
	var count = 0;
	$.each(feature.addedData, function (dataSet){
		if(data[dataSet] && data[dataSet].filtered == false){
			if (dataSet != 'arrondissement' && dataSet != 'elements' && dataSet != 'visible') {
				if ( data[dataSet].features.length < 10 && feature.addedData[dataSet] != 0 ) {
					percents[dataSet] = ((feature.addedData[dataSet] / data[dataSet].features.length)*100)-15;
				}
				else{
					percents[dataSet] = (feature.addedData[dataSet] / data[dataSet].features.length)*100;
				}
			};
		}
	});
	$.each(percents, function (type){
		finalPercent += percents[type];
		count ++;
	});
	finalPercent = finalPercent / count;

	if ( age_user >= 7 && age_user <= 10 ){
	    return finalPercent > 3.3  ? '#ba0e0e' :
	           finalPercent > 2.7     ? '#e91212' :
	           finalPercent > 1.8  ? '#ed4141' :
	           finalPercent > 1   ? '#f17070' :
	           finalPercent > 0.3  ? '#f6a0a0' :
	                      			  '#facfcf';
	}
	else if ( age_user >= 11 && age_user <= 14 ){
	    return finalPercent > 3.3 ? '#aa1368' :
	           finalPercent > 2.7     ? '#d51883' :
	           finalPercent > 1.8  ? '#dd469b' :
	           finalPercent > 1     ? '#e574b4' :
	           finalPercent > 0.3 ? '#eea2cd' :
	                      			  '#f6d0e6';
	}
	else if ( age_user >= 15 && age_user <= 17 ){
	    return finalPercent > 3.3 ? '#c6500c' :
	           finalPercent > 2.7     ? '#f8650f' :
	           finalPercent > 1.8 ?'#f9833e' :
	           finalPercent > 1     ? '#faa26f' :
	           finalPercent > 0.3 ? '#fcc19f' :
	                      			  '#fde0cf';
	}
	else if ( age_user >= 18 && age_user <= 24 ){
	    return finalPercent > 3.3 ? '#018fa2' :
	           finalPercent > 2.7     ? '#02b3cb' :
	           finalPercent > 1.8 ? '#34c2d5' :
	           finalPercent > 1     ? '#67d1df' :
	           finalPercent > 0.3 ? '#99e0ea' :
	                      			  '#cceff4';
	}
	else if ( age_user >= 25 && age_user <= 34 ){
	    return finalPercent > 3.3 ? '#83019d' :
	           finalPercent > 2.7     ? '#a402c5' :
	           finalPercent > 1.8 ? '#b634d0' :
	           finalPercent > 1     ? '#c867dc' :
	           finalPercent > 0.3 ? '#da99e7' :
	                      			  '#ecccf3';
	}
	else if ( age_user >= 35 && age_user <= 49 ){
	    return finalPercent > 3.3 ? '#b17c02' :
	           finalPercent > 2.7     ? '#de9b03' :
	           finalPercent > 1.8 ? '#e4af35' :
	           finalPercent > 1     ? '#ebc367' :
	           finalPercent > 0.3 ? '#f1d79a' :
	                      			  '#f8ebcc';
	}
	else if ( age_user >= 50 && age_user <= 64 ){
	    return finalPercent > 3.3 ? '#297c04' :
	           finalPercent > 2.7     ? '#349c06' :
	           finalPercent > 1.8  ? '#5caf37' :
	           finalPercent > 1     ? '#85c369' :
	           finalPercent > 0.3 ? '#add79b' :
	                      			  '#d6ebcd';
	}
	else if ( age_user >= 65 && age_user <= 77 ){
	    return finalPercent > 3.3 ? '#9b4f04' :
	           finalPercent > 2.7     ? '#c26305' :
	           finalPercent > 1.8 ? '#ce8236' :
	           finalPercent > 1     ? '#daa169' :
	           finalPercent > 0.3 ? '#e6c09b' :
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
		prev_layer = layer;
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
	featureNumber = parseInt(feature.properties.Name) - 1;
	$.each(data, function( dataSet ){
		parArrondissement[featureNumber][dataSet] = 0;
		if (data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user) {
			for( var i = 0 in data[dataSet].features){
				if ( data[dataSet].features[i].geometry && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layer.feature.geometry.coordinates[0][0]) ){	
					parArrondissement[featureNumber].elements ++;
					data[dataSet].exists = true;
					parArrondissement[featureNumber][dataSet] ++;
				}
			}
		}
	});

	layers[featureNumber] = layer;

	feature.addedData = parArrondissement[featureNumber];

	layer.setStyle({
		fillColor: getColor(feature)
	});
}