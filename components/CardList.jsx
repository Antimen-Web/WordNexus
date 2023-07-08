import SceletonCard from "@components/SceletonCard";
import WordCard from "@components/WordCard";
import { useAppSelector } from "@redux/hooks";
import { selectCards } from "@redux/cards/selectors";

const CardList = ({ data, handleTagClick }) => {
  const { allCardsStatus } = useAppSelector(selectCards);

  return (
    <div className="mt-16 prompt_layout">
      {allCardsStatus === "pending"
        ? [...Array(6)].map((_, i) => <SceletonCard key={i} />)
        : data.map((post) => (
            <WordCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
    </div>
  );
};

export default CardList;
