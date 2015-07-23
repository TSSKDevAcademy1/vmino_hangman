var sec = document.getElementById('secret');
var group = document.getElementById('alphabet');
var phase = document.getElementById('phase');
var restart = document.getElementById('restart');
var secret = 'javascript'; // slovo na uhadnutie
var lettersGuessed = ''; //uhadnute pismena
var counter = 1; // premenna na pocitanie chyb
var counterWin = 0; // premenna na pocitanie sparvnych pismen

// funkcia na kontrolu pismen v hladanom slove
function getGuessedWord(secret, lettersGuessed){
  var result='';
  for(var c of secret)
    {
      if(lettersGuessed.indexOf(c)>=0)
        {
          result+=c;
        }
      else
        result+='_';
    }        
  return result;
}

//funkcia na vykonanie zmien po kliknuti na tlacidlo pismena
function onClick(event){
  //ake pismeno
  var el = event.target;
  //vypni tlacidlo
  el.setAttribute('disabled','disabled');
  //dopis do zoznamu pismen
  lettersGuessed += el.textContent.toLowerCase();
  //aktualizuj zoznam
  sec.textContent = getGuessedWord(secret, lettersGuessed);
  //ak zle, pripocitaj a zmen obrazok
  if(sec.textContent.search(el.textContent.toLowerCase()) < 0){
    counter++;
    if (counter<6)
    phase.setAttribute('src','images/phase'+ counter +'.png');
  }
  //ak koniec, vypis slovo, napis, vypni tlacidla
  if(counter==5){
    sec.textContent = getGuessedWord(secret, secret);
    for (var btn of document.getElementById('alphabet').childNodes){
      btn.setAttribute('disabled','disabled');
    }
    alert('prehral si!');
  }
  //ak vyhra, vypni tlacidla a vypis "vyhral si"
  if (sec.textContent == secret && counter < 5) {
    alert('Vyhral si');
    for (var btn of document.getElementById('alphabet').childNodes){
      btn.setAttribute('disabled','disabled');
    }
  }
}

//tlacidlo restart
function clickRestart(){
  lettersGuessed = "";
  sec.textContent = getGuessedWord(secret, lettersGuessed);
    for (var btn of document.getElementById('alphabet').childNodes){
      btn.removeAttribute('disabled');
    }
    counter = 1; //reset counters
    counterWin = 0;
    phase.setAttribute('src','images/phase'+ counter +'.png') //reset image
}


window.onload = function(){

sec.textContent = getGuessedWord(secret, lettersGuessed);

for(var c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  var element = document.createElement('button');
  element.setAttribute('type','button');
  element.setAttribute('class','btn btn-default');
  element.textContent = c;
  element.addEventListener('click', onClick);
  group.appendChild(element);
  restart.addEventListener('click', clickRestart);
}

}