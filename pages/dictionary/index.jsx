import { useSession } from "next-auth/react";
import Image from "next/image";

const Dictionary = () => {
  const { data: session } = useSession();
  const allWords = session?.user.allWords;
  const addedByMe = allWords?.filter(
    (word) => word.creator._id === session.user.id
  );
  const fromCatalog = allWords?.filter(
    (word) => word.creator._id !== session.user.id
  );
  const myVocabulary = allWords?.filter((word) => word.level === 6);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">Dictionary</h1>
      <p className="desc text-center">
        {myVocabulary?.length} words learnt by {session?.user.name}
      </p>

      <div className="w-full mt-8">
        <h2 className="mb-8">Added words</h2>

        <div className="w-full flex justify-between items-center dict">
          <h3 className="m-0 flex gap-8">
            <Image
              src={"/assets/icons/clipboard-list-solid.svg"}
              width={20}
              height={20}
              alt="list"
            />
            All words
          </h3>
          <span className="flex gap-2 items-center text-xl text-gray-600">
            {allWords?.length}
            <Image
              src={"/assets/icons/chevron-right-solid.svg"}
              height={14}
              width={9}
              alt="list"
            />
          </span>
        </div>

        <div className="w-full flex justify-between items-center dict">
          <h3 className="m-0 flex gap-8">
            <Image
              src={"/assets/icons/pen-to-square-solid.svg"}
              width={20}
              height={20}
              alt="list"
            />
            Added by me
          </h3>
          <span className="flex gap-2 items-center text-xl text-gray-600">
            {addedByMe?.length}
            <Image
              src={"/assets/icons/chevron-right-solid.svg"}
              height={14}
              width={9}
              alt="list"
            />
          </span>
        </div>

        <div className="w-full flex justify-between items-center dict">
          <h3 className="m-0 flex gap-8">
            <Image
              src={"/assets/icons/user-group-solid.svg"}
              width={20}
              height={20}
              alt="list"
            />
            From catalog
          </h3>
          <span className="flex gap-2 items-center text-xl text-gray-600">
            {fromCatalog?.length}
            <Image
              src={"/assets/icons/chevron-right-solid.svg"}
              height={14}
              width={9}
              alt="list"
            />
          </span>
        </div>

        <div className="w-full flex justify-between items-center dict">
          <h3 className="m-0 flex gap-8">
            <Image
              src={"/assets/icons/square-check-solid.svg"}
              width={20}
              height={20}
              alt="list"
            />
            My vocabulary
          </h3>
          <span className="flex gap-2 items-center text-xl text-gray-600">
            {myVocabulary?.length}
            <Image
              src={"/assets/icons/chevron-right-solid.svg"}
              height={14}
              width={9}
              alt="list"
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Dictionary;
