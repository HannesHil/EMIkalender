/*
 * Autors:
 * 			Maximilian Kindt - Javascript Supervisor
 * 			Hannes Hilbert   - Javascript Supervisant
 */

var datum;
var monattabelle;
var monatsanzeige;
var xmlhttp = new XMLHttpRequest();
var url = "veranstaltungen.json";
var Events = 0;
var suchTextFeld;
var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
var VeranstaltungsTypen = new Array("Musik", "Komoedie", "Jugendveranstaltungen", "Messe", "Sport", "Oper");
var Filter = "all";
var ModulesFenster = document.getElementById("Test");

function datumsaenderungFeil(a) {
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
	neuMalennachDatumsaenderung();
}

function neuMalennachDatumsaenderung() {
	monatsanzeige.innerHTML = getMonthtoString(datum.getMonth()) + " " + datum.getFullYear();
	maleZellen();

}

function onloadFunktion() {

	console.log("StartFunktion");
	ladeJSON();

	datum = new Date();
	monattabelle = document.getElementById("monate");
	monatsanzeige = document.getElementById("monatsanzeige");
	suchTextFeld = document.getElementById("q");
	ModulesFenster = document.getElementById("ModularFenster");
	suchTextFeld.value = "";
	neuMalennachDatumsaenderung();

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
		month = "Dezember";
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
		if (Monat !== Datum.getMonth()) {
			return i - 1;
		}
	}
}

function maleZellen() {
	var hilfsdatum = new Date(datum.getTime());
	hilfsdatum.setDate(0);
	var a = hilfsdatum.getDay();
	var hilf = 0;
	var hilf2 = 0;
	var MaxTage = getMaxTageimMonat(datum.getFullYear(), datum.getMonth());
	var MaxTagevor = getMaxTageimMonat(datum.getFullYear(), (datum.getMonth() + 11) % 12);
	var hilf3 = MaxTagevor - a + 1;
	for (var i = 1; i < monattabelle.rows.length; i++) {
		for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
			var Zelle = monattabelle.rows.item(i).cells.item(j);
			Zelle.anzahlEvents = 0;
			Zelle.onmouseover = function() {
				if (this.anzahlEvents !== 0) {
					var s = "";
					if (this.anzahlEvents > 1) {
						s = "s";
					}
					var Text = "Es gibt " + this.anzahlEvents + " Event" + s + " an diesem Tag.\n";
					//
					Tip(Text);
				}
			};
			Zelle.onmouseout = function() {
				UnTip();
			};
			Zelle.onclick = function() {
				if (this.anzahlEvents !== 0) {
					onclick(this);
				}
			};
			if (hilf >= a && hilf2 < MaxTage) {
				hilf2++;
				Zelle.innerHTML = hilf2;
				Zelle.id = '#ohneEvent';
				Zelle.eventss = new Array();
			} else {
				Zelle.id = 'nichtimMonat';

				if (hilf3 > MaxTagevor) {
					hilf3 = 1;
				}
				Zelle.innerHTML = hilf3;
				hilf3++;

			}
			hilf++;
		}
	}
	if (Events !== 0) {
		console.log("Geladen");
		for (var a = 0; a < Events.veranstaltungen.length; a++) {
			if (datum.getMonth() === parseInt(Events.veranstaltungen[a].monat) - 1 && datum.getFullYear() === parseInt(Events.veranstaltungen[a].jahr)) {
				for (var i = 1; i < monattabelle.rows.length; i++) {
					for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
						var Zelle = monattabelle.rows.item(i).cells.item(j);
						if (Zelle.innerHTML === Events.veranstaltungen[a].tag && isGewollt(Events.veranstaltungen[a].art) && Zelle.id !== 'nichtimMonat') {
							Zelle.id = 'mitEvent';
							Zelle.eventss[Zelle.anzahlEvents] = Events.veranstaltungen[a];
							Zelle.anzahlEvents++;

						}
					}
				}
			}
		}
	}

}

function isGewollt(Art) {
	if (Filter === "all") {
		return true;
	} else {
		if (Art === Filter) {
			return true;
		} else {
			return false;
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
		}
		;
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;

	}, 20);
}

function ladeJSON() {

	console.log("LadeDatei");

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			Events = myArr;

			console.log("Fertig Geladen");

			maleZellen();
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function searchButton() {
	var SuchText = suchTextFeld.value;
	search(SuchText);
}

function search(SuchText) {
	if (gueltigesDatum(SuchText) && ersterBuchstabeZahl(SuchText)) {
		console.log("Hallo");
		Filter = "all";
		var dt = new Date(SuchText.replace(pattern, '$3-$2-$1'));
		datum = new Date(dt.getTime());
	} else {
		Filter = "all";
		if (contains(VeranstaltungsTypen, SuchText)) {
			Filter = SuchText;
		}
	}
	neuMalennachDatumsaenderung();
}

function ersterBuchstabeZahl(a) {
	var Zahlen = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
	var Buchstabe = a.substring(0, 1);
	console.log(Buchstabe);
	for (var i = 0; i < Zahlen.length; i++) {
		if (Zahlen[i] === parseInt(Buchstabe)) {
			return true;
		}
	}
	return false;
}

function gueltigesDatum(datum) {
	//(Schritt 1) Fehlerbehandlung
	if (!datum)
		return false;
	datum = datum.toString();

	//(Schritt 2) Aufspaltung des Datums
	datum = datum.split(".");
	if (datum.length != 3)
		return false;

	//(Schritt 3) Entfernung der fuehrenden Nullen und Anpassung des Monats

	datum[0] = parseInt(datum[0], 10);
	datum[1] = parseInt(datum[1], 10) - 1;

	//(Schritt 4) Behandlung Jahr nur zweistellig
	if (datum[2].length == 2)
		datum[2] = "20" + datum[2];

	//(Schritt 5) Erzeugung eines neuen Dateobjektes
	var kontrolldatum = new Date(datum[2], datum[1], datum[0]);

	//(Schritt 6) Vergleich, ob das eingegebene Datum gleich dem JS-Datum ist
	if (kontrolldatum.getDate() == datum[0] && kontrolldatum.getMonth() == datum[1] && kontrolldatum.getFullYear() == datum[2])
		return true;
	else
		return false;

}

function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;

}

function heute() {
	datum = new Date();
	neuMalennachDatumsaenderung();

}

function over() {

	ModulesFenster.style.visibility = 'visible';
}

function unover() {

	ModulesFenster.style.visibility = 'hidden';
}

function onclick(Zelle) {
	var html = "<b><h1>Veranstantungen am " + Zelle.eventss[0].tag + ". " + getMonthtoString(parseInt(Zelle.eventss[0].monat) - 1) + " " + Zelle.eventss[0].jahr + "</h1><br>";
	for (var i = 0; i < Zelle.anzahlEvents; i++) {
		html += "<h2>" + Zelle.eventss[i].name + "</h2><br>";
		html += "Ort: " + Zelle.eventss[i].ort + "<br>";
		html += "Zeit: " + Zelle.eventss[i].zeit + "<br>";
	}

	/* ModulesFenster.style.background = "url(source/" + Zelle.eventss[0].art + ".jpg)";*/

	ModulesFenster.innerHTML = html;
	over();
}