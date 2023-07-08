import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cards from "./cards/slice";

const rootReducer = combineReducers({ filter, cards });

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
