const { MongoClient } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

// const mongoose = require("mongoose");
const express = require("express");
const app = express();

console.log("url >> ", process.env.DB_CONNECT);
//connection to db
// mongoose.set("useFindAndModify", false);
// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//   console.log("Connected to db!");
//   app.listen(3000, () => console.log("Server Up and running"));
// });

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://balutarock71117:dXveUc29e29yk3K5@lottery.mfxrtrw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    app.listen(3001, () => console.log("Server Up and running 3001"));

    // const db = client.db(dbName);

    // // Use the collection "people"
    // const col = db.collection("people");

    // // Construct a document
    // let personDocument = {
    //   name: { first: "Alan", last: "Turing" },
    //   birth: new Date(1912, 5, 23), // May 23, 1912
    //   death: new Date(1954, 5, 7), // May 7, 1954
    //   contribs: ["Turing machine", "Turing test", "Turingery"],
    //   views: 1250000,
    // };

    // // Insert a single document, wait for promise so we can read it back
    // const p = await col.insertOne(personDocument);
    // // Find one document
    // const myDoc = await col.findOne();
    // // Print to the console
    // console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("app is running");
});
