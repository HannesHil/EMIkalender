var datum;
var monattabelle;
var monatsanzeige;
var xmlhttp = new XMLHttpRequest();
var url = "veranstaltungen.json";

function weiter(a) {
	console.log(datum);
	if (a === 0) {
		var a = datum.getMonth();
		if (a === 0) {
			datum.setFullYear(datum.getFullYear() - 1);
			datum.setMonth(11);
		} else {
			datum.setMonth(a - 1);
		}

	} else {
		var a = datum.getMonth();
		if (a === 11) {
			datum.setFullYear(datum.getFullYear() + 1);
			datum.setMonth(0);
		} else {
			datum.setMonth(a + 1);
		}
	}
	datum.setDate(1);
	console.log(datum);
	New();
}

function New() {
	console.log("Test2");

	monatsanzeige.innerHTML = getMonthtoString(datum.getMonth()) + " " + datum.getFullYear();
	maleZelle();

}

function start() {
	//ladeJSON(); 
	console.log("Bild");
	datum = new Date();
	monattabelle = document.getElementById("monate");
	monatsanzeige = document.getElementById("monatsanzeige");
	New();
	
}

function getDayToSting(a) {
	var day;
	switch (a) {

	case 0:
		day = "Sonntag";
		break;
	case 1:
		day = "Montag";
		break;
	case 2:
		day = "Dienstag";
		break;
	case 3:
		day = "Mittwoch";
		break;
	case 4:
		day = "Donnerstag";
		break;
	case 5:
		day = "Freitag";
		break;
	case 6:
		day = "Samstag";
		break;
	}
	return day;
}

function getMonthtoString(a) {
	var month;
	switch (a) {
	case 0:
		month = "Januar";
		break;
	case 1:
		month = "Februar";
		break;
	case 2:
		month = "M&auml;rz";
		break;
	case 3:
		month = "April";
		break;
	case 4:
		month = "Mai";
		break;
	case 5:
		month = "Juni";
		break;
	case 6:
		month = "Juli";
		break;
	case 7:
		month = "August";
		break;
	case 8:
		month = "September";
		break;
	case 9:
		month = "Oktober";
		break;
	case 10:
		month = "November";
		break;
	case 11:
		month = "Dezember"
		break;
	}
	return month;
}

function getMaxTageimMonat(Jahr, Monat) {
	var Datum = new Date();
	Datum.setDate(1);
	Datum.setFullYear(Jahr);
	Datum.setMonth(Monat);
	for (var i = 25; i < 40; i++) {
		Datum.setDate(i);
		if (Monat != Datum.getMonth()) {
			return i - 1;
		}
	}
}

function maleZelle() {
	var hilfsdatum = new Date(datum.getTime());
	hilfsdatum.setDate(0);
	var a = hilfsdatum.getDay();
	var hilf = 0;
	var hilf2 = 0;
	var MaxTage = getMaxTageimMonat(datum.getFullYear(), datum.getMonth());
	for (var i = 1; i < monattabelle.rows.length; i++) {
		for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
			var Zelle = monattabelle.rows.item(i).cells.item(j);
			Zelle.innerHTML = "2";
			if (hilf >= a && hilf2 < MaxTage) {
				hilf2++;
				Zelle.innerHTML = hilf2;
			} else {
				Zelle.innerHTML = "-";
			}
			hilf++;
		}
	}
}

function unfade(element) {
	var op = 0.1;
	// initial opacity
	element.style.display = 'block';
	var timer = setInterval(function() {
		if (op >= 1) {
			clearInterval(timer);
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op += op * 0.1;

	}, 10);
}

function fade(element) {
	var op = element.style.opacity;
	element.style.display = 'block';
	var timer = setInterval(function() {
		if (op <= 0.1) {
			clearInterval(timer);
		};
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;

	}, 20);
}


function ladeJSON(){
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
      	console.log(myArr);      	

       	for (var i=0; i<myArr.veranstaltungen.length;i++){
         	console.log(myArr.veranstaltungen[i]);
         }
    };
};
xmlhttp.open("GET", url, true);
xmlhttp.send();}