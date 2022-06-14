// check if guess is correct on first try
function word_check (wordle_word, guess_word) {
  //check if guessed word is correct
  if (guess_word === wordle_word) {
      return "Your guess is correct, congratulation!";
  }
  else {   
      const result = word_to_array (wordle_word, guess_word)
      return result;
  };
};

// split input to arrays and compare array.length
function word_to_array (wordle_word, guess_word) {
  const wordle_array = wordle_word.split("");
  let guess_array = guess_word.split("");
  //check if guessed word contains correct amount of letters
  if (guess_array.length == wordle_array.length) {
      const result = properties_to_array (wordle_array, guess_array);
      return result;
  }
  else {
      const result = "Your guess must contain " + wordle_array.length + " letters"
      return result;
  };
};

// add obj "status:" and change obj.name to each letter in guess_array
function properties_to_array (wordle_array, guess_array) {
  guess_array = guess_array.map((element) => ({
      ...element,
      status: "incorrect"
  }));
  guess_array = guess_array.map( item => {
      const { [0]: letter, ...rest } = item;
      return { letter, ...rest }
  });
  const result = array_check (wordle_array, guess_array)
  return result;
}

// compare input array to wordle array
function array_check (wordle_array, guess_array) {
  for (let i=0; i < guess_array.length; i++) {
      if (guess_array[i].letter == wordle_array[i]) {
          guess_array[i].status = "correct"
          wordle_array[i] = "check"
      };
  };
  guess_array.forEach(element => {    
      for (let j=0; j < guess_array.length; j++) {
          if (element.status == "incorrect") {
              if (element.letter == wordle_array[j]) {
                  element.status = "missplaced"
                  wordle_array[j] = "check"
              };
          };
      };
  });
  const result = JSON.stringify(guess_array).replace(/{/g,"").replace(/}/g,"").replace(/"/g,"").replace(/letter:/g," ").replace(/status:/g," ")
  return result;
};

/* 
in the following tests we test 
- if the correct word and the guessed word has the same length
- if the guessed word is correct
- if letters in guessed word is "correct", "missplaced" or "incorrect"
- if a "correct" letter is entered twice or more in guessed word (and the correct word only contains one version of the letter), 
  the "missplaced" letter(s) should be "incorrect"
- if a letter is entered twice in both words, and one is on correct place and the other is missplaced, they should be marked accordingly 
- if a "missplaced" letter is entered twice or more in guessed word (and the correct word only contains one version of the letter), 
  the first version of the letter should be marked "missplaced" and the following "incorrect"
*/

// test if words has different length
test("wordle word and guessed word has different amount of letters", async () => {
  const wordle_word = "abcde";
  const guess_word = "abcdef";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe('Your guess must contain 5 letters');
});

// test if guessed word is correct
test("single correct letter", async () => {
  const wordle_word = "a";
  const guess_word = "a";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe("Your guess is correct, congratulation!");
});

test("two correct letters", async () => {
  const wordle_word = "ab";
  const guess_word = "ab";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe("Your guess is correct, congratulation!");
});

// test if letters in guessed word are correct, missplaced or incorrect
test("two missplaced letters", async () => {
  const wordle_word = "ab";
  const guess_word = "ba";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe('[ b, missplaced, a, missplaced]');
});

// test if letters in guessed word are correct, missplaced or incorrect
test("two missplaced letters and one correct letter", async () => {
  const wordle_word = "abc";
  const guess_word = "cba";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe('[ c, missplaced, b, correct, a, missplaced]');
});

// test if letters in guessed word are correct, missplaced or incorrect
test("one correct letter, two missplaced letters and one incorrect letter", async () => {
  const wordle_word = "abcd";
  const guess_word = "acba";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe('[ a, correct, c, missplaced, b, missplaced, a, incorrect]');
});

// test if letters in guessed word are correct, missplaced or incorrect
test("two correct letters, two missplaced letters and one incorrect letter", async () => {
  const wordle_word = "abcde";
  const guess_word = "acbbe";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe('[ a, correct, c, missplaced, b, missplaced, b, incorrect, e, correct]');
});

// test if letters in guessed word are correct, missplaced or incorrect
test("two correct letters, one missplaced letter and two incorrect letters", async () => {
  const wordle_word = "abcde";
  const guess_word = "addbe";
  const data = await word_check(wordle_word, guess_word);
  expect(data).toBe('[ a, correct, d, missplaced, d, incorrect, b, missplaced, e, correct]');
});