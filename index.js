const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const env = require("dotenv");

const app = express();
const PORT = 4000;

env.config();

let client;
async function main() {
  // we'll add code here soon
  const uri = process.env.DB_CONNECT;
  console.log("uri >> ", uri);
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log("client >> ", client)
  try {
    client = await client.connect();
    await app.listen(PORT, () => {
      console.log(`API listening on PORT ${PORT} `);
    });
    // await createListing(client, {
    //   first_price: {
    //     amount: "10,00,000",
    //     ticket_number: "--",
    //   },
    //   second_price: {
    //     amount: "5,00,000",
    //     ticket_number: "--",
    //   },
    //   third_price: {
    //     amount: "1,20,000",
    //     ticket_number: "--",
    //   },
    //   fourth_price: {
    //     amount: "50,000",
    //     ticket_number: "--",
    //   },
    //   fifth_price: {
    //     amount: "20,000",
    //     ticket_number: "--",
    //   },
    //   sixth_price: {
    //     amount: "15,000",
    //     ticket_number: "--",
    //   },
    //   seventh_price: {
    //     amount: "6,000",
    //     ticket_number: "--",
    //   },
    //   eight_price: {
    //     amount: "6,000",
    //     ticket_number: "--",
    //   },
    //   ninth_price: {
    //     amount: "5,000",
    //     ticket_number: "--",
    //   },
    //   tenth_price: {
    //     amount: "5,000",
    //     ticket_number: "--",
    //   },
    //   eleventh_price: {
    //     amount: "4,000",
    //     ticket_number: "--",
    //   },
    //   category: "Normal",
    //   created_at: new Date(),
    //   updated_at: new Date(),
    // });
    // await listDatabases(client);
  } catch (e) {
    console.error("error >> ", e);
  }
}

main().catch(console.error);

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/about", (req, res) => {
  res.send("This is my about route..... ");
});

app.get("/v1/results", async (req, res) => {
  // res.send("This is my about route..... ");
  const result = await getResults(client, {});
  res.send({ status: 200, data: [result] });
});

async function getResults(client, query) {
  // console.log("client >> ", client);
  const result = await client
    .db("lottery")
    .collection("results")
    .findOne({ category: "Normal" });
  console.log("results >> ", result);
  return result;
}

// Export the Express API
module.exports = app;

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function createListing(client, newListing) {
  const result = await client
    .db("lottery")
    .collection("results")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}
