$(document).ready(function() {
	function connectAndChange(){
		FB.api('/me', function(response) {
			connected = true;
			var today = new Date();
			var date = new Date(response.birthday);
			age_user = Math.floor((today - date)/ 86400000 / 365);
			if (age_user >= 7 && age_user <= 10) {
				$('#timeline').val(1);
			}
			else if (age_user >= 7 && age_user <= 10) {
				$('#timeline').val(1);
			}
			else if (age_user >= 11 && age_user <= 14) {
				$('#timeline').val(2);
			}
			else if (age_user >= 15 && age_user <= 17) {
				$('#timeline').val(3);
			}
			else if (age_user >= 18 && age_user <= 24) {
				$('#timeline').val(4);
			}
			else if (age_user >= 25 && age_user <= 34) {
				$('#timeline').val(5);
			}
			else if (age_user >= 35 && age_user <= 49) {
				$('#timeline').val(6);
			}
			else if (age_user >= 50 && age_user <= 64) {
				$('#timeline').val(7);
			}
			else if (age_user >= 65 && age_user <= 77) {
				$('#timeline').val(8);
			}

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

			for( var j = 0 in parArrondissement){
				parArrondissement[j].elements = 0;
				$.each(data, function( dataSet ){
					for( var i = 0 in data[dataSet].features){
						if ( data[dataSet].features[i].geometry && data[dataSet].ages[0] <= age_user && data[dataSet].ages[1] >= age_user && pointIsInPoly( data[dataSet].features[i].geometry.coordinates, layers[j].feature.geometry.coordinates[0][0]) ){	
							parArrondissement[j].elements ++;
							data[dataSet].exists = true;
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
		});
	}
	var connected = false;
	$.getScript('//connect.facebook.net/fr_FR/all.js', function(){
		FB.init({
			appId: '678345398894154',
		});
	}).done(function(){		
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				connectAndChange();
			}
			else if (response.status === 'not_authorized') {
				console.log('connected but not authorized');
			}
			else {
				console.log('notconnected');
			}
		});
	});
	$('#profile_link').on('click', function(e){
			e.preventDefault();
		if (!connected) {
			$('#overlay').animate({
				opacity: 1,
				'z-index': 1002
			}, 300);
		}
	});
	$('#facebook').on('click', function() {
		FB.login(function(response) {
			if (response.status === 'connected') {
				connectAndChange();
			}
			else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'user_birthday, create_event'});
	});
	$('.close').on('click', function(){
		$('#overlay').animate({
			opacity: 0,
			'z-index': -1
		}, 300);
	});
});