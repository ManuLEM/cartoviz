var map = L.map('map').setView([48.8567, 2.3508], 12);

var southWest = new L.latLng([48.80, 2.17], map.getMaxZoom());
var northEast = new L.latLng([48.90, 2.45], map.getMaxZoom());
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
var prev_layer = false;
var prev_feature = false;
var prev_color = false;
var data = {};
var layers = [];
var features = [];
var agesNumber = '';
var numbersToShow = [[7,10], [11,14], [15,17], [18,24], [25,34], [35,49], [50,64], [65,77]];

var DataIcon = L.Icon.extend({
    options: {
    	iconAnchor:   [10, 40],
        shadowUrl: './markers/marker-shadow.png',
        shadowAnchor: [5, 40],
        popupAnchor:  [8, -35]
    }
});

for (var i = 0; i < $('#numbers span').length; i++) {
	$('#numbers span').eq(i).css({
		left: ((($('#numbers').width() - 55) / 7) * i) + 10
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

var age_user = (numbersToShow[Math.round($('#timeline').val())-1][0] + numbersToShow[Math.round($('#timeline').val())-1][1]) /2;

$.when(
	$.getJSON("./data/recensement_des_equipements_sportifs_a_paris.geojson", function(multi_sport) {
		data.multi_sport = multi_sport;
		data.multi_sport.markers = [];
		data.multi_sport.ages = [7, 77];
		data.multi_sport.exists = false;
		data.multi_sport.filtered = false;
		for(var i = 0 in data.multi_sport.features){
			data.multi_sport.features[i].properties.titre = data.multi_sport.features[i].properties.insnom;
			data.multi_sport.features[i].properties.adresse = data.multi_sport.features[i].properties.insnovoie + ' ' + data.multi_sport.features[i].properties.inslibellevoie || '';
		}
		$('#menu ul').append('<li class="multi_sport" data-type="multi_sport" ><img src="Icons/sports.png" /> <span>Centre Sportif</span></li>');
	}),
	$.getJSON("./data/les_salles_de_cinemas_en_ile-de-france.geojson", function(cinemas) {
		data.cinemas = cinemas;
		data.cinemas.markers = [];
		data.cinemas.ages = [7, 77];
		data.cinemas.exists = false;
		data.cinemas.filtered = false;
		for(var i = 0 in data.cinemas.features){
			data.cinemas.features[i].properties.titre = data.cinemas.features[i].properties.enseigne;
			data.cinemas.features[i].properties.adresse = data.cinemas.features[i].properties.adrnumvoie || '';
		}
		$('#menu ul').append('<li class="cinemas" data-type="cinemas" ><img src="Icons/cinema.png" /> <span>Cinéma</span></li>');
	}),
	$.getJSON("./data/manege_et_jeux.geojson", function(maneges) {
		data.maneges = maneges;
		data.maneges.markers = [];
		data.maneges.ages = [7, 10];
		data.maneges.exists = false;
		data.maneges.filtered = false;
		for(var i = 0 in data.maneges.features){
			data.maneges.features[i].properties.titre = data.maneges.features[i].properties.Name;
		}
		$('#menu ul').append('<li class="maneges" data-type="maneges" ><img src="Icons/manege.png" /> <span>Manège</span></li>');
	}),
	$.getJSON("./data/festival-culture-bar-bars-2013.geojson", function(bars) {
		data.bars = bars;
		data.bars.markers = [];
		data.bars.ages = [18, 35];
		data.bars.exists = false;
		data.bars.filtered = false;
		for(var i = 0 in data.bars.features){
			data.bars.features[i].properties.titre = data.bars.features[i].properties.title;
			data.bars.features[i].properties.adresse = data.bars.features[i].properties.address || '';
		}
		$('#menu ul').append('<li class="bars" data-type="bars" ><img src="Icons/barsjeunes.png" /> <span>Bar</span></li>');
	}),
	$.getJSON("./data/poker.geojson", function(poker) {
		data.poker = poker;
		data.poker.markers = [];
		data.poker.ages = [18, 77];
		data.poker.exists = false;
		data.poker.filtered = false;
		for(var i = 0 in data.poker.features){
			data.poker.features[i].properties.titre = data.poker.features[i].properties.Name;
			data.poker.features[i].properties.adresse = data.poker.features[i].properties.Adresse;
		}
		$('#menu ul').append('<li class="poker" data-type="poker" ><img src="Icons/poker.png" /> <span>Poker</span></li>');
	}),
	$.getJSON("./data/carte-des-pharmacies-de-paris.geojson", function(pharmacie) {
		data.pharmacie = pharmacie;
		data.pharmacie.markers = [];
		data.pharmacie.ages = [25, 49];
		data.pharmacie.exists = false;
		data.pharmacie.filtered = false;
		for(var i = 0 in data.pharmacie.features){
			data.pharmacie.features[i].properties.titre = data.pharmacie.features[i].properties.rs;
			data.pharmacie.features[i].properties.adresse = data.pharmacie.features[i].properties.numvoie + ' ' + data.pharmacie.features[i].properties.typvoie + ' ' + data.pharmacie.features[i].properties.voie || '';
		}
		$('#menu ul').append('<li class="pharmacie" data-type="pharmacie" ><img src="Icons/pharmacie.png" /> <span>Pharmacies</span></li>');
	}),
	$.getJSON("./data/les_etablissements_hospitaliers_franciliens.geojson", function(hopital) {
		data.hopital = hopital;
		data.hopital.markers = [];
		data.hopital.ages = [50, 77];
		data.hopital.exists = false;
		data.hopital.filtered = false;
		
		for(var i = 0 in data.hopital.features){
			data.hopital.features[i].properties.titre = data.hopital.features[i].properties.categorie_de_l_etablissement;
			data.hopital.features[i].properties.adresse = data.hopital.features[i].properties.adresse_complete || '';
		}
		$('#menu ul').append('<li class="hopital" data-type="hopital" ><img src="Icons/hopital.png" /> <span>Hopitaux</span></li>');
	}),
	$.getJSON("./data/centres_commerciaux.geojson", function(centres_commerciaux) {
		data.centres_commerciaux = centres_commerciaux;
		data.centres_commerciaux.markers = [];
		data.centres_commerciaux.ages = [15, 77];
		data.centres_commerciaux.exists = false;
		data.centres_commerciaux.filtered = false;
		for(var i = 0 in data.centres_commerciaux.features){
			data.centres_commerciaux.features[i].properties.titre = data.centres_commerciaux.features[i].properties.Name;
			data.centres_commerciaux.features[i].properties.adresse = '';
		}
		$('#menu ul').append('<li class="centres_commerciaux" data-type="centres_commerciaux" ><img src="Icons/shopping.png" /> <span>Centres Commerciaux</span></li>');
	}),
	$.getJSON("./data/liste_des_marches_de_quartier_a_paris.geojson", function(marches) {
		data.marches = marches;
		data.marches.markers = [];
		data.marches.ages = [35, 77];
		data.marches.exists = false;
		data.marches.filtered = false;
		for(var i = 0 in data.marches.features){
			data.marches.features[i].properties.titre = data.marches.features[i].properties.marche;
			data.marches.features[i].properties.adresse = data.marches.features[i].properties.localisation || '';
		}
		$('#menu ul').append('<li class="marches" data-type="marches" ><img src="Icons/marches.png" /> <span>Marchés</span></li>');
	}),
	$.getJSON("./data/paris_-_liste_des_equipements_de_proximite_ecoles_piscines_jardins.geojson", function(piscine) {
		data.piscine = piscine;
		data.piscine.markers = [];
		data.piscine.ages = [18, 77];
		data.piscine.exists = false;
		data.piscine.filtered = false;
		
		for(var i = 0 in data.piscine.features){
			data.piscine.features[i].properties.titre = data.piscine.features[i].properties.designation_longue;
			data.piscine.features[i].properties.adresse = data.piscine.features[i].properties.ap_num + ' ' + data.piscine.features[i].properties.ap_voie + ' ' + data.piscine.features[i].properties.ap_cp || '';
		}
		$('#menu ul').append('<li class="piscine" data-type="piscine" ><img src="Icons/piscine.png" /> <span>Piscines</span></li>');
	}),
	$.getJSON("./data/liste_des_etablissements_publics_culture.geojson", function(culture) {
		data.culture = culture;
		data.culture.markers = [];
		data.culture.ages = [15, 77];
		data.culture.exists = false;
		data.culture.filtered = false;
		console.log(culture);
		for(var i = 0 in data.culture.features){
		data.culture.features[i].properties.titre = data.culture.features[i].properties.structure;
		data.culture.features[i].properties.adresse = '';
		}
		$('#menu ul').append('<li class="culture" data-type="culture" ><img src="Icons/culture.png" /> <span>Cultures</span></li>');
	})
).done(function(){

	$.each(data, function( dataSet ){
		total =+ data[dataSet].features.length;
	});

	$.getJSON("./data/arrondissements.geojson", function(collection) {
		$('#menu ul li:not(.controls)').hide();
		for (var i = 0; i < collection.features.length; i++) {
			for (var j = 0; j < collection.features.length; j++) {
				if ( (i+1) == parseInt(collection.features[j].properties.Name ) ) {
					features[i] = collection.features[j];
				};
			};
		};
		window.geojson = L.geoJson(collection, {
			onEachFeature: onEachFeature,
			style: {
		        color: 'white',
			    weight: 1,
			    opacity: 1,
			    fillOpacity: 0.9
		    }
		}).addTo(map);

		function clickFeature(e) {
			onClickFeature(e);
		}

		function onEachFeature(feature, layer) {
			onEachFeatureCustom(feature, layer);
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

		$('#menu ul li').on('click', function(){
			if ($(this).hasClass('controls')) {
				if ($(this).hasClass('clicked')) {
					$(this).find('img').attr('src', 'Icons/tout.png');
					$(this).removeClass('clicked');
					for (var i = 1; i < $('#menu ul li').length; i++) {
						if ($('#menu ul li').eq(i).is(":visible") ) {
							var type = $('#menu ul li').eq(i).data('type');
							data[type].filtered = false;
							$('#menu ul li').eq(i).removeClass('filtered');
							filterShow(type);
						};
					};
				}
				else{
					$(this).find('img').attr('src', 'Icons/pastout.png');
					$(this).addClass('clicked');
					for (var i = 1; i < $('#menu ul li').length; i++) {
						if ($('#menu ul li').eq(i).is(":visible") ) {
							var type = $('#menu ul li').eq(i).data('type');
							data[type].filtered = true;
							$('#menu ul li').eq(i).addClass('filtered');
							filterHide(type);
						};
					};
				}
			}
			else{
				var type = $(this).data('type');
				if (data[type].filtered) {
					data[type].filtered = false;
					$(this).removeClass('filtered');
					filterShow(type);
				}
				else{
					data[type].filtered = true;
					$(this).addClass('filtered');
					filterHide(type);
				}

				if ( $('#menu ul li.filtered:visible').length === ($('#menu ul li:visible').length - 1)) {
					$('#menu ul li.controls').find('img').attr('src', 'Icons/pastout.png');
					$('#menu ul li.controls').addClass('clicked');
				}
				else if ( $('#menu ul li.filtered').length === ($('#menu ul li:visible').length - 2)) {
					$('#menu ul li.controls').find('img').attr('src', 'Icons/tout.png');
					$('#menu ul li.controls').removeClass('clicked');
				};
			}
		});
		$('#regular_co').on('submit', function(e){
			e.preventDefault();
			localStorage.setItem('name', $('#regular_co_name').val());
			localStorage.setItem('age', $('#regular_co_age').val());
			age_user = $('#regular_co_age').val();

			$('.close').click();

			if (age_user >= 7 && age_user <= 10) {
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

			ageChange();
		});
	});
});