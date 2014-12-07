/**
 * @author xxxMaximilianxxx
 */
 
 
	
 var objekte = new Array();
	var x = document.getElementById("monat");
	var y = document.getElementById("wochen");	
	var z = document.getElementById("uebersicht");  
	var xxx = document.getElementById("ViewPane");

		objekte[0] = x;
		objekte[1] = y;
		objekte[2] = z;
	
function activateSelektor(a) {	
	for	(i = 0; i < objekte.length; i++) {
		if(objekte[i].id == a.id){
		objekte[i].className = 'selektor_choosen';
		var htmldatei = '' + a.id + '.html';
		xxx.src  = htmldatei;
	
		}else{
		objekte[i].className = 'selektor_unchoosen';
		}	
	}	
}

function sickeFaerbung(a){

	if(a.className != 'selektor_choosen')
	a.className = 'selektor_hoover';	
}

function sickeEntfaerbung (a) {
	if(a.className == 'selektor_hoover')
	a.className = 'selektor_unchoosen';  
}

