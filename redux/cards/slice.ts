import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { CardsProps, CardsState, Status } from "./types";
import axios from "axios";

const defaultCard: CardsProps = {
  _id: {},
  creator: {},
  word: "",
  desc: "",
  tag: '[""]',
  examples: '[""]',
  image: "",
  level: 0,
  levelProgress: 0,
  __v: 0,
};

export const fetchAllCards = createAsyncThunk<CardsProps[]>(
  "users/fetchAllCardsStatus",
  async () => {
    try {
      const { data } = await axios.get<CardsProps[]>("/api/card/get");
      return data;
    } catch (error) {
      console.error("Error while fetching cards: ", error);
    }
  }
);

export const fetchOneCard = createAsyncThunk<CardsProps, { cardId: string }>(
  "users/fetchOneCardStatus",
  async ({ cardId }) => {
    try {
      const { data } = await axios.get<CardsProps>(`/api/card/${cardId}`);
      return data;
    } catch (error) {
      console.error("Error while fetching card: ", error);
    }
  }
);

export const updateCard = createAsyncThunk<
  CardsProps,
  { formData: FormData; cardId: string }
>("users/updateCardStatus", async ({ formData, cardId }) => {
  try {
    const { data } = await axios.patch<CardsProps>(
      `/api/card/${cardId}`,
      formData
    );

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createCard = createAsyncThunk<CardsProps, { formData: FormData }>(
  "users/createCardStatus",
  async ({ formData }) => {
    try {
      const { data } = await axios.post<CardsProps>("/api/card/new", formData);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCard = createAsyncThunk<CardsProps, { cardId: string }>(
  "users/deleteCardStatus",
  async ({ cardId }) => {
    try {
      const { data } = await axios.delete<CardsProps>(`/api/card/${cardId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: CardsState = {
  allCards: [],
  allCardsStatus: Status.PENDING,
  oneCard: defaultCard,
  oneCardStatus: Status.PENDING,
  updateStatus: Status.PENDING,
  createStatus: Status.PENDING,
  deleteStatus: Status.PENDING,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setAllCards(state, action) {
      state.allCards = action.payload;
    },
    setOneCard(state, action) {
      state.oneCard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCards.pending, (state) => {
      state.allCardsStatus = Status.PENDING;
      state.allCards = [];
    });
    builder.addCase(
      fetchAllCards.fulfilled,
      (state, action: PayloadAction<CardsProps[]>) => {
        state.allCardsStatus = Status.FULFILLED;
        state.allCards = action.payload;
      }
    );
    builder.addCase(fetchAllCards.rejected, (state) => {
      state.allCardsStatus = Status.REJECTED;
      state.allCards = [];
    });

    builder.addCase(fetchOneCard.pending, (state) => {
      state.oneCardStatus = Status.PENDING;
      state.oneCard = defaultCard;
    });
    builder.addCase(
      fetchOneCard.fulfilled,
      (state, action: PayloadAction<CardsProps>) => {
        state.oneCardStatus = Status.FULFILLED;
        state.oneCard = action.payload;
      }
    );
    builder.addCase(fetchOneCard.rejected, (state) => {
      state.oneCardStatus = Status.REJECTED;
      state.oneCard = defaultCard;
    });

    builder.addCase(updateCard.pending, (state) => {
      state.updateStatus = Status.PENDING;
    });
    builder.addCase(updateCard.fulfilled, (state) => {
      state.updateStatus = Status.FULFILLED;
    });
    builder.addCase(updateCard.rejected, (state) => {
      state.updateStatus = Status.REJECTED;
    });

    builder.addCase(createCard.pending, (state) => {
      state.updateStatus = Status.PENDING;
    });
    builder.addCase(createCard.fulfilled, (state) => {
      state.updateStatus = Status.FULFILLED;
    });
    builder.addCase(createCard.rejected, (state) => {
      state.updateStatus = Status.REJECTED;
    });

    builder.addCase(deleteCard.pending, (state) => {
      state.deleteStatus = Status.PENDING;
    });
    builder.addCase(deleteCard.fulfilled, (state) => {
      state.deleteStatus = Status.FULFILLED;
    });
    builder.addCase(deleteCard.rejected, (state) => {
      state.deleteStatus = Status.REJECTED;
    });
  },
});

export const { setAllCards, setOneCard } = cardsSlice.actions;

export default cardsSlice.reducer;
