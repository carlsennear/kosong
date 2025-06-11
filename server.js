require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const Tracker = require("./model");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.post("/upload", async (req, res) => {
  const { latitude, longitude, photo } = req.body;

  try {
    const newData = new Tracker({ latitude, longitude, photo });
    await newData.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("❌ Error saving data:", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
