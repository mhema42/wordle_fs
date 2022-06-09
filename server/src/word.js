export function getWord(data, wordLength) {
    // max is the number of words in JSON with a specific wordLength
    let max;
    
    // filter words depending on word length
    if (wordLength == 4) { max = 7184 }
    else if (wordLength == 5) { max = 15917 }
    else if (wordLength == 6) { max = 29873 }

    const filterWords = Object.getOwnPropertyNames(data).filter((el) => {
        return el.length == wordLength;
    });
    
    // pick random word in selected wordlength array, max is number of words in selected array
    const random = Math.floor(Math.random() * max) + 1;
    const ranWord = filterWords[random];

    return ranWord
};