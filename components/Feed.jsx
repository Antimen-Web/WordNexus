import { useEffect } from "react";
import CardList from "@components/CardList";
import { Study } from "@utils/study";
import Search from "@components/Search";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectFilter } from "@redux/filter/selectors";
import {
  setFilteredPosts,
  setSearchValue,
  nextPage,
} from "@redux/filter/slice";
import { selectCards } from "@redux/cards/selectors";
import { fetchAllCards } from "@redux/cards/slice";

const Feed = () => {
  const dispatch = useAppDispatch();
  const { searchValue, filteredPosts, page } = useAppSelector(selectFilter);
  const { allCards } = useAppSelector(selectCards);

  useEffect(() => {
    dispatch(setFilteredPosts(allCards));
  }, [searchValue, allCards, page]);

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  useEffect(() => {
    dispatch(fetchAllCards());
  }, []);

  return (
    <section className="feed">
      <Search />

      <CardList
        data={filteredPosts}
        handleTagClick={(tag) => {
          dispatch(setSearchValue(tag));
        }}
      />

      {page < allCards.length / 6 && (
        <button className="btn blue mb-10 mt-5" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default Feed;
