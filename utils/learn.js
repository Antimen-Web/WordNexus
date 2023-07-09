/**
 Designations:

 writing = W
 association = ASS
 choice = С
 translation = T
 anagram = ANA
 remember? = R?
 meaning = M
 example = E
 insertion = I
 voice = V

 **/

export class Learn {
  constructor(words) {
    this.words = words;
    this.types = {
      wordCard(word) {
        console.log("show card " + word.word);
      },
      WritingEqualAssociation(word) {
        if (word.levelProgress === 1) {
          word.levelProgress--;
          return "error in HandWeqASS";
        }
        console.log("hearing + writing => association " + word.word);
        word.levelProgress++;
      },
      WritingEqualChoice(word) {
        if (word.levelProgress === 2) {
          word.levelProgress--;
          return "error in HeqC";
        }
        console.log("hearing => choice " + word.word);
        word.levelProgress++;
      },
    };
  }

  newWordsLearning(words, index = 0, left = 15, number = 5) {
    if (left === 0) {
      return;
    }

    const wordsLength = Math.ceil(left / number);

    if (index === words?.length) {
      this.newWordsLearning(words, 0, left);
      return;
    }

    const newWords =
      words ||
      this.shuffleArray(
        this.words
          .filter((word) => word.level === 0)
          .slice(0, number)
          .flatMap((word) => Array(wordsLength).fill(word))
      );

    if (newWords[index].level === 0) {
      newWords[index].level = 1;
      this.types.wordCard(newWords[index]);
      this.newWordsLearning(newWords, index + 1, left - 1);
    } else {
      const error = this.getRandomType(newWords[index]);
      if (error) {
        console.log(error + "word: " + newWords[index].word);
        if (left < 3) {
          left++;
        }
        newWords.splice(index + 2, 0, newWords[index]);
      }
      this.newWordsLearning(newWords, index + 1, left - 1);
    }
  }
  halfWordsLearning(words, index = 0, left = 15, number = 5) {
    if (left === 0) {
      return;
    }
    if (index > words?.length) {
      return;
    }

    if (index === words?.length) {
      this.halfWordsLearning(this.shuffleArray(words), 0, left);
      return;
    }

    const halfWords =
      words ||
      this.shuffleArray(
        this.words.filter((word) => 0 < word.level < 4).slice(0, number)
      );

    this.getRandomType(halfWords[index]);

    if (halfWords[index].levelProgress > 10) {
      halfWords[index].levelProgress = 0;
      halfWords[index].level++;
    }

    this.halfWordsLearning(
      halfWords.filter((word) => word.level < 4),
      index + 1,
      left - 1
    );
  }

  almostWordsLearning() {}

  repeatWordsLearning() {}

  getRandomType(word) {
    const types = Object.keys(this.types);
    types.shift();
    const randomIndex = Math.floor(Math.random() * types.length);

    return this.types[types[randomIndex]](word);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
