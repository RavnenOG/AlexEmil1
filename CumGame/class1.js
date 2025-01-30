console.log("Class 1 is here")

class Cats{
    constructor(image,number,hand) {
        this.image = image
        this.number = number
        this.hand = hand

        this.stats = catsStatsArray[number]

      }
    tellMeMore(){
        console.log(this.image)
    }
    
    spawnCat(totalNumberOfCats){
    let newDiv
    if(this.hand.name == "hand1"){
    newDiv = select('#handOne')
    }else if(this.hand.name == "hand2"){
    newDiv = select('#handTwo')
    }

    let cardDiv = createElement('div').addClass('card')
    cardDiv.attribute("id","cat"+totalNumberOfCats) //Sets the new made cats id
    cardDiv.style('background-image',`url(${this.image})`)

    let name = createElement('div',this.stats.name).addClass('names')
    let hp = createElement('div',"Hp: "+this.stats.hp).addClass('health')
    let ad = createElement('div',"Damage: "+this.stats.ad).addClass('damage')
    let heal = createElement('div',"Heal: "+this.stats.heal).addClass('healing')

    cardDiv.child(name);
    cardDiv.child(hp);
    cardDiv.child(ad);
    cardDiv.child(heal);

    newDiv.child(cardDiv);
    }
    
}