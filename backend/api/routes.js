"use strict";

const router = require("express").Router();
const todoRoutes = require("./Todo/routes");
const AuthRoutes = require("./Auth/routes");

const saveErrorlogs = require("../util/saveErrorLogs");

/**
 * Import All Express Router Here
 */

router.use("/auth", AuthRoutes);
router.use("/todo", todoRoutes); // todo

router.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "NO such page exist",
  });
  saveErrorlogs(res, "No such page exist", req);
});

module.exports = router;
