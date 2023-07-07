import React from "react";
import { useRef, useState } from "@node_modules/react";

function Search() {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    inputRef.current?.focus();
  };

  return (
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
  );
}

export default Search;
