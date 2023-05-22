import { connectToDB } from "@utils/database";
import Card from "@models/card";
import multiparty from "multiparty";
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

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
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
      return;
    }

    const { userId, word, desc, tag } = fields;
    const imageFile = files.image;

    try {
      let imageUrl = "";
      if(imageFile) {
        const { path, originalFilename } = imageFile[0];

        const res = await cloudinary.uploader.upload(path, {
          public_id: originalFilename,
          width: 324,
          height: 208,
          crop: 'fill',
          unique_filename: false,
          overwrite: true
        });

        imageUrl = res.url;

      }

      // Connect to the MongoDB database
      await connectToDB();

      const newCard = new Card({
        word: word[0],
        creator: userId[0],
        desc: desc[0],
        tag: tag[0],
        image: imageFile ? imageUrl : "" ,
      });

      await newCard.save();

      res.status(200).json({ message: "Card created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
}
