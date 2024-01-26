const koreanList = document.getElementById("koreanWordList");
const englishList = document.getElementById("englishWordList");
const btn1 = document.getElementById('button1');
const number = 12;
let kVocabArr =[];
let eVocabArr =[];

for (let i = 1; i <= number; i++) {
  const koreanInput = document.createElement("input");
  koreanInput.type = "text";
  koreanInput.placeholder = `${i} Korean vocabulary`;
  koreanInput.classList.add("koreanWordList");

  const englishInput = document.createElement("input");
  englishInput.type = "text";
  englishInput.placeholder = `${i} English vocabulary`;
  englishInput.classList.add("englishWordList");

  const koreanDiv = document.createElement("div");
  koreanDiv.id = "kword";
  koreanDiv.appendChild(koreanInput);

  const englishDiv = document.createElement("div");
  englishDiv.id = "eword";
  englishDiv.appendChild(englishInput);

  koreanList.appendChild(koreanDiv);
  englishList.appendChild(englishDiv);
}
/*
  <div id="kword">
        <input class="koreanWordList" type="text" placeholder="Enter text">
    </div>
     <div id="eword">
        <input class="englishWordList" type="text" placeholder="Enter text">
    </div>
*/

function vocabulary () {
  kVocabArr = [];
  eVocabArr = [];

  const koreanWords = koreanList.querySelectorAll(".koreanWordList");
  const englishWords = englishList.querySelectorAll(".englishWordList");

  for ( let i = 0 ; i < number ; i ++) {
    kVocabArr.push(koreanWords[i].value);
    eVocabArr.push(englishWords[i].value);
  }
  if (NoneEmpty(kVocabArr) && NoneEmpty(eVocabArr) == true){
    createItemsArray(kVocabArr, eVocabArr);
    return 1;
  } 
}

function NoneEmpty(array) {
  for(var i=0; i<number; i++) {
    if(array[i] === "") {
      alert("fill in the blank");
      return false
    };
  }
  return true;
}

let items; 

function createItemsArray(kVocabArr, eVocabArr) {
  let wordItems = [];
  for (let i = 0; i < kVocabArr.length; i++) {
    wordItems.push({
      Vocab: i + 1,
      English: eVocabArr[i],
      Korean: kVocabArr[i]
    });
  }
  console.log (wordItems);
  items = [...wordItems]
  return items;
}

const wrapper = document.getElementsByClassName('wrapper')[0];
const startWrapper = document.getElementsByClassName('controls-container')[0];
const wordListWrapper = document.querySelector(".wordListWrapper");
btn1.addEventListener('click', function() {
  vocabulary(); 
  wordListWrapper.classList.add("hide");
  startWrapper.classList.remove('hide');
  wrapper.classList.remove("hide");
});

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array

console.log(items);

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  
  cardValues.sort(()=> Math.random()-0.5);
  
  let shuffledKoreanCards = cardValues.map(card => ({...card, language: 'Korean'}));
  let shuffledEnglishCards = cardValues.map(card=>({...card, language: 'English' }));
  
  let shuffledCards = [...shuffledEnglishCards, ...shuffledKoreanCards];
  
  shuffledCards.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
    <div class="card-container" data-card-value="${shuffledCards[i].Vocab}">
       <div class="card-before">?</div>
       <div class="card-after"><p>${shuffledCards[i].language === 'Korean' ? shuffledCards[i].Korean : shuffledCards[i].English}</p></div>
    </div>
  `;
  }

  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
