import SceletonCard from "@components/sceletons/SceletonCard";
import WordCard from "@components/WordCard";
import { useAppSelector } from "@redux/hooks";
import { selectCards } from "@redux/cards/selectors";

const CardList = ({ data, handleTagClick, fetched }) => {
  let { allCardsStatus } = useAppSelector(selectCards);
  if (fetched) allCardsStatus = "ok";
  return (
    <div className="mt-16 prompt_layout">
      {allCardsStatus === "pending"
        ? [...Array(6)].map((_, i) => <SceletonCard key={i} />)
        : data?.map((post) => (
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
