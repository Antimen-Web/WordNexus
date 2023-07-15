import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(URI, options);
let clientPromise;

clientPromise = client.connect();

export default clientPromise;
