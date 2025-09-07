require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2dlckac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("FindRomies");
    const usersCol = database.collection("users");
    const postCol = database.collection("posts");

    app.get("/", (req, res) => {
      res.send("Hello Modarator, Wellcome to FindRommies Server.");
    });

    // user related endpoint
    app.get("/users", async (req, res) => {
      const users = await usersCol.find().toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const user = await usersCol.findOne({ _id: id });
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send(user);
      } catch (err) {
        res.status(400).send({ message: "Invalid ID format" });
      }
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const { updatedUser } = req.body;
      try {
        const query = { _id: id };
        const update = { $set: updatedUser };
        const option = {};
        const result = await usersCol.updateOne(query, update, option);
        res.send(result);
      } catch (err) {
        res.status(400).send({ message: "Something went wrong" });
      }
    });

    app.post("/users", async (req, res) => {
      const { newUser } = req.body;
      const result = await usersCol.insertOne(newUser);
      res.send(result);
    });

    // post related endpoints
    app.get("/posts", async (req, res) => {
      const query = { status: 1 };
      const result = await postCol.find(query).toArray();
      res.send(result);
    });

    app.get("/posts-limit/:limit", async (req, res) => {
      const limit = parseInt(req.params.limit);
      const query = { status: 1 };
      const result = await postCol.find(query).limit(limit).toArray();
      res.send(result);
    });

    app.get("/my-posts/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { "created_by.uid": uid };
      const result = await postCol.find(query).toArray();
      res.send(result);
    });

    app.post("/posts", async (req, res) => {
      const { newPost } = req.body;
      console.log(newPost);
      const result = await postCol.insertOne(newPost);
      res.send(result);
    });

    app.put("/posts/:id", async (req, res) => {
      const id = req.params.id;
      const { updatedPost } = req.body;

      try {
        const query = { _id: new ObjectId(id) };
        const update = { $set: updatedPost };
        const option = {};
        const result = await postCol.updateOne(query, update, option);
        res.send(result);
      } catch (err) {
        res.status(400).send({ message: "Something went wrong" });
      }
    });

    app.delete("/posts/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const query = { _id: new ObjectId(id) };
        const result = await postCol.deleteOne(query);
        res.send(result);
      } catch (err) {
        res.status(400).send({ message: "Something went wrong" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Roomies-Server is running on port: ${port}`);
});
