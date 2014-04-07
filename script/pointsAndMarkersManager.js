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
            for( var i = 0 in data[dataSet].features ){
                if ( data[dataSet].features[i].geometry && data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layer.feature.geometry.coordinates[0][0]) ){
                    data[dataSet].markers[ element_id ] = L.marker([data[dataSet].features[i].geometry.coordinates[1], data[dataSet].features[i].geometry.coordinates[0]], {icon: getIcon(dataSet)}).bindPopup(data[dataSet].features[i].properties.titre+'<br>'+data[dataSet].features[i].properties.adresse+'<br><button class="event">Créer un évènement facebook</button>');
                    map.addLayer(data[dataSet].markers[ element_id ]);
                    element_id ++;
                };
            };
        });

    }, 300);
}