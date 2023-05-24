import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const WordCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const gradients = ["green_gradient", "blue_gradient", "orange_gradient"];

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  return (
    <div className={post.image ? "prompt_card p-6 pt-56" : "prompt_card p-6"}>
        {post.image && (
            <img src={post.image}
                 className='prompt_card__image'
                 alt="word_image"/>

        )}
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
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

      <h1 className={get_random(gradients) + " text-4xl text-center mb-5 leading-12"}>
        {post.word}
      </h1>

      {show && (
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.desc}</p>
      )}

      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default WordCard;
