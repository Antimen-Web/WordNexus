import { useState } from "react";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { deleteCard, fetchAllCards } from "@redux/cards/slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useRouter } from "next/navigation";
import { selectLearn } from "@redux/learn/selectors";
import { setIndex, setLeft, setWords } from "@redux/learn/slice";

const WordCard = ({ post, handleTagClick, study, learningWords }) => {
  const contain = {
    objectFit: "contain",
  };

  const dispatch = useAppDispatch();
  const { index, left } = useAppSelector(selectLearn);
  const router = useRouter();
  let { data: session } = useSession();
  const gradients = ["green_gradient", "blue_gradient", "orange_gradient"];
  const examples = JSON.parse(post.examples);
  const tags = JSON.parse(post.tag);

  const [inDictionaryWord, setInDictionaryWord] = useState(
    session?.user.allWords.find((elem) => elem._id === post._id)
  );

  const [show, setShow] = useState(!!study);

  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  async function updateSession() {
    session = await getSession();
    setInDictionaryWord(
      session.user.allWords.find((elem) => elem._id === post._id)
    );
  }

  const handleShow = () => {
    setShow(!show);
  };

  const handleEdit = (post) => {
    router.push(`/update-card?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this card?");

    if (hasConfirmed) {
      const cardId = post._id;
      dispatch(deleteCard({ cardId }));
      dispatch(fetchAllCards());
    }
  };

  const handleAdd = async (post) => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/addCard`, {
        method: "PATCH",
        body: JSON.stringify(post),
      });

      if (response.ok) {
        console.log("word added");
        updateSession();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async (post) => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/resetCard`, {
        method: "PATCH",
        body: JSON.stringify(post),
      });

      if (response.ok) {
        console.log("word reset");
        updateSession();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKnown = async (post) => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/knownCard`, {
        method: "PATCH",
        body: JSON.stringify(post),
      });

      if (response.ok) {
        console.log("word known");
        updateSession();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (post) => {
    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/removeCard`,
        {
          method: "PATCH",
          body: JSON.stringify(post),
        }
      );

      if (response.ok) {
        console.log("word remove");
        updateSession();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className={post.image ? "prompt_card p-6 pt-56" : "prompt_card p-6"}>
      {post.image && (
        <img
          src={post.image}
          style={study && contain}
          className="prompt_card__image"
          alt="word_image"
        />
      )}
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href={"/profile/" + post.creator._id}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </Link>

          <div className="flex flex-col">
            <Link href={"/profile/" + post.creator._id}>
              <h4 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h4>
            </Link>
          </div>
        </div>

        <div className="copy_btn" onClick={handleShow}>
          <Image
            src={
              show
                ? "/assets/icons/eye-slash-solid.svg"
                : "/assets/icons/eye-solid.svg"
            }
            width={20}
            height={20}
            alt="copy"
          />
        </div>
      </div>

      <div
        className={
          get_random(gradients) + " text-4xl text-center mb-5 leading-12"
        }
      >
        {post.word}
      </div>

      {show && (
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.desc}</p>
      )}

      {show && (
        <ol className="my-4 space-y-1 list-decimal list-inside">
          {examples?.map((example, index) => (
            <li
              key={index}
              className="my-2 font-bold font-satoshi text-sm whitespace-pre-line"
            >
              {example}
            </li>
          ))}
        </ol>
      )}

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

      {show && session?.user.id === post.creator._id && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="flex gap-2  font-inter text-sm cursor-pointer btn black w-1/2"
            onClick={() => handleEdit(post)}
          >
            <Image
              src={"/assets/icons/pen-to-square-solid.svg"}
              width={20}
              height={20}
              style={{ height: "20px" }}
              alt="edit"
            />
            Edit
          </p>
          <p
            className="flex gap-2 font-inter text-sm cursor-pointer btn black w-1/2"
            onClick={() => handleDelete(post)}
          >
            <Image
              src={"/assets/icons/trash-solid.svg"}
              width={20}
              height={20}
              style={{ height: "20px" }}
              alt="edit"
            />
            Delete
          </p>
        </div>
      )}

      {show && session?.user && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="flex gap-2  font-inter text-sm cursor-pointer btn black w-1/2"
            onClick={() => handleKnown(post)}
          >
            <Image
              src={"/assets/icons/square-check-solid.svg"}
              width={20}
              height={20}
              style={{ height: "20px" }}
              alt="list"
            />
            Known
          </p>
          <p
            className="flex gap-2  font-inter text-sm cursor-pointer btn black w-1/2"
            onClick={() => handleReset(post)}
          >
            <Image
              src={"/assets/icons/arrow-rotate-left-solid.svg"}
              width={20}
              height={20}
              alt="Reset"
            />
            Reset
          </p>
        </div>
      )}

      {show && session?.user && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="flex gap-2  font-inter text-sm cursor-pointer btn black w-full"
            onClick={() => handleRemove(post)}
          >
            <Image
              src={"/assets/icons/xmark-solid.svg"}
              width={20}
              height={20}
              style={{ height: "20px" }}
              alt="list"
            />
            I don't want to learn this word
          </p>
        </div>
      )}

      {study && (
        <button
          className="btn green mt-5 w-full"
          onClick={() => handleSuccess(post)}
        >
          Next
        </button>
      )}

      {!study &&
        session?.user &&
        (inDictionaryWord ? (
          inDictionaryWord.level === 6 ? (
            <button className="btn green mt-5 w-full" disabled>
              Learned
            </button>
          ) : (
            <button className="btn blue active mt-5 w-full" disabled>
              In progress
            </button>
          )
        ) : (
          <button
            className="btn blue mt-5 w-full"
            onClick={() => handleAdd(post)}
          >
            Add to dictionary
          </button>
        ))}
    </div>
  );
};

export default WordCard;
