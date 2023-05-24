import {useState, useEffect, useRef} from "react";

import WordCard from "@components/WordCard";
import SceletonCard from "@components/SceletonCard";

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {!data.length
          ? [...Array(6)].map((_, i) => <SceletonCard key={i} />)
          : data.map((post) => (
              <WordCard key={post._id} post={post} handleTagClick={handleTagClick} />
          ))}
    </div>
  );
};

const Feed = () => {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);

  const filterPosts = () => {
      const filtered = posts.filter(
          (post) =>
              post.word.toLowerCase().includes(searchText.toLowerCase()) ||
              post.tag.toLowerCase().includes(searchText.toLowerCase())
      );

    setFilteredPosts(filtered);
    setVisiblePosts(filtered.slice(0, page * 6));
  };

  useEffect(() => {
    filterPosts();
  }, [searchText, posts, page]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    inputRef.current?.focus();
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch("/api/card/get");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setVisiblePosts(filteredPosts.slice(0, page * 6));
  }, [filteredPosts, page]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center max-w-xl">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a word or a tag"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <CardList data={visiblePosts} handleTagClick={() => {}} />

      {visiblePosts.length < filteredPosts.length && (
          <button className="btn blue mb-10 mt-5" onClick={handleLoadMore}>
            Load More
          </button>
      )}

    </section>
  );
};

export default Feed;
