/**
 * @author xxxMaximilianxxx
 */


 
	
 	var objekte = new Array(); 				//neues Array
	
	var x = document.getElementById("monat");		//x wird ausgelesen
	var y = document.getElementById("wochen");		//y wird ausgelesen
	var z = document.getElementById("uebersicht");  	//z wird ausgelesen
	var iFramE = document.getElementById("ViewPane");		//variable f�r den IFrame

		objekte[0] = x;					// x in array
		objekte[1] = y;					// y in array
		objekte[2] = z;					// z in array
	
function activateSelektor(a) {					//die funktion nimmt einen Parameter a	
	for	(i = 0; i < objekte.length; i++) {		// eine schleife durchl�uft das Array objekt
		if(objekte[i].id == a.id){			// abfrage ob die id des objektes == id array[i]
		objekte[i].className = 'selektor_choosen';	//wenn die abfrage = true dann �ndere die Klasse
		var htmldatei = '' + a.id + '.html';		//erstellen des HTml-Datei-Namens
		iFramE.src  = htmldatei;				// �ndern des iframes fenster
	
		}else{
		objekte[i].className = 'selektor_unchoosen';	//wenn nicht ausgew�hlt dann set unchoosen
		}	
	}	
}

function sickeFaerbung(a){					//funktionskack

	if(a.className != 'selektor_choosen')			//wenn nicht ausgew�hlt dann set hoover
	a.className = 'selektor_hoover';	
}

function sickeEntfaerbung (a) {
	if(a.className == 'selektor_hoover')			// wenn gehoovert dann set unchoosen
	a.className = 'selektor_unchoosen';  
}






