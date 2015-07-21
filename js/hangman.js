var sec = document.getElementById('secret');
var secret = 'javascript';
var lettersGuessed = '';
var a = "";
var counter = 1;
var group = document.getElementById('alphabet');
var phase = document.getElementById('phase');
var actualSecret = "";

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
  if(counter==5){
    sec.textContent = getGuessedWord(secret, secret);
    alert('prehral si!');
    // for (var btn of document.getElementById('alphabet')){
    //   btn.setAttribute('disabled','disabled');
    // }
  }
  
  
  // endOfGame(secret, lettersGuessed);
}

// function endOfGame(secret, lettersGuessed){
//   if (secret == lettersGuessed) {
//     console.log('end');
//   }
//   return;
// }

window.onload = function(){

sec.textContent = getGuessedWord(secret, lettersGuessed);

for(var c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  var element = document.createElement('button');
  element.setAttribute('type','button');
  element.setAttribute('class','btn btn-default');
  element.textContent = c;
  element.addEventListener('click', onClick);
  group.appendChild(element);
}

}