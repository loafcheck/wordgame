let size = 4;
cardValues= [
    {Vocab: 1, English: 'egg', Korean: '달걀'},
    {Vocab: 2, English: 'kiwi', Korean: '키위'}, 
    {Vocab: 8, English: 'coffee', Korean: '커피'},
    {Vocab: 9, English: 'water', Korean: '물'},
    {Vocab: 3, English: 'juice', Korean: '주스'},
    {Vocab: 4, English: 'tomato', Korean: '토마토'},
    {Vocab: 6, English: 'milk', Korean: '우유'},
    {Vocab: 7, English: 'jam', Korean: '잼'}] 


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


