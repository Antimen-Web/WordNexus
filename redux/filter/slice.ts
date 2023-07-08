import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "./types";
import { CardsProps } from "../cards/types";

export const initialState: FilterState = {
  searchValue: "",
  filteredPosts: [],
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    nextPage(state) {
      state.page++;
    },
    setFilteredPosts(state, action: PayloadAction<CardsProps[]>) {
      const filtered = action.payload.filter(
        (post) =>
          post.word.toLowerCase().includes(state.searchValue.toLowerCase()) ||
          post.tag.toLowerCase().includes(state.searchValue.toLowerCase())
      );

      console.log(filtered);

      state.filteredPosts = filtered.slice(0, state.page * 6);
    },
  },
});

export const { setSearchValue, nextPage, setFilteredPosts } =
  filterSlice.actions;

export default filterSlice.reducer;
