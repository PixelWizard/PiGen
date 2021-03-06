//Globale Variablen definieren
var pi = "";
var counter = 0;
var actualPi = "";
var interval;

//Cache auf Variable Pi �berpr�fen und wenn nicht existiert in Cache laden 
if (localStorage.getItem('save_pi') == undefined){
		//Ajax-Request machen
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code f�r IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code f�r IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200) //Wenn alles OK Pi in LocalStorage laden und der Variable Pi zuweisen
			{
				var str_pi = xmlhttp.responseText;
				str_pi = str_pi.replace("\"", ""); //Regex, jojo --> mol en sinvolli Aaw�ndig f�r das ;)
				localStorage.setItem('save_pi', str_pi);
				pi = str_pi;                
			}
		  }
		xmlhttp.open("GET","pi.txt",true);
		xmlhttp.send();
}else{
	pi = localStorage.getItem('save_pi'); //Wenn Pi schon im LocalStorage ist, die Zahl laden und der Variable zuweisen
}
//Erledigt einige Dinge, nachdem die Seite geladen wurde
window.onload = function(){
	setting_changeFontsize();
}

//�berpr�ft ob in einem Eingabefeld Enter gedr�ckt wurde
window.onkeydown = checkEnter;
function checkEnter(e){
	var keycode;
	var element = document.activeElement;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	
	if(keycode == 13){
		if(element.className == "valInput"){
			switch(element.id){
				case "s_valInput":
					addPos(document.getElementById('s_valInput').value);
					break;
					
				case "t_valInput":
					addPosEachSecond(document.getElementById('t_valInput').value);
					break;
				
				case "g_valInput":
					guessNumber(document.getElementById('g_valInput').value);
					break;
			}
		}
	}
}

//Funktion um bestimmte Anzahl Stellen hinzuzuf�gen
function addPos(times){
	times = parseInt(times);
    if(times < 0){
		counter += times;
		if(counter <= 0){
			actualPi = "";
			counter = 0;
		} else {
			actualPi = "3." + pi.substring(0,counter);
		}
		document.getElementById("pi").innerHTML = actualPi;
		document.getElementById("position").innerHTML = "[Pos: " + counter.toString() + "]";
    }
    else{
		counter += times;
		if(counter > 1000000){
			alert("Maximum Reached!");
			counter -=times;
			return 0;
		}
		actualPi = "3." + pi.substring(0,counter);
		document.getElementById("pi").innerHTML = actualPi;
		document.getElementById("position").innerHTML = "[Pos: " + counter.toString() + "]";
    }
}

//F�gt jede Sekunde eine Anzahl Stellen hinzu
function addPosEachSecond(dps){
	if(dps == 0){
		clearInterval(interval);
		return 0;
	}
	else if(dps < 0 || !(dps = parseFloat(dps))){
        alert("Please enter a NUMBER that is 0 or higher");
        return 0;
    }
	clearInterval(interval);
	if(counter == 0){
		counter++;
	}
	function printDigit(){
		if(counter > 1000000){
			alert("Maximum Reached!");
			return 0;
		}
		actualPi = "3." + pi.substring(0,counter);
		document.getElementById("pi").innerHTML = actualPi;
		document.getElementById("position").innerHTML = "[Pos: " + counter.toString() + "]";
		counter++;
	}
	interval = setInterval(printDigit,(1000*dps));
}

//Unterbricht die obige Funktion
function pauseInterval(){
	clearInterval(interval);
}


//Setzt die Anzahl Stellen auf 0 zur�ck
function reset(){
    counter = 1;
    document.getElementById("pi").innerHTML = "";
    document.getElementById("position").innerHTML = "[Pos: 0]";
}

var points = 0;
var temppoints = 0;

//Funktion f�r den Guessmode
function guessNumber(num){
	sendScoreContainer = document.getElementById("sendScoreContainer");
	if(sendScoreContainer.style.display == "block"){sendScoreContainer.style.display = "none";}
	guessedNum = parseInt(num);
	correctNum = parseInt(pi.charAt(counter));
    if(document.getElementById("points").innerHTML=="0 P."){
        points = 0;
        temppoints = 0;
    }
	if(guessedNum == correctNum){
		document.getElementById("false").style.display = "none";
		document.getElementById("correct").style.display = "block";
		setTimeout(function(){document.getElementById("correct").style.display = "none";},1500);
		points = temppoints + Math.pow(counter+1,2) * 9;
        temppoints = points;
		document.getElementById("points").innerHTML = points + " P.";
		document.getElementById("points").style.color = "#ceffc9";
		addPos(1);
	}
	else{
		document.getElementById("correct").style.display = "none";
		document.getElementById("false").style.display = "block";
		setTimeout(function(){document.getElementById("false").style.display = "none";
		sendScoreContainer.style.display = "block";
		document.getElementById("sendScoreNameInput").focus()},750);
		counter = 0;
		document.getElementById("points").innerHTML = "0 P.";
		document.getElementById("points").style.color = "#ffffff";
		document.getElementById("pi").innerHTML = "3.";
        points = temppoints;
		addPos(0);
	}
	document.getElementById("g_valInput").select();
}

//Image Functions
var imgSize = 200;

var n0 = "#1abc9c";
var n1 = "#34ce75";
var n2 = "#3498db";
var n3 = "#9b59b6";
var n4 = "#34495e";
var n5 = "#f1c40f";
var n6 = "#e67e22";
var n7 = "#e74c3c";
var n8 = "#ecf0f1";
var n9 = "#95a5a6";

