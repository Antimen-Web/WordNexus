import { connectToDB } from "@utils/database";
import User from "@models/user";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const learnedWords = JSON.parse(req.body);
      const id = req.query.id;

      console.log(learnedWords);

      await connectToDB();

      const userExist = await User.findById(id);

      userExist.allWords.splice(0, userExist.allWords.length, ...learnedWords);

      console.log(userExist);

      await userExist.save();

      return res.status(200).json("Learned cards added successfully");
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Failed to add learned cards");
    }
  }
}
