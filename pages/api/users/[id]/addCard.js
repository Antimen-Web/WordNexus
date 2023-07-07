import { connectToDB } from "@utils/database";
import User from "@models/user";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        try {
            const newWord = JSON.parse(req.body)
            const id = req.query.id;

            await connectToDB();

            const userExist = await User.findById(id);

            userExist.allWords.push(newWord);

            console.log(userExist);

            await userExist.save();

            return res.status(200).json("Card added successfully");

        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Failed to add card");
        }
    }
};

