const { use } = require("express/lib/router");
const Job = require("../models/Job");
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(201).json(jobs);
};
const createJob = async (req, res) => {
  try {
    console.log(req.body);
    const { company, position } = req.body;
    req.body.createdBy = req.user.userId;
    const crJob = await Job.create({
      company: company,
      position: position,
      createdBy: req.user.userId,
    });
    res.status(200).json({ msg: "Job created", crJob });
  } catch (err) {
    res.status(402).json(err);
  }
};
const getAJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const getJob = await Job.findOne({ _id: jobId, createdBy: userId });
  res.status(200).json(getJob);
};
const upgradeAJob = async (req, res) => {
  // try {
  //   const { company, position } = req.body;
  //   const user = req.user.userId;
  //   const id = req.params.id;
  //   console.log(user, id);
  //   const updateJob = await Job.findByIdAndUpdate(
  //     {
  //       _id: id,
  //       company: company,
  //       position: position,
  //       createdBy: user,
  //     },
  //     { new: true, newValidators: true }
  //   );
  //   res.status(201).json({
  //     msg: `Modificari realizare de ${user}`,
  //     data: updateJob,
  //   });
  // } catch (err) {
  //   res.status(401).json(err);
  // }
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    return res.status(401).json("Provide data");
  }
  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    return res.status(401).json("Not found");
  }
  res.status(201).json({ job });
};
const deleteJob = async (req, res) => {
  console.log(req.params.id, req.user.userId);
  const deleteJob = await Job.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  res.send();
};

module.exports = {
  getAllJobs,
  createJob,
  getAJob,
  upgradeAJob,
  deleteJob,
};
