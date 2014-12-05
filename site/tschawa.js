/**
 * @author Maximilian
 */
	var x = document.getElementById("monat");
	var y = document.getElementById("wochen");
	var z = document.getElementById("uebersicht");
    var xactive=true;
    var yactive=true;
    var zactive=true;
function activatedMonat() {
var x = document.getElementById("monat");
	var y = document.getElementById("wochen");
	var z = document.getElementById("uebersicht");
	
	x.style.backgroundColor = "#E9E9E9"; xactive = false;
	y.style.backgroundColor = "#FFFFFF"; yactive = true;
	z.style.backgroundColor = "#FFFFFF"; zactive = true;
}

function activatedWoche() {
var x = document.getElementById("monat");
	var y = document.getElementById("wochen");
	var z = document.getElementById("uebersicht");

	x.style.backgroundColor = "#FFFFFF"; xactive=true;
	y.style.backgroundColor = "#E9E9E9"; yactive=false;
	z.style.backgroundColor = "#FFFFFF"; zactive=true;
}
function activatedUebersicht(){
var x = document.getElementById("monat");
	var y = document.getElementById("wochen");
	var z = document.getElementById("uebersicht");

	x.style.backgroundColor = "#FFFFFF"; xactive=true;
	y.style.backgroundColor = "#FFFFFF"; yactive=true;
	z.style.backgroundColor = "#E9E9E9"; zactive=false;
}

function sickeFaerbung(a){
	
	a.style.backgroundColor="E9E9E9";
}
function sickeEntfaerbungx (a) {
  if (xactive)
  a.style.backgroundColor="#FFFFFF";
  
}
function sickeEntfaerbungy (a) {
  if (yactive)
  a.style.backgroundColor="#FFFFFF";
  
}
function sickeEntfaerbungz (a) {
  if (zactive)
  a.style.backgroundColor="#FFFFFF";
  
}
