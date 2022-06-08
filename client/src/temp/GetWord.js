/* const words = [
    "test",
    "mats",
    "hello",
    "wordle"
];

const getWord = () => {
    const ran_num = Math.floor(Math.random() * 4);
    const correctWord = words[ran_num];

    return correctWord;
};

export default getWord; */

/* export default async function getWord() {
    const res = await fetch("/word");
    const resWord = await res.json();
    const word = await resWord.word
    console.log(word)
    return await word
} */

export async function getWord(wordlength) {
    await fetch("/word", {
      method: "GET",
      body: JSON.stringify({
        wordlength,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
  }