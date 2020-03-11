var express = require("express");

// var todoController = require("./controllers/todoController");

var app = express();


//view engine like php
app.set("view engine", "ejs");

//to det folder to use
app.use(express.static("./assets"));

//listening to port
app.listen("3005");
console.log("listening to port 3000");  

//fire controllers
app.get("/todo", function(req, res){
    res.render("todo");
});