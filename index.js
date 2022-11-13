const express = require("express");
const app = express();
const port = 8000;

// use express router
app.use("/", require("./routes/index.js"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server: ", error);
    return;
  }
  console.log("Server is running on port: ", port);
});
