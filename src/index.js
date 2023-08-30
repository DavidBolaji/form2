const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");

// const lgaRouter = require("./routes/lgaRoutes");
// const phcbRouter = require("./routes/phcbRoutes");
// const subebeRouter = require("./routes/subebRoute");
// const middleRouter = require("./routes/middleRoute");
// const authRouter = require("./routes/authRouter");
const lgaRouter = require("./routes/mongo/lgaRouter");
const phcbRouter = require("./routes/mongo/phcbRouter");
const subebeRouter = require("./routes/mongo/subebRouter");
const middleRouter = require("./routes/mongo/middleRouter");
const authRouter = require("./routes/mongo/authRouter");
const morgan = require("morgan");
const path = require("path");
const con = require("./db/mongoose");

const PORT = process.env.PORT || 5000;

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(
  cors({
    origin: "*",
  })
);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :response-time ms :date[web] - :body\n", {
    stream: accessLogStream,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/log", (req, res) => {
  const filePath = path.join(__dirname, "access.log"); // Update with your file's path

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      res.status(500).send("An error occurred while reading the file.");
    } else {
      res.send(data);
    }
  });
});
con();
app.use("/api/v1/users", lgaRouter);
app.use("/api/v1/users", middleRouter);
app.use("/api/v1/users", phcbRouter);
app.use("/api/v1/users", subebeRouter);
app.use("/api/v1/users", authRouter);

app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
});
