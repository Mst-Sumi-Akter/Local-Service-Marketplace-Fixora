const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;
const collectionName = {
    SERVICE: "services",
    USER : "users",
};

const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export async function dbConnect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        return { db, collectionName };
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};