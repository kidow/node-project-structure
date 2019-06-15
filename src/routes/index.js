// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.json({ message: "Hello world!" });
// });

// module.exports = router;

import express from "express";
import { index } from "../controllers/index.controller";

const router = express.Router();

/* GET home page. */
router.get("/", index);

export default router;
