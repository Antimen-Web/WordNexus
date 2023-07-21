import { CardsProps } from "../cards/types";

export interface LearnState {
  learningWords: CardsProps[];
  completedWords: CardsProps[];
  index: number;
  left: number;
  number: number;
}
