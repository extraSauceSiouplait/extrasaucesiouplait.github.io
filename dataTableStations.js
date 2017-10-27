/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $('#tableStations').DataTable( 
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