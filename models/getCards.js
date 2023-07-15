import clientPromise from "@models/index";

let client, db, cards;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    cards = await db.collection("cards");
  } catch (error) {
    throw new Error("Failed to stablish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getCards() {
  try {
    if (!cards) await init();
    const result = await cards.find({});

    return { cards: result };
  } catch (error) {
    return { error: "Failed to fetch cards" };
  }
}
