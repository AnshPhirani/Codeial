const express = require("express"); // same instance

const router = express.Router();

const usersController = require("../controllers/users_controller");
router.get("/profile", usersController.profile);
router.get("/upload_photo", usersController.uploadPhoto);

module.exports = router;
