		

	var datum;
	var monattabelle;
	var monatsanzeige;



	function weiter(a) {
		console.log("Test");
		if(a === 0){
			var a = datum.getMonth();			
			if(a === 0){
				datum.setFullYear(datum.getFullYear() - 1);
				datum.setMonth(11);
			}else{
				datum.setMonth(a-1);
			}			
		}else{
			var a = datum.getMonth();			
			if(a === 11){
				datum.setFullYear(datum.getFullYear() + 1);
				datum.setMonth(0);
			}else{
				datum.setMonth(a + 1);
			}			
		}
		New();				
	}


	function New(){
		monatsanzeige.innerHTML = (datum.getMonth()+1) +" "+ datum.getFullYear();	
		
	}

	function start(){
		datum = new Date();
		monattabelle = document.getElementById("monate");
		monatsanzeige = document.getElementById("monatsanzeige");		
		New();
	}



