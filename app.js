const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
var items = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
  name: String,
};
const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "first task",

});
const item2 = new Item({
  name: "second task",

});
const item3 = new Item({
  name: "third task",

});
const defaults = [item1, item2, item3];




app.get("/", function (req, res) {
  var date = new Date();
  var options = {
    weekay: "long",
    month: "long",
    day: "numeric",
  };
  var today = date.toLocaleDateString("en-US", options);

  Item.find({}, function (err, found) {
    if (found.length === 0) {
      Item.insertMany(defaults, function (e) {
        if (e) {
          console.log(e);
        }
        else {
          console.log("added succesfully");
        }
      });
      res.redirect("/");
    }
    else {
      res.render("list", { today: today, items: found });
    }

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
