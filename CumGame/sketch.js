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
//Player 1's turn is true and players 2's turn is false
let turn = true

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
  
  let startButton = document.getElementById("startButton")
  startButton.addEventListener('click',() => {
    select('#board').removeClass('hidden'); 
    select('#startScreen').addClass('hidden')
  })
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