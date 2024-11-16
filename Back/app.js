const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());

app.use(
  "/upload",
  express.static(path.join(__dirname, "upload"), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  })
);


app.use("/api/auth", authRoutes);

dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
dbConnection.once("open", () => {
  console.log("Connection ok XD");
});

module.exports = app;
