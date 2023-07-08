import { CardsProps } from "../cards/types";

export interface FilterState {
  searchValue: string;
  filteredPosts: CardsProps[];
  page: number;
}
