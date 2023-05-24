import Card from "@models/card";
import { connectToDB } from "@utils/database";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDB();

      const cards = await Card.find({}).populate("creator");

      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).send("Failed to fetch all cards");
    }
  }
};
