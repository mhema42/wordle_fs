export function getWords(data, wordLength, unique) {
    // unique = "yes" if ranWord has only unique letters
    let max, ranWord;
    
    // max = number of words in JSON with a specific wordLength   
    if (wordLength == 4) { max = 7184 }
    else if (wordLength == 5) { max = 15917 }
    else if (wordLength == 6) { max = 29873 };

    // filter words according to selected word length
    const filterWords = Object.getOwnPropertyNames(data).filter((el) => {
        return el.length == wordLength;
    });

    // if word can contain any letters
    if (unique == "false") {
        // set random according to max number of words in selected filter
        let random = Math.floor(Math.random() * max) + 1;
        ranWord = filterWords[random];

        return ranWord
    };

    // if word should contain only unique letters
    let uniqueLetters = false;

    while (uniqueLetters == false) {    
        let random = Math.floor(Math.random() * max) + 1;
        ranWord = filterWords[random];

        let splitWord = ranWord.split("").map((letter, index) => ({
            ...index,
            letter: letter,
        }));
        /* check if */ uniqueLetters = true;
        for (let i = 0; i < splitWord.length; i++) {
            for (let j = i + 1; j < splitWord.length; j++) {
                if (splitWord[i].letter === splitWord[j].letter) {
                    uniqueLetters = false;
                };
            };
        };
    };

    return ranWord
}