//innitialize variables
var gameState = "standby"

var ranWordsArr = ["parrot", "dog", "bear"]

var currentLetters = "";

var wordDisp = "";

var guessLog = [];

var playerGuess = "";

var chances = 7;

var sucCheck= false;

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "x", "z"]

//player inputs
function btnClick (){
	var success=true;
	//submits letter guesses
	if (gameState=="end"){
		
		gameState="standby";
		
		currentLetters = "";

		wordDisp = "";

		guessLog = [];

		playerGuess = "";

		chances ="7"

		document.getElementById("chances").textContent=chances;

		document.getElementById("btn1").textContent= "Start"

		document.getElementById("instructions").textContent= "Press start to begin";
	}
	
	if (gameState== "playing" && playerGuess.length==1){
		
		for(i=0; i<guessLog.length; i++){
			if(guessLog[i]==playerGuess){
			success=false;
			}
		}
		
		if (success==true){
			guessLog.push(playerGuess);
			
			printWord();
			
			document.getElementById("guessed").textContent= "guessed so far... "+guessLog;
			
			if (wordDisp==currentLetters){
				gameState= "end"
				document.getElementById("btn1").textContent= "Play Again";
				document.getElementById("guessed").textContent= "";
				document.getElementById("instructions").textContent= "You Win!";
				document.getElementById("currentLetter").textContent= "";
				document.getElementById("currentWord").textContent= currentLetters;
				document.getElementById("chances").textContent="";
			}
		}


	}
	//starts the game
	if (gameState== "standby"){
		gameState= "playing"
		setNewWord();
		printWord();
		document.getElementById("instructions").textContent= "Press a key to guess the word.";
		document.getElementById("btn1").textContent= "Submit";
	}

	if(chances==0){
		gameState= "end"
				document.getElementById("btn1").textContent= "Try Again";
				document.getElementById("guessed").textContent= "";
				document.getElementById("instructions").textContent= "You Lose!";
				document.getElementById("currentLetter").textContent= "";
				document.getElementById("currentWord").textContent= currentLetters;
				document.getElementById("chances").textContent="";
		}

};

document.onkeyup= function(event){
	var success=false;
	if (gameState="playing"){
		for (i=0; i<alphabet.length; i++){

			if (alphabet[i]==event.key){
			success= true;
			}
		}
	}
	
	if (success==true){
		playerGuess= event.key;
		document.getElementById("currentLetter").textContent= "You pressed "+event.key+". Are you sure?"
	}
	else{
		document.getElementById("currentLetter").textContent= event.key+" is not a letter."
	}
}

// functions

function setNewWord (){
	currentLetters=ranWordsArr[Math.floor(Math.random()*(ranWordsArr.length))]
	}

function printWord (){
	wordDisp= "";
	var success=false;
	
	for (var i=0;i< currentLetters.length; i++){
		if (guessLog.length>0){
			for (var j=0; j<guessLog.length; j++){
				if (currentLetters.charAt(i) == guessLog[j]){
					wordDisp= wordDisp+currentLetters.charAt(i);
					success=true;
				}
			}
		}

		if(success==false){
			wordDisp= wordDisp+"-"
		}
		success=false;
	}
	document.getElementById("currentWord").textContent=wordDisp;
	
	if(success==false&&gameState=="playing"){
		chances= chances-1;
		document.getElementById("chances").textContent=chances+ " chances left.";
		document.getElementById("hangMan").src="assets/images/image_0"+(7-chances)+".jpg"
	}
}

