var datum;
var monattabelle;
var monatsanzeige;
var xmlhttp = new XMLHttpRequest();
var url = "veranstaltungen.json";
var Events = 0;
var suchTextFeld;
var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

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
    monatsanzeige.className = 'blink';
    maleZellen();

}

function onloadFunktion() {

    console.log("StartFunktion");
    ladeJSON();
    datum = new Date();
    monattabelle = document.getElementById("monate");
    monatsanzeige = document.getElementById("monatsanzeige");
    suchTextFeld = document.getElementById("q");
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
<<<<<<< HEAD
	var hilfsdatum = new Date(datum.getTime());
	hilfsdatum.setDate(0);
	var a = hilfsdatum.getDay();
	var hilf = 0;
	var hilf2 = 0;
	var MaxTage = getMaxTageimMonat(datum.getFullYear(), datum.getMonth());
	for (var i = 1; i < monattabelle.rows.length; i++) {
		for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
			var Zelle = monattabelle.rows.item(i).cells.item(j);
			Zelle.anzahlEvents = 0;
			Zelle.onmouseover = function() {
			
				if (this.anzahlEvents !== 0) {
					var Text = "Es gibt " + this.anzahlEvents + " an diesm Tag\n";
					
					for (var i = 0; i < this.anzahlEvents; i++) {
						Text += 'Event ' + (i + 1) + ' Wo? ' + this.eventss[i].ort + ' \n';
					}
					
			/*		alert(Text); */
			Tip(Text);
				}
			
			
			};
			
			Zelle.onmouseout = UnTip;
			if (hilf >= a && hilf2 < MaxTage) {
				hilf2++;
				Zelle.innerHTML = hilf2;
				Zelle.id = '#ohneEvent';
				Zelle.eventss = new Array();
			} else {
				Zelle.id = 'nichtimMonat';
				Zelle.innerHTML = "-";
			}
			hilf++;
		}
	}
	if (Events !== 0) {
		console.log("Geladen");
		for (var a = 0; a < Events.veranstaltungen.length; a++) {
			if (datum.getMonth() === Events.veranstaltungen[a].monat - 1) {
				for (var i = 1; i < monattabelle.rows.length; i++) {
					for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
						var Zelle = monattabelle.rows.item(i).cells.item(j);
						if (Zelle.innerHTML === Events.veranstaltungen[a].tag) {
							Zelle.id = 'mitEvent';
							Zelle.eventss[Zelle.anzahlEvents] = Events.veranstaltungen[a];
							Zelle.anzahlEvents++;

						}
					}
				}
			}
		}
	}
=======
    var hilfsdatum = new Date(datum.getTime());
    hilfsdatum.setDate(0);
    var a = hilfsdatum.getDay();
    var hilf = 0;
    var hilf2 = 0;
    var MaxTage = getMaxTageimMonat(datum.getFullYear(), datum.getMonth());
    for (var i = 1; i < monattabelle.rows.length; i++) {
        for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
            var Zelle = monattabelle.rows.item(i).cells.item(j);
            Zelle.anzahlEvents = 0;
            Zelle.onmouseover = function () {
                if (this.anzahlEvents !== 0) {
                    var Text = "Es gibt " + this.anzahlEvents + " an diesm Tag\n";
                    for (var i = 0; i < this.anzahlEvents; i++) {
                        Text += "Event " + (i + 1) + " Wo? " + this.eventss[i].ort + " \n";
                    }
                    Tip(Text);
                }
            };
            Zelle.onmouseout = function () {
                UnTip();
            };
            if (hilf >= a && hilf2 < MaxTage) {
                hilf2++;
                Zelle.innerHTML = hilf2;
                Zelle.id = '#ohneEvent';
                Zelle.eventss = new Array();
            } else {
                Zelle.id = 'nichtimMonat';
                Zelle.innerHTML = "-";
            }
            hilf++;
        }
    }
    if (Events !== 0) {
        console.log("Geladen");
        for (var a = 0; a < Events.veranstaltungen.length; a++) {
            if (datum.getMonth() === parseInt(Events.veranstaltungen[a].monat) - 1 &&
                    datum.getFullYear() === parseInt(Events.veranstaltungen[a].jahr)) {
                for (var i = 1; i < monattabelle.rows.length; i++) {
                    for (var j = 0; j < monattabelle.rows.item(i).cells.length; j++) {
                        var Zelle = monattabelle.rows.item(i).cells.item(j);
                        if (Zelle.innerHTML === Events.veranstaltungen[a].tag) {
                            Zelle.id = 'mitEvent';
                            Zelle.eventss[Zelle.anzahlEvents] = Events.veranstaltungen[a];
                            Zelle.anzahlEvents++;

                        }
                    }
                }
            }
        }
    }
>>>>>>> e6b00527f000ffcafe5a4a580f3f1d37b94fa5e7

}

function unfade(element) {
    var op = 0.1;
    // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
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
    var timer = setInterval(function () {
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

    xmlhttp.onreadystatechange = function () {
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



function search() {
    var SuchText = suchTextFeld.value;
    if (SuchText)
        var dt = new Date(SuchText.replace(pattern, '$3-$2-$1'));
    datum = new Date(dt.getTime());
    neuMalennachDatumsaenderung();
}