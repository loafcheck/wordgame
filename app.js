const koreanList = document.getElementById("koreanWordList");
const englishList = document.getElementById("englishWordList");
const btn1 = document.getElementById('button1');
const nextBtn = document.getElementById('nextBtn');
const table = document.getElementById('table');
const language1Input = document.getElementById('language1');
const language2Input = document.getElementById('language2');
const language1Header = document.getElementById('language1Header');
const language2Header = document.getElementById('language2Header');
const lang1Label = document.getElementById('lang1Label');
const lang2Label = document.getElementById('lang2Label');
const number = 12;
let kVocabArr =[];
let eVocabArr =[];


// Two languages input from the user 
nextBtn.addEventListener('click', function(){
  if (language1Input.value.trim() === '' || language2Input.value.trim() === '') {
    alert('Please fill in both language fields.');
    return; // Stop the event listener execution
}

  table.classList.remove('hide');
  btn1.classList.remove('hide');
  nextBtn.classList.add('hide');

  language1Header.textContent = language1Input.value;
  language2Header.textContent = language2Input.value;

  for (let i = 1; i <= number; i++) {

    const labelValue1 = `${language1Input.value} vocabulary`;
    const labelValue2 = `${language2Input.value} vocabulary`;
  
    const koreanInput = document.createElement("input");
    koreanInput.type = "text";
    koreanInput.placeholder =  `${i} ${labelValue1}`;;
    koreanInput.classList.add("koreanWordList");
  
    const englishInput = document.createElement("input");
    englishInput.type = "text";
    englishInput.placeholder = `${i} ${labelValue2}`;
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

})

btn1.addEventListener('click', function() {
  const vocabFilled = vocabulary();
  if(!vocabFilled) {
    return;
  }
  wordListWrapper.classList.add("hide");
  startWrapper.classList.remove('hide');
  wrapper.classList.remove("hide");
});

//input vocabulary from user
function vocabulary () {
  kVocabArr = [];
  eVocabArr = [];

  const koreanWords = koreanList.querySelectorAll(".koreanWordList");
  const englishWords = englishList.querySelectorAll(".englishWordList");

  for ( let i = 0 ; i < number ; i ++) {
    kVocabArr.push(koreanWords[i].value);
    eVocabArr.push(englishWords[i].value);
  }
  if (!NoneEmpty(kVocabArr) || !NoneEmpty(eVocabArr)){
    
    return false;
  }
  createItemsArray(kVocabArr, eVocabArr);
  return true;
}
function NoneEmpty(array) {
  for(var i=0; i<number; i++) {
    if(array[i] === "") {
      alert("fill in the blank");
      return false
    }
  }
  return true;
}

//item array create
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
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const flippedCards = document.getElementById("flip");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let continueEvent = true;

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
  let tempArray = [...items];
  let cardValues = [];
 
  size = (size * size) / 2;
 
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
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
     
      if (!card.classList.contains("matched")) {
          card.classList.add("flipped");
        if (!firstCard) {
           firstCard = card;
           firstCardValue = card.getAttribute("data-card-value");
        } else {
        
          movesCounter();
   
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
   
            flippedCards.innerHTML=`<span>Matched cards:</span> ${winCount}`
         8
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
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
