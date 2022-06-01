const words = [
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

export default getWord;