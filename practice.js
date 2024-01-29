let cardValues= [
    {Vocab: 1, English: 'egg', Korean: '달걀'},
    {Vocab: 2, English: 'kiwi', Korean: '키위'}, 
    {Vocab: 8, English: 'coffee', Korean: '커피'},
    {Vocab: 9, English: 'water', Korean: '물'},
    {Vocab: 3, English: 'juice', Korean: '주스'},
    {Vocab: 4, English: 'tomato', Korean: '토마토'},
    {Vocab: 6, English: 'milk', Korean: '우유'},
    {Vocab: 7, English: 'jam', Korean: '잼'},]


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
      console.log(`${cardValues} is ${tempArray[randomIndex]}`)
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
      console.log(`${cardValues} is ${tempArray[randomIndex]}`)
    }
    console.log(`${cardValues} is ${tempArray[randomIndex]}`)
    return cardValues;
  };