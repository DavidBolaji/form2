const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const cors = require("cors");

const lgaRouter = require("./routes/lgaRoutes");
const phcbRouter = require("./routes/phcbRoutes");
const subebeRouter = require("./routes/subebRoute");
const middleRouter = require("./routes/middleRoute");
const authRouter = require("./routes/authRouter");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", lgaRouter);
app.use("/api/v1/users", middleRouter);
app.use("/api/v1/users", phcbRouter);
app.use("/api/v1/users", subebeRouter);
app.use("/api/v1/users", authRouter);

app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
});