//Funktion um Bildgr�sse zu �ndern
function changeSize(){
	if(imgSize == 200){
		imgSize = 300;
		document.getElementById("optionBtn_size").style.backgroundImage = "url(images/size_m.png)";
	}
	
	else if(imgSize == 300){
		imgSize = 400;
		document.getElementById("optionBtn_size").style.backgroundImage = "url(images/size_b.png)";
	}
	
	else if(imgSize == 400){
		imgSize = 200;
		document.getElementById("optionBtn_size").style.backgroundImage = "url(images/size_s.png)";
	}
	
	else{
		alert("ERROR: Impossible Image Size. Reload!");
	}
	
	document.getElementById("imageCanvas").width = imgSize;
	document.getElementById("imageCanvas").height = imgSize;
	document.getElementById("imageCanvas").style.marginLeft = "-"+(imgSize/2+125).toString()+"px";
	loadImage();
}

var strokeWidth = 1;
var strokeBool = false;
var fillBool = true;

//L�dt das Bild
function loadImage(){
	if(typeof(Worker)!=="undefined"){
		var worker = new Worker("draw_image.js");
		var size = 5*(Math.pow(imgSize,2));
		var pixelSize = 10;
		var x = 0;
		var y = 0;
		var temp = "3";
		var anzahl = Math.pow(imgSize/pixelSize,2);
		
		worker.postMessage(anzahl);
		worker.postMessage(pi);
		document.getElementById("colorChoiceContainer").style.display = "none";
		document.getElementById("imageSettingsContainer").style.display = "none";
		if(document.getElementById("imageCanvas").style.display == "none"){document.getElementById("imageCanvas").style.display = "inline";}

		var mycanvas = document.getElementById("imageCanvas");
		var context = mycanvas.getContext("2d");
		
		worker.onmessage = function(e){
			num=e.data;
			if(num != ""){
				context.beginPath();
				context.rect(x,y,pixelSize,pixelSize);
				if(fillBool){
				context.fillStyle = eval("n"+temp);
				temp = num;
				context.fill();
				}
				if(strokeBool){
				context.strokeStyle = eval("n"+num);
				context.lineWidth=strokeWidth;
				context.stroke();
				}
				x+=pixelSize;
				counter++;
				if(x > (size/1000)){x=0;y+=pixelSize;}
			}
		}
	}
	else{
		alert("You're using an old Browser. Download Firefox, for full browsing experience!");
	}
}

//L�dt die Farb-Auswahl
function loadColorChoice(){
	document.getElementById("imageCanvas").style.display = "none";
	document.getElementById("imageSettingsContainer").style.display = "none";
	document.getElementById("colorChoiceContainer").style.display = "block";
	
	for(var i=0;i<=9;i++){
		document.getElementById("colorChoiceInput"+i.toString()).value = eval("n"+i.toString());
		document.getElementById("colorChoiceInput"+i.toString()).style.boxShadow = "20px 0px "+eval("n"+i.toString());
	}
	
	var colorChoiceId;
	var colorChoice;
	
	for(var j=0;j<=9;j++){
		$("#colorChoiceInput"+j.toString()).colpick({
			onSubmit: function(sb,hex,rgb,el){
				$(el).val("#"+hex);
				$(el).css("box-shadow","20px 0px "+"#"+hex);
				$(el).colpickHide();
			}
		});
	}
}

function loadImageSettings(){
	document.getElementById("imageCanvas").style.display = "none";
	document.getElementById("colorChoiceContainer").style.display = "none";
	document.getElementById("imageSettingsContainer").style.display = "block";
	
	var rb_fill = document.forms["imageSettingsForm"].elements["fill_bool"];
	var rb_stroke = document.forms["imageSettingsForm"].elements["stroke_bool"];
	
	if(fillBool){rb_fill[0].checked=true;}
	else if(!fillBool){rb_fill[1].checked=true;}
	
	if(strokeBool){rb_stroke[0].checked=true;}
	else if(!strokeBool){rb_stroke[1].checked=true;}
	
	document.getElementById("stroke_width").value = strokeWidth;
}

//Setzt neue Farben
function setNewColors(){
	var newColor;
	for(var i=0;i<=9;i++){
		newColor = document.getElementById("colorChoiceInput"+i).value;
		eval("n"+i.toString() + "= newColor");
	}
	loadImage();
}

function setSettings(){
	var rb_fill = document.forms["imageSettingsForm"].elements["fill_bool"];
	var rb_stroke = document.forms["imageSettingsForm"].elements["stroke_bool"];
	
	fillBool = rb_fill[0].checked;
	if(!fillBool){
		document.getElementById("imageCanvas").width = imgSize;
		document.getElementById("imageCanvas").height = imgSize;
	}
	strokeBool = rb_stroke[0].checked;
	strokeWidth = document.getElementById("stroke_width").value;
	loadImage();
}

//�ffnet oder schliesst die Settings
function toggleSettings(){
	var settings = document.getElementById("settings");
	var visibility = settings.style.visibility;
	if(visibility == "visible"){
		settings.style.visibility = "hidden";
	}
	else{
		settings.style.visibility = "visible";
	}
}

//Reagiert auf Setting Ver�nderung der FontSize
function setting_changeFontsize(){
	var pival = document.getElementById("pi");
	var range = document.getElementById("fontsize_range");
	var rangeVal = range.value;
	pival.style.fontSize = rangeVal.toString() + "em";
}