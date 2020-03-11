// var todos = [{todo: "Take breakfast"},{todo: "See Node tuts"}, {todo: "practice tuts"}, {todo: "Read a journal"}];

//for post
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require("mongoose");

//connect to the db
mongoose.connect("mongodb://test:1forevernc@ds115592.mlab.com:15592/todoitems");

//creating schema(blueprint)
var schema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("Todo", schema);

module.exports = function(app){

    app.get("/todo", function(req, res){
        Todo.find({}, function(er, data){
            res.render("todo",{item: data});
            console.log(data);
            
        });
    });
    
    app.post("/todo", urlEncodedParser, function(req, res){
        var netodo = Todo(req.body).save(function(e, data){
            if(e) throw e;
            res.json(data);
            console.log(req.body);
            
        });
    });

    app.delete("/todo/:item", function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(e,data){
            if(e) throw e;
            res.json(data);
        });
    });
};