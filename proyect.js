const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3500;
let db;

app.use(cors());
app.use(express.json());
app.use(express());
app.get("/ejer/A", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ email_address: { $regex: "@twitter.com" } })
      .limit(15)
      .toArray();
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});
/////////////////////////////////////////////////////////

app.use(express.json());
app.use(express());
app.get("/ejer/B", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ founded_year: { $gte: 2005 - 2008 } })
      .limit(15)
      .toArray();
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/////////////////////////////////////////////////////////

app.use(express.json());
app.use(express());
app.get("/ejer/C", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({name: {$regex: "Technorat"} })
      .limit(10)
      .toArray();
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express());
app.get("/ejer/D", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({$and: [{category_code:"advertising"}, {founded_year: 2002}]})
      .limit(10)
      .toArray();
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

//////////////////////////////////////////////////////

app.use(express.json());
app.use(express());
app.get("/ejer/E", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or:[
          {category_code: {$regex: "messaging"}},
          {category_code: {$regex: "games_video"}},
        ],
      })
      .sort({founded_year: 1})
      .limit(10)
      .toArray();
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

/////////////////////////////////////////////////

app.use(express.json());
app.use(express());
app.get("/ejer/F", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ founded_year: {$eq:parseInt("2006")}})
      .limit(10)
      .toArray();
    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://Alcreate88:aprender23@atlascluster.kkmss4u.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectado a mogoose Atlas");
    db = mongoose.connection.db;
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
