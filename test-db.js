const { MongoClient, ServerApiVersion } = require('mongodb');

const username = "opjahidulislam_db_user";
const password = "2mXM1E6x3SfDZRj9"; // No special chars, so no encoding needed usually, but good practice
const cluster = "albarakahmart.wvbvhwa.mongodb.net";
const uri = `mongodb+srv://${username}:${password}@${cluster}/?appName=Albarakahmart`;

console.log("Connecting to:", uri.replace(password, "****"));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        console.log("Attempting to connect...");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
