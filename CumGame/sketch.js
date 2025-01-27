let fetchData
let subreddit = "cats"
let catImages = []
let hand1 = []
let hand2 = []
let currentCat = 0
let catsReady = false

async function setup(){
  
  const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=100`)
  const jsonData = await response.json();

  await getCats(jsonData.data.children) 
  catsReady = true
}

async function getCats(jsonData){
  let isRight = jsonData[currentCat].data.thumbnail.slice(0,14)
  console.log(jsonData[currentCat])

  if(isRight === "https://b.thum"){
    catImages.push(jsonData[currentCat].data.thumbnail)
  }
  currentCat++
  if(catImages.length < 20){
    getCats(jsonData)
  }
}

function keyPressed(){
  if(hand1.length<5 && catsReady){
  takeCard()
  }
}

function takeCard(){
  let number = (Math.round(random(-0.5,19.49)))
  let g
  g = new Cats(catImages[number],number)
  
  g.spawnCat()
  hand1.push(g)
  console.log(hand1)
  console.log("Name: "+g.stats.name+"; "+"Health: "+g.stats.hp+"; Damage: "+g.stats.ad+"; Healing: "+g.stats.heal)
}