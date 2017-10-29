var stationsNoms = new Array();
var stationsFull;
var map;
var marker;
var tableStations;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: +45.49648, lng: -73.60737},
  zoom: 11
});

marker = new google.maps.Marker({map: map});
}



$.ajax({

	url: 'https://secure.bixi.com/data/stations.json',
	dataType: 'json',
	success: function(data){
	
	stationsFull = data;  // Pour l'onglet table complete des stations

    $(data.stations).each(function(index, value)
	{
		stationsNoms.push(value.s);
	})

	$("#autocomplete").autocomplete({
		source : stationsNoms,
		minLength: 2,

		select: function(event,ui) {
			$("#localisation").text(ui.item.label);

			var stationChoisie = stationsFull.stations.find(function(item){
				return item.s === ui.item.label;
			});

			var pos = new google.maps.LatLng(stationChoisie.la, stationChoisie.lo);
			map.panTo(pos);
			map.setZoom(15);

			marker.setPosition(pos);

			changeColorTag("#stationId",stationChoisie.id);
			changeColorTag("#estBloque",stationChoisie.b)
			changeColorTag("#velosRestants",stationChoisie.ba);
			changeColorTag("#bornesRestants",stationChoisie.da);
			changeColorTag("#estStationSuspendue",stationChoisie.su);
			changeColorTag("#velosHorsServices",stationChoisie.bx);
			changeColorTag("#estStationHorsService",stationChoisie.m)
			changeColorTag("#bornesHorsServices",stationChoisie.dx)

			}
	});	

	}
});

/*$("#autocomplete").autocomplete("widget").addClass("autocomplete-results");*/

function changeColorTag(elementToModify,newValue){
	if(typeof(newValue) === "boolean"){	
		if(newValue==false){
			$(elementToModify).text(" Non ");
			$(elementToModify).css("background-color", "ForestGreen");
		} else{
		$(elementToModify).text(" Oui ");
		$(elementToModify).css(" background-color ", "Red");		
		}
	}else{

		$(elementToModify).text(newValue);
		if(elementToModify == "#velosRestants" || elementToModify == "#bornesRestants"){
			if(newValue === 0) {
				$(elementToModify).css("background-color", "Red");
			}
			else if(newValue <= 4)  {
				$(elementToModify).css("background-color", "DarkOrange")
			}
			else {
				$(elementToModify).css("background-color", "ForestGreen");
			}
		} 

	}
}
/*
//
// NE FONCTIONNE PAS!!
//
$(document).ready(function() {	
    $('#TableStations').DataTable( {
		"processing": true,
		aaData : stationsFull,
		"columns": [
			{"data": "id"},
			{"data": "s"},
			{"data": "ba"},
			{"data": "da"},
			{"data": "b"},
			{"data": "su"}
		],
		"language": {
			"sProcessing":     "Traitement en cours...",
			"sSearch":         "Rechercher&nbsp;:",
			"sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
			"sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
			"sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
			"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
			"sInfoPostFix":    "",
			"sLoadingRecords": "Chargement en cours...",
			"sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
			"sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
			"oPaginate": {
				"sFirst":      "Premier",
				"sPrevious":   "Pr&eacute;c&eacute;dent",
				"sNext":       "Suivant",
				"sLast":       "Dernier"
			},
			"oAria": {
				"sSortAscending":  ": activer pour trier la colonne par ordre croissant",
				"sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
			}
		}
	} );
} );*/