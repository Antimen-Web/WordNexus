import { useSession } from "next-auth/react";
import CardList from "@components/CardList";

const AddedByMe = () => {
  const { data: session } = useSession();
  const addedByMe = session?.user.allWords?.filter(
    (word) => word.creator._id === session.user.id
  );

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">Added by me</h1>
      <p className="desc text-center">
        {addedByMe?.length} words added by {session?.user.name}
      </p>

      <div className="feed">
        <CardList data={addedByMe} fetched={true} />
      </div>
    </section>
  );
};

export default AddedByMe;
