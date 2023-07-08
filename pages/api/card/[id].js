import Card from "@models/card";
import { connectToDB } from "@utils/database";
import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "drhtyonlm",
  api_key: "526287177955258",
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Отключение автоматического разбора тела запроса
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectToDB();

      const card = await Card.findById(req.query.id).populate("creator");
      if (!card) return res.status(404).send("Card Not Found");

      return res.status(200).json(card);
    } catch (error) {
      return res.status(500).send("Internal Server Error kek");
    }
  } else if (req.method === "PATCH") {
    try {
      const form = new multiparty.Form();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
          return;
        }

        const { word, desc, tag, examples } = fields;
        const imageFile = files.image;

        await connectToDB();

        const existingCard = await Card.findById(req.query.id);

        if (imageFile) {
          const { path, originalFilename } = imageFile[0];

          const res = await cloudinary.uploader.upload(path, {
            public_id: originalFilename,
            width: 324,
            height: 208,
            crop: "fill",
            unique_filename: false,
            overwrite: true,
          });

          existingCard.image = res.url;
        }

        if (!existingCard)
          return new Response("Card not found", { status: 404 });

        existingCard.word = word[0];
        existingCard.desc = desc[0];
        existingCard.tag = tag[0];
        existingCard.examples = examples[0];

        await existingCard.save();

        return res.status(200).json(existingCard);
      });
    } catch (error) {
      return res.status(500).send("Failed to update card");
    }
  } else if (req.method === "DELETE") {
    try {
      await connectToDB();

      await Card.findByIdAndRemove(req.query.id);

      res.status(200).send("Card deleted successfully");
    } catch (error) {
      res.status(500).send("Failed to delete card");
    }
  }
}
