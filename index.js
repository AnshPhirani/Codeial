const express = require("express");
const app = express();
const port = 8000;

require("./config/mongoose");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// setup for the View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// for reading through post request (i.e form data)
app.use(express.urlencoded());

// use express router
app.use("/", require("./routes/index.js"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server: ", error);
    return;
  }
  console.log("Server is running on port: ", port);
});
