import { Schema, model, models } from "mongoose";

const CardSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  word: {
    type: String,
    required: [true, "Word is required."],
  },
  desc: {
    type: String,
    required: [true, "Description is required."],
  },
  tag: {
    type: String,
  },
  examples: {
    type: String,
  },
  image: {
    type: String,
  },
  level: {
    type: Number,
  },
  levelProgress: {
    type: Number,
  },
});

const Card = models.Card || model("Card", CardSchema);

export default Card;
