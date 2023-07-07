import { connectToDB } from "@utils/database";
import User from "@models/user";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const word = JSON.parse(req.body);
      const id = req.query.id;

      word.level = 6;
      word.levelProgress = 0;

      await connectToDB();

      const userExist = await User.findById(id);

      const wordIndex = userExist.allWords.findIndex(
        (elem) => elem._id === word._id
      );

      userExist.allWords.splice(wordIndex, 1);

      console.log(userExist);

      await userExist.save();

      return res.status(200).json("Card known successfully");
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Failed to known card");
    }
  }
}
