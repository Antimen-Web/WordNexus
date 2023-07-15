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
  RandomComponent,
  userId
) {
  if (left === 0) {
    let newWords = words?.map((obj) => ({ ...obj }));
    console.log(newWords);
    for (let i = 0; i < allWords.length; i++) {
      console.log(allWords);
      if (!newWords.length) {
        const patchWords = async () => {
          try {
            const response = await fetch(`/api/users/${userId}/learnedCards`, {
              method: "PATCH",
              body: JSON.stringify(allWords),
            });

            if (response.ok) {
              console.log("word added");
            }
          } catch (error) {
            console.log(error);
          }
        };
        patchWords();
        return;
      }
      for (let j = 0; j < newWords.length; j++) {
        if (allWords[i]._id === newWords[j]._id) {
          allWords.splice(i, 1, newWords[j]);
          newWords.splice(j, 1);
          console.log("lol");
          continue;
        }
      }
    }
  }

  console.log("no");

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
    console.log("random card" + newWords[index].word);
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
    console.log(learningWords);
    console.log(index);
    console.log(left);
    let exercise = newWordsLearning(
      learningWords,
      index,
      left,
      number,
      allWords,
      RandomComponent,
      session?.user.id
    );
    return exercise;
  }

  return <section className="w-full flex-center flex-col"></section>;
};

export default New;
