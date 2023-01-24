const {
  getAllJobs,
  createJob,
  getAJob,
  upgradeAJob,
  deleteJob,
} = require("../controllers/jobs");
const express = require("express");
const route = express.Router();

route.get("/", getAllJobs);
route.post("/", createJob);
route.delete("/:id", deleteJob);
route.patch("/:id", upgradeAJob);
route.get("/:id", getAJob);

module.exports = route;
