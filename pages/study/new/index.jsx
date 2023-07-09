import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import WordCard from "@components/WordCard";
import { selectLearn } from "@redux/learn/selectors";
import WritingEqualChoice from "@components/exercises/WritingEqualChoice";
import WritingEqualAssociation from "@components/exercises/WritingEqualAssociation";

function newWordsLearning(
  words,
  index = 0,
  left = 15,
  number = 5,
  allWords,
  RandomComponent
) {
  if (left === 0) {
    return;
  }

  const wordsLength = Math.ceil(left / number);

  if (index === words?.length) {
    newWordsLearning(words, 0, left);
    return;
  }

  let newWords = words?.length
    ? words.map((obj) => ({ ...obj }))
    : shuffleArray(
        allWords
          .filter((word) => word.level === 0)
          .slice(0, number)
          .flatMap((word) => Array(wordsLength).fill(word))
      );

  if (newWords[index].level === 0) {
    newWords[index].level = 1;
    console.log("word card");

    return (
      <WordCard post={newWords[index]} study={true} learningWords={newWords} />
    );
  } else {
    // const error = this.getRandomType(newWords[index]);
    // if (error) {
    //   console.log(error + "word: " + newWords[index].word);
    //   if (left < 3) {
    //     left++;
    //   }
    //   newWords.splice(index + 2, 0, newWords[index]);
    // }
    console.log("random card" + newWords[index].word);
    return <RandomComponent post={newWords[index]} learningWords={newWords} />;
    // newWordsLearning(newWords, index + 1, left - 1);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const New = () => {
  const exercises = [WritingEqualChoice, WritingEqualAssociation];

  const RandomComponent =
    exercises[Math.floor(Math.random() * exercises.length)];

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const allWords = session?.user.allWords;
  const { learningWords, index, left, number } = useAppSelector(selectLearn);

  if (allWords) {
    console.log(learningWords);
    console.log(index);
    console.log(left);
    let exercise = newWordsLearning(
      learningWords,
      index,
      left,
      number,
      allWords,
      RandomComponent
    );
    return exercise;
  }

  return <section className="w-full flex-center flex-col"></section>;
};

export default New;
