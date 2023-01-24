require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mainAuth = require("../starter/routes/auth");
const mainJobs = require("./routes/jobs");
const connectDB = require("../starter/db/connect");
const verifing = require("../starter/middleware/authentication");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.set("trust proxy", 1);
app.use(rateLimit({ windowMs: 15 * 60 * 10000, max: 100 }));
app.use(express.json());
app.use(helmet);
app.use(cors);
app.use(xss);

app.use("/api/v1/auth", mainAuth);
app.use("/api/v1/jobs", verifing, mainJobs);

// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("m-am logat");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
