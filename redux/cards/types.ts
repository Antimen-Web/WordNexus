export type CardsProps = {
  _id: Object;
  creator: Object;
  word: string;
  desc: string;
  tag: string;
  examples: string;
  image: string;
  level: number;
  levelProgress: number;
  __v: number;
};

export enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface CardsState {
  allCards: CardsProps[];
  allCardsStatus: Status;
  oneCard: CardsProps;
  oneCardStatus: Status;
  updateStatus: Status;
  createStatus: Status;
  deleteStatus: Status;
}
