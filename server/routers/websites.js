const express = require("express");
const router = express.Router();
const controller = require("../controllers/websites");

router
    .get("/metadata", controller.getData)

module.exports = router;