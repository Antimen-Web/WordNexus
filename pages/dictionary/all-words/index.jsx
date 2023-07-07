import { useSession } from "next-auth/react";
import Image from "next/image";

const AllWords = () => {
  const { data: session } = useSession();
  const allWords = session?.user.allWords;

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">All words</h1>
      <p className="desc text-center">
        {myVocabulary?.length} words learnt by {session?.user.name}
      </p>

      <div className="w-full mt-8">
        <h2 className="mb-8">
          <Image
            src={"/assets/icons/clipboard-list-solid.svg"}
            width={20}
            height={20}
            alt="list"
          />
          Added words
        </h2>
      </div>
    </section>
  );
};

export default AllWords;
