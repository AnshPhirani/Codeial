const express = require("express"); // same instance
const passport = require("passport");

const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", passport.checkAuthentication, homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;
