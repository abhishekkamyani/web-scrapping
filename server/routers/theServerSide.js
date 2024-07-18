const express = require("express");
const router = express.Router();
const controller = require("../controllers/theServerSide");

router
  .get("/:category", controller.getAllPosts)

module.exports = router;