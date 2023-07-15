const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
var items = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://77spencerradcliff77:wQl2waNcN0d1Vejy@cluster0.4rtoqlk.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("item", itemsSchema);

app.get("/", function (req, res) {
  var date = new Date();
  var options = {
    weekay: "long",
    month: "long",
    day: "numeric",
  };
  var today = date.toLocaleDateString("en-US", options);

  Item.find({}, function (err, found) {
      res.render("list", { today: today, items: found });
  });

  //   res.send("adasdasd");
});
app.post("/", function (req, res) {
  var task = req.body.task;
  const item = new Item({
    name:task,
  });
  item.save();
  res.redirect("/"); 
});

app.post("/delete",function(req,res){
  const checked_item=req.body.checkbox;
  console.log(checked_item);
  Item.findByIdAndRemove(checked_item,function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/");
      console.log("deletion successfull");
    }

  });


});

app.listen(2000, function () {
  console.log("server is running");
});
