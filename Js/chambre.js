/* Simule les variations de temp�ratures dans une pi�ce
 * @auteur: francois.lemieux@polymtl.ca 2010-07-26
*/
var facteurChauffage      = 0.01;  // Echange calorifique avec le chauffage
var facteurIsolation      = 0.01;  // Echange calorifique avec l'ext�rieur
var temperatureChauffage  = 70;    // temperature des caloriferes
var temperatureExterieure = 0;     // temperature exterieure
var temperatureInterieure = 10;    // temperature interieure par d�faut
var chauffage             = false; // le chauffage n'est pas actif par d�faut
var temperatureThermostat = 20;       // le chauffage demarre a  moins de 20C par defaut

var thermometreMax        =50;      // Temperature maximale affichee par le thermometre
var thermometreMin        =-50;     // Temp�rature minimale affichee par le thermometre
var intervalleTemps       =1000;   // intervalle en milisecondes de lecture de la temp�rature
var tailleThermometre     =300;    // Taille du thermometre en pixels
var positionThermometre   =50;     // Position du thermometre par rapport au haut de la page

/*Extrait la temp�rature reglee par le thermostatr */
function getTemperatureThermostat(){
  return document.getElementById("tdValeurThermostat").innerHTML;
}



/* Definit les Echanges calorifiques selon les valeurs
 * de la tempperature exterieure, de l'isolation,
 * de la temperature interieure, de la temperature fixee
 * par le thermostat et par l'efficacite du systeme
 * de chauffage.
 * Un "ticTac" correspond a  un echange calorifique
 */
function ticTac() {
  temperatureInterieure += ((temperatureExterieure - temperatureInterieure) * facteurIsolation);

  if (chauffage === true) {
    temperatureInterieure += ((temperatureChauffage - temperatureInterieure) * facteurChauffage);

    if (temperatureInterieure > getTemperatureThermostat()) {
      chauffage=false;
    }
  } else if (temperatureInterieure < getTemperatureThermostat()) {
    chauffage=true;
  }
}
