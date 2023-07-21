import React from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCards } from "@redux/cards/selectors";
import { shuffleArray } from "@utils/suffleArray";
import { setIndex, setLeft, setWords } from "@redux/learn/slice";
import { selectLearn } from "@redux/learn/selectors";

const WritingEqualChoice = ({ post, learningWords, allWords }) => {
  const dispatch = useAppDispatch();
  const { index, left } = useAppSelector(selectLearn);

  console.log("kek");

  const randomCards = shuffleArray(allWords).slice(0, 3);
  randomCards.push(post);
  const choiceCards = shuffleArray(randomCards);

  const tags = JSON.parse(post.tag).slice(0, 3);

  const handleSuccess = (word) => {
    if (word.levelProgress > 9) {
      word.level++;
    } else {
      word.levelProgress++;
    }

    dispatch(setIndex(index + 1));
    dispatch(setLeft(left - 1));
    dispatch(setWords(learningWords));
  };
  const handleFail = (word) => {
    if (word.levelProgress === 0) {
      word.level--;
    } else {
      word.levelProgress--;
    }

    learningWords.splice(index + 3, 0, word);

    dispatch(setIndex(index + 1));
    dispatch(setLeft(left - 1));
    dispatch(setWords(learningWords));
  };

  return (
    <div className="prompt_card p-6 my-10">
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.desc}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">
        {tags?.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            {tag}
            {index < tags.length - 1 ? ", " : " "}
          </span>
        ))}
      </p>

      <p className="mb-4 mt-8 font-satoshi text-2xl text-center">
        What word is it?
      </p>

      <div className="flex flex-col my-4 gap-5">
        {choiceCards.map((word, index) => (
          <button
            key={index}
            type="button"
            className="outline_btn"
            onClick={() =>
              word._id === post._id ? handleSuccess(post) : handleFail(post)
            }
          >
            {word.word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WritingEqualChoice;
