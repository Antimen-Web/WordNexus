import { useSession } from "next-auth/react";
import CardList from "@components/CardList";

const FromCatalog = () => {
  const { data: session } = useSession();
  const fromCatalog = session?.user.allWords?.filter(
    (word) => word.creator._id !== session.user.id
  );

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">From catalog</h1>
      <p className="desc text-center">
        {fromCatalog?.length} words {session?.user.name} wants to learn from
        catalog
      </p>

      <div className="feed">
        <CardList data={fromCatalog} fetched={true} />
      </div>
    </section>
  );
};

export default FromCatalog;
