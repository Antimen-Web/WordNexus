import Card from "@models/card";
import { connectToDB } from "@utils/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDB();

      const cards = await Card.find({}).populate("creator").maxTimeMS(30000);

      return res.status(200).json(cards);
    } catch (error) {
      console.log("get cards error");
      return res.status(500).json({ error: error.message });
    }
  }
}
