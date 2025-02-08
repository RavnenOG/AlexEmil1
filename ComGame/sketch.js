let fetchData
let subreddit = "cats"
let catImages = []
let hand1 = []
hand1.name = "hand1"
let hand2 = []
hand2.name = "hand2"
let currentCat = 0
let catsReady = false
let totalNumberOfCats = 0
let selectedCat
//Player 1's turn is true and players 2's turn is false
let turn = true
let state = "Start Screen"

async function setup(){
  
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=100`)
  const jsonData = await response.json();

  await getCats(jsonData.data.children) 
  catsReady = true
  
  //Start functions
  //Takes 3 cards for each player
  for(let i = 0; i<3; i++){
    takeCard(hand1)
    takeCard(hand2)
  }


  //This is the code for loading tekst and making startscreen hidden and game visible when startgame is pressed
  let startButton = select('#startButton');
  let startScreen = select('#startScreen');
  let board = select('#board');
  let loadingText = select('#LoadingText')

  loadingText.removeClass('visible');
  loadingText.addClass('hidden');

  startButton.removeClass('hidden');
  startButton.addClass('visible');

  startButton.mousePressed(() => {
    startScreen.removeClass('visible');
    startScreen.addClass('hidden');

    board.removeClass('hidden');
    board.addClass('visible');
  });
  //---

  
 


  //---


let divs = document.querySelectorAll('.card'); // Select all divs

    divs.forEach(div => {
        div.addEventListener('click', () => {
            selectedCat = div.id.slice(3,4)
            console.log(selectedCat)
            chooseActiveCat(selectedCat,"1") //Test //The 1 is which activeCatBox it needs to go in
        });
    });
    
}


async function getCats(jsonData){
  let isRight = jsonData[currentCat].data.thumbnail.slice(0,14)

  if(isRight === "https://b.thum"){
    catImages.push(jsonData[currentCat].data.thumbnail)
  }
  currentCat++
  if(catImages.length < 20){
    getCats(jsonData)
  }
}

//skal slettes er en teste funktion
function keyPressed(){
  if(hand1.length<5 && catsReady){
  takeCard()
  }
}

function takeCard(whichHand){
  totalNumberOfCats++
  let number = (Math.round(random(-0.5,19.49)))
  let g
  g = new Cats(catImages[number],number,whichHand)
  
  g.spawnCat(totalNumberOfCats)
  whichHand.push(g)
  //console.log(hand1)
  //console.log("Name: "+g.stats.name+"; "+"Health: "+g.stats.hp+"; Damage: "+g.stats.ad+"; Healing: "+g.stats.heal)
}

function chooseActiveCat(choosenCat,box){
  //Choosen cat needs to be the cats id
  //When calling this function, write id number of the cat. Since it says cat for you here. exsample: chooseActiveCat("1")
  let cat = select(`#cat${choosenCat}`)
  let catBox = select(`#activeCatBox${box}`); //det her har fejl, og det er som om jeg ikke kan selecte activecatbox1 eller 2, og tror ikke appendChild er en function, så skal bruge noget andet.

    console.log(catBox)

    
    cat.parent(catBox);
    cat.addClass('activeCat')

  
  console.log(cat)

}
