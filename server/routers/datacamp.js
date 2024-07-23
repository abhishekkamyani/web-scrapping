const express = require("express");
const router = express.Router();
const controller = require("../controllers/datacamp");

router
  .get("/posts/:category", controller.getAllPosts)
//   .get("/post/", controller.getPost)

module.exports = router;