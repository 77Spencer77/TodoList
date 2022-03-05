const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  var date = new Date();
  var options = {
    weekay: "long",
    month: "long",
    day: "numeric",
  };
  var today = date.toLocaleDateString("en-US", options);
  res.render("list", {
    today: today,
    items: items,
  });
  //   res.send("adasdasd");
});
app.post("/", function (req, res) {
  var task = req.body.task;
  items.push(task);
  res.redirect("/");
});

app.listen(8000, function () {
  console.log("server is running");
});
