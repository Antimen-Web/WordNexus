import { useSession } from "next-auth/react";
import CardList from "@components/CardList";

const AllWords = () => {
  const { data: session } = useSession();
  const allWords = session?.user.allWords;

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">All words</h1>
      <p className="desc text-center">
        {allWords?.length} words {session?.user.name} wants to learn
      </p>

      <div className="feed">
        <CardList data={allWords} fetched={true} />
      </div>
    </section>
  );
};

export default AllWords;
