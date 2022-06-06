export function getWord(data, wordLength) {
    // filter words depending on word length
    const filterWords = Object.getOwnPropertyNames(data).filter((el) => {
        return el.length == wordLength;
    });
    
    // pick random word in selected wordlength array, max is number of words in selected array
    const random = Math.floor(Math.random() * 7184) + 1;
    const ranWord = filterWords[random];

    return ranWord
};