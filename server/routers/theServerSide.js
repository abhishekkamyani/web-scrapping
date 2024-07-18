const express = require("express");
const router = express.Router();
const controller = require("../controllers/theServerSide");

router
  .get("/posts/:category", controller.getAllPosts)
  .get("/post/:url", controller.getPost)

module.exports = router;