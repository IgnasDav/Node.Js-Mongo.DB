import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const MONGO_CONNECTION_STRING = "mongodb://127.0.0.1:27017";

const mongoCLient = new MongoClient(MONGO_CONNECTION_STRING);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const connection = await mongoCLient.connect();
  const data = await connection
    .db("lecture3")
    .collection("Users")
    .find()
    .toArray();
  await connection.close();
  res.send(data);
});

app.get("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").findOne({
    id: userId,
  });
  await connection.close();
  res.send(data);
});
app.get("/userName/:name", async (req, res) => {
  const userName = req.params.name;
  console.log(userName);
  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").findOne({
    name: userName,
  });
  await connection.close();
  res.send(data);
});
app.get("/userSurname/:surname", async (req, res) => {
  const userSurname = req.params.surname;
  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").findOne({
    surname: userSurname,
  });
  await connection.close();
  res.send(data);
});
app.get("/userSurname/:surname", async (req, res) => {
  const userSurname = req.params.surname;
  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").findOne({
    surname: userSurname,
  });
  await connection.close();
  res.send(data);
});
app.get("/userRole/:role", async (req, res) => {
  const userRole = req.params.role;
  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").findOne({
    role: userRole,
  });
  await connection.close();
  res.send(data);
});
app.get("/userEmail/:email", async (req, res) => {
  const userEmail = req.params.email;
  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").findOne({
    email: userEmail,
  });
  await connection.close();
  res.send(data);
});
app.get("/usersAdmin/admin", async (req, res) => {
  const connection = await mongoCLient.connect();
  const data = await connection
    .db("lecture3")
    .collection("Users")
    .find({
      role: "admin",
    })
    .toArray();
  await connection.close();
  res.send(data);
});
app.get("/searchUser/:keyword", async (req, res) => {
  const connection = await mongoCLient.connect();
  const keyword = req.params.keyword;
  const data = await connection
    .db("lecture3")
    .collection("Users")
    .find({
      $or: [
        { name: keyword },
        { email: keyword },
        { surname: keyword },
        { role: keyword },
      ],
    })
    .toArray();
  await connection.close();
  res.send(data);
});

app.post("/users", async (req, res) => {
  //get data
  const { name, surname, email, id, role } = req.body;
  //insert data to database

  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").insertOne({
    name,
    surname,
    email,
    id,
    role,
  });
  await connection.close();

  res.send(data);
});

app.put("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  //insert data to database
  const fieldsToUpdate = {};
  if (req.body.name) {
    fieldsToUpdate["name"] = req.body.name;
  }
  if (req.body.surname) {
    fieldsToUpdate["surname"] = req.body.surname;
  }
  if (req.body.email) {
    fieldsToUpdate["email"] = req.body.email;
  }
  if (req.body.id) {
    fieldsToUpdate["id"] = req.body.id;
  }
  if (req.body.role) {
    fieldsToUpdate["role"] = req.body.role;
  }

  const connection = await mongoCLient.connect();
  const data = await connection.db("lecture3").collection("Users").updateOne(
    { id: userId },
    {
      $set: fieldsToUpdate,
    }
  );
  await connection.close();

  res.send(data);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
