/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var stations;
var stationsFull;
/*
$(document).ready(function() {
    $.ajax({
        url: "https://secure.bixi.com/data/stations.json",
        dataType: "json",
        type: "POST",
        success: function(data) {
        response($.map(data.stations, function(item) {
            return {
                label: item.s,
                value: item.id
            };
        }));
        }
        }),
    );
});
*/
$.ajax({
	url: 'https://secure.bixi.com/data/stations.json',
	dataType: 'json',
	success: function(data){
        stationsFull = data;
		stationsNoms = $.map(data.stations, function(item){ return item.s; });
	}
});

$("autocomplete").autocomplete({
    source: function(request, reponse){
        reponse($.ui.autocomplete.filter(stations , $('#autocomplete').val()));
    },
    minLenght: 2,

    select: function(event, ui) {
        $(".intersectionRues .nomStation").text(ui.item.label);
        $.ajax({
            url: 'https://secure.bixi.com/data/stations.json',
            dataType: 'json',
            success: function(data){
                var stations = data.stations.find(function(item){
                    return item.s;
                }); 
            }
        })
    }
});

$("#autocomplete").autocomplete("widget").addClass("autocomplete-results");