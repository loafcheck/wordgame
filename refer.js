gameContainer.innerHTML = "";
 /** cardValues= [
  {Vocab: 1, English: 'egg', Korean: '달걀'},
  {Vocab: 2, English: 'kiwi', Korean: '키위'}, 
  {Vocab: 8, English: 'coffee', Korean: '커피'},
  {Vocab: 9, English: 'water', Korean: '물'},
  {Vocab: 3, English: 'juice', Korean: '주스'},
  {Vocab: 4, English: 'tomato', Korean: '토마토'},
  {Vocab: 6, English: 'milk', Korean: '우유'},
  {Vocab: 7, English: 'jam', Korean: '잼'},] 
  cardValues.length = 8
  
  16 = [...8 , ...8]
  나는 굳이 16개를 만들 필요가 있는가?
  그냥 cardValues 로 gameContainer에 cardValues[i].Korean
  그냥 cardValues 로 gameContainer에 cardValues[i].English
  넣으면 되는거 아님?
  */

//simple shuffle
cardValues.sort(() => Math.random() - 0.5);
/**
 * cardValues= [
  {Vocab: 1, English: 'egg', Korean: '달걀'},
  {Vocab: 2, English: 'kiwi', Korean: '키위'}, 
  {Vocab: 8, English: 'coffee', Korean: '커피'},
  {Vocab: 9, English: 'water', Korean: '물'},
  {Vocab: 3, English: 'juice', Korean: '주스'},
  {Vocab: 4, English: 'tomato', Korean: '토마토'},
  {Vocab: 6, English: 'milk', Korean: '우유'},
  {Vocab: 7, English: 'jam', Korean: '잼'},] 
  cardValues.length = 8
  
 * 
 */
//이미 같은 세트 두개가 있으므로 순서만 랜덤하게 하면됨.
//gameContainer 안에 같은이미지가 두번반복하게함. 
//근데 나는 gameContainer 안에 8개는 한국어 8개는 영어가 필요함.

for (let i = 0; i < size * size; i++) {
      gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].Vocab}">
         <div class="card-before">?</div>
         <div class="card-after"><p>${cardValues[i].Korean}</p></div>
      </div>
      `;
      /**
       * 
       * gameContainer.innerHTML += `
       * D
      <div class="card-container" data-card-value="${cardValues[0].Vocab}">
         <div class="card-before">?</div>
         <div class="card-after"><p>${cardValues[0].Korean}</p></div>
      </div>
      F
      <div class="card-container" data-card-value="${cardValues[1].Vocab}">
         <div class="card-before">?</div>
         <div class="card-after"><p>${cardValues[1].Korean}</p></div>
      </div>
      A
      <div class="card-container" data-card-value="${cardValues[2].Vocab}">
         <div class="card-before">?</div>
         <div class="card-after"><p>${cardValues[2].Korean}</p></div>
      </div>
      B
      <div class="card-container" data-card-value="${cardValues[3].Vocab}">
         <div class="card-before">?</div>
         <div class="card-after"><p>${cardValues[3].Korean}</p></div>
      </div>
      `;
       * 

      { name: "bee", image: "bee.png" },
      { name: "crocodile", image: "crocodile.png" },
      { name: "macaw", image: "macaw.png" },
      { name: "gorilla", image: "gorilla.png" },
       */
}



/* 
game 


const items = [
  { name: "bee", image: "bee.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "macaw", image: "macaw.png" },
  { name: "gorilla", image: "gorilla.png" },
  { name: "tiger", image: "tiger.png" },
  { name: "monkey", image: "monkey.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "piranha", image: "piranha.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "sloth", image: "sloth.png" },
  { name: "cockatoo", image: "cockatoo.png" },
  { name: "toucan", image: "toucan.png" },
];

const items = [
  {Vocab: 1, English: 'egg', Korean: '달걀'},
  {Vocab: 2, English: 'kiwi', Korean: '키위'}, 
  {Vocab: 3, English: 'juice', Korean: '주스'},
  {Vocab: 4, English: 'tomato', Korean: '토마토'},
  {Vocab: 5, English: 'potato', Korean: '감자'},
  {Vocab: 6, English: 'milk', Korean: '우유'},
  {Vocab: 7, English: 'jam', Korean: '잼'},
  {Vocab: 8, English: 'coffee', Korean: '커피'},
  {Vocab: 9, English: 'water', Korean: '물'},
  {Vocab: 10, English: 'fruit', Korean: '과일'},
  {Vocab: 11, English: 'vegi', Korean: '야채'},
  {Vocab: 12, English: 'snack', Korean: '과자'},
];

*/
