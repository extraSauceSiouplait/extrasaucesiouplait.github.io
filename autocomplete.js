
  
  var response = "";
  
  $.ajax({
      type: "POST",
      url: "https://secure.bixi.com/data/stations.json",
      data: form_data,
      succes: function(response)
      {
        var json_obj = $.parseJSON(response);
          
        $( function() {
         function log( message ) {
           $( "<div>" ).text( message ).prependTo( "#log" );
           $( "#log" ).scrollTop( 0 );
         }

         $( "#stations" ).autocomplete({
           source: json_obj.stations,
           minLength: 2,
           select: function( event, ui ) {
             log( "Selected: " + ui.item.value + " aka " + ui.item.id );
           }
         });
       } );         
          
      }

  })
  
  
  
  