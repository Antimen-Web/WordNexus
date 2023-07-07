import SceletonCard from "@components/SceletonCard";
import WordCard from "@components/WordCard";
import { useRouter } from "next/navigation";

const CardList = ({ data, handleTagClick }) => {
  const router = useRouter();
  const handleEdit = (post) => {
    router.push(`/update-card?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this card?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/card/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <WordCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
  );
};

export default CardList;
