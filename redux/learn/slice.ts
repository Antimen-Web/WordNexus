import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LearnState } from "./types";
import { CardsProps } from "../cards/types";

const initialState: LearnState = {
  learningWords: undefined,
  completedWords: [],
  index: 0,
  left: 15,
  number: 5,
};

export const learnSlice = createSlice({
  name: "learn",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setLeft: (state, action: PayloadAction<number>) => {
      state.left = action.payload;
    },
    setWords: (state, action: PayloadAction<CardsProps[]>) => {
      state.learningWords = action.payload;
    },
  },
});

export const { setIndex, setLeft, setWords } = learnSlice.actions;

export default learnSlice.reducer;
