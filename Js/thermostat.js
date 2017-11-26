/* Extrait les valeurs produites dans la page Web et par le simulateur
 * et declanche l'affichage des valeurs dans la page
*/


/*Code jquery qui affiche un glisseur dans le conteneur ayant
 *l'identifiant #thermostat, qui initalise sa position et ses valeurs
 *par defaut et qui affiche la valeur selectionnee dans un conteneur
 *ayant l'identifiant #valeurThermostat
 *
 *Pour d�marrer le chauffage, il faut cliquer le curseur de d�filement
 */
/* global chauffage, temperatureInterieure, temperatureThermostat, temperatureExterieure, tailleThermometre, positionThermometre */

/*********************Ne pas modifier***********************/
 $(document).ready(function() {
  $("#thermostat").slider(
  {
    orientation: 'vertical',
    max: 40 ,
    value:temperatureThermostat,
    min: -10 ,
    step: 1
  })
  
  .slider("pips" , {
    
    rest: "label",
    step: 10
    
   })

   .slider("float");

  $("#thermostat").slider({
    change: function(event, ui) {
      $("#tdValeurThermostat").text( ui.value );
    }
  });
});
/*********************Ne pas modifier***********************/

//
// CLASSE DU PATRON OBSERVÉ-OBSERVATEUR
//
var ObservableChambre = {
    observers: []
  , addObserver: function(observer) {
      this.observers.push(observer);
    }
  , removeObserver: function(observer) {
      var index = this.observers.indexOf(observer);

      if (~index) {
        this.observers.splice(index, 1);
      }
    }
  
  , updateModel: function() {
      
    ticTac();
    $("#tempExterieure").text(temperatureExterieure);
    $("#tempInterieure").text(temperatureInterieure);
    this.notifyObservers();
      
    }  
    
  , notifyObservers: function() {
      for (var i = this.observers.length - 1; i >= 0; i--) {
        this.observers[i].update(chauffage, temperatureInterieure);
      };
    }
  };

var Observateur = class Observateur {
    update() {}     
};

/* Nouvel Observateur
 * Thermomètre
 */
var thermometre = new Observateur;

thermometre.update = function(isChauffage, temperatureActuelle) {
	var temperatureAfficher = Math.floor(temperatureActuelle);	
    $("#valeurThermomètre").text(temperatureAfficher);
    $("#jaugeThermometre").css("height", String(tailleThermometre)).css("top", String(positionThermometre));  
};


/* Nouvel observateur
 * Indique si le chauffage est actif ou inactif
 */
var indicateurChauffage = new Observateur;

indicateurChauffage.update = function(isChauffage, temperatureActuelle) {  
    if(isChauffage)
        $("#chauffageActif").text("Actif").css("background-color","red");
    else
        $("#chauffageActif").text("Inactif").css("background-color", "white");  
};

/* Ajout des observateurs */
ObservableChambre.addObserver(thermometre);
ObservableChambre.addObserver(indicateurChauffage);




$(function(){ 
    setInterval(function(){
        ObservableChambre.updateModel()
        ;} , 1000);   
 });




