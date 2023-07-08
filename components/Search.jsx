import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setSearchValue } from "@redux/filter/slice";
import { selectFilter } from "@redux/filter/selectors";

const Search = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const { searchValue } = useAppSelector(selectFilter);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    inputRef.current?.focus();
    dispatch(setSearchValue(e.target.value));
  };

  useEffect(() => {
    setSearchText(searchValue);
  }, [searchValue]);

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
};

export default Search;
