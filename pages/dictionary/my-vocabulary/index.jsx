import { useSession } from "next-auth/react";
import CardList from "@components/CardList";

const MyVocabulary = () => {
  const { data: session } = useSession();
  const myVocabulary = session?.user.allWords?.filter(
    (word) => word.level === 6
  );

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">My Vocabulary</h1>
      <p className="desc text-center">
        {myVocabulary?.length} words learnt by {session?.user.name}
      </p>

      <div className="feed">
        <CardList data={myVocabulary} fetched={true} />
      </div>
    </section>
  );
};

export default MyVocabulary;
