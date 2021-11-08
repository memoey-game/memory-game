//Target the Strat Button To start the game
document.querySelector(".control-buttons span").onclick = function () {
    
    let yourName=window.prompt("Enter Your Name");

    if(yourName == null || yourName ==""){
        localStorage.setItem("nm",'unknown');
    } else {
        localStorage.setItem("nm",yourName);
    }

    document.querySelector(".control-buttons").style.display="none";

    setTimeout(()=>{
        timer();
    },500);
}



//target all cards(nodeList)
const cards=document.querySelectorAll(".memory-card");

//tries Element
let triesElemenet=document.querySelector('.tries .wrong');
let rightElement=document.querySelector('.tries .right');


let hasFlipped = false;
let lockBoard=false;
let firstCard,secondCard;

let arrayOfCards=Array.from(cards);

function flipcard(){

    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlipped){
        //first Click
        hasFlipped=true;
        firstCard=this;
        return;
    } 

    //second click
    hasFlipped=false;
    secondCard=this;
        
    checkForMatch();
}

function checkForMatch(){


     //check if the cards is match?
     let isMatch=firstCard.dataset.char === secondCard.dataset.char;
     isMatch ? disableCards() : unFlipped();
}

function disableCards(){
    rightElement.innerHTML= parseInt(rightElement.innerHTML)+1;
    firstCard.removeEventListener('click',flipcard);
    secondCard.removeEventListener('click',flipcard);
}

function unFlipped(){

    
    triesElemenet.innerHTML= parseInt(triesElemenet.innerHTML)+1;

    lockBoard =true;

     //not match
     setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard =false;
    },1500)
}

(function shuffle(){
    cards.forEach(card =>{
        let randomPos=Math.floor(Math.random() * arrayOfCards.length);
        card.style.order = randomPos;
    });
})();




cards.forEach((card) => {card.addEventListener('click',flipcard);});








function timer(){
    var count = 5;
    var interval = setInterval(function(){
      document.getElementById('count').innerHTML=count;
      count--;
      if (count === 0){
        clearInterval(interval);
        document.getElementById('count').innerHTML='Done';
        let mainContent=`
                           <div class="first">Hello : ${localStorage.getItem('nm')} </div>
                            <div class="second"> Your Wrong Tries : ${triesElemenet.innerHTML} </div>
                            <div class="second"> Your result is : ${rightElement.innerHTML} / 6 </div>
                            <button class="tryBtn">Re-try</button>
                        `
        let mainDiv=document.createElement('div');
        mainDiv.classList.add('mainDiv');

        mainDiv.innerHTML=mainContent;
        document.body.appendChild(mainDiv)

        document.querySelector('.tryBtn').onclick=function (){
            window.location.reload(true);
        }

      }
    }, 1000);
};
    

