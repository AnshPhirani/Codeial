const e = require("express");

const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);

  // Post.find({}, function (err, posts) {
  //   return res.render("home", { title: "Codeial | Home", posts: posts });
  // });

  // populate the user of each post
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", { title: "Codeial | Home", posts: posts });
    });

  //   return res.end("Codeial Home");
};

// module.exports.actionName = function(req, res){}
