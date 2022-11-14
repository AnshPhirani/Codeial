const e = require("express");

module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("user_id", 25);
  return res.render("home", { title: "home" });
  //   return res.end("Codeial Home");
};

// module.exports.actionName = function(req, res){}
