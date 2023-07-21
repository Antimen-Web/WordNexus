import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import WordCard from "@components/WordCard";
import { selectLearn } from "@redux/learn/selectors";
import WritingEqualChoice from "@components/exercises/WritingEqualChoice";
import WritingEqualAssociation from "@components/exercises/WritingEqualAssociation";
import { shuffleArray } from "@utils/suffleArray";

function newWordsLearning(
  words,
  index = 0,
  left = 15,
  number = 5,
  allWords,
  RandomComponent
) {
  if (left === 0) {
    // const uniqueIds = [];
    // let completedWords = words
    //   .slice()
    //   .reverse()
    //   .filter((element) => {
    //     const isDuplicate = uniqueIds.includes(element._id);
    //     if (!isDuplicate) {
    //       uniqueIds.push(element._id);
    //       return true;
    //     }
    //     return false;
    //   });
    console.log(words);
    return;
  }

  const wordsLength = Math.ceil(left / number);

  if (index === words?.length) {
    console.log(words);
    newWordsLearning(words, 0, left, number, allWords, RandomComponent);
    return;
  }

  let newWords = words?.length
    ? words.map((obj) => ({ ...obj }))
    : shuffleArray(
        allWords.filter((word) => word.level === 0).slice(0, number)
        // .flatMap((word) => Array(wordsLength).fill(word))
      );

  if (newWords[index].level === 0) {
    newWords[index].level = 1;
    console.log("word card");

    return (
      <WordCard post={newWords[index]} study={true} learningWords={newWords} />
    );
  } else {
    console.log("random card" + newWords[index].word);
    console.log(RandomComponent);
    return (
      <RandomComponent
        post={newWords[index]}
        learningWords={newWords}
        allWords={allWords}
      />
    );
  }
}

const New = () => {
  const exercises = [WritingEqualChoice];

  const RandomComponent =
    exercises[Math.floor(Math.random() * exercises.length)];

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const allWords = session?.user.allWords;
  const { learningWords, index, left, number } = useAppSelector(selectLearn);

  if (allWords) {
    // console.log(learningWords);
    // console.log(index);
    // console.log(left);
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
