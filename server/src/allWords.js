import fetch from "node-fetch"

// fetch json file
export async function WORDS() {
    const response = await fetch("./allwords.json");

    console.log(response.json)

    return response.json();
}

 async function getRandomWord(wordLength) {
    let max
    console.log(wordLength)

    if (wordLength == 4) { max = 7184 }
    else if (wordLength == 5) { max = 15917 }
    else if (wordLength == 6) { max = 29873 }

    // get random word from json depending on how many letters in "wordLength"
    WORDS().then(data => {
        const newWords = Object.getOwnPropertyNames(data).filter((el) => {
            return el.length == wordLength;
        });
        
        const ran_num = Math.floor(Math.random() * max) + 1;
        const ranWord = newWords[ran_num];

        console.log("inside " + ranWord)

        // const myWord = document.getElementById("myWord");
        // return myWord.innerHTML = ranWord;

        return ranWord
    });
    
    /* console.log("outside " + ranWord)
    return ranWord */
}