var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// --------------------
// Models
// --------------------
var todoSchema = new Schema({
  title: String,
  body: String,
  completed: Boolean
});

var Todo = mongoose.model("Todo", todoSchema);

// -------------------
// Database
// -------------------
mongoose.connect("mongodb://localhost/tododatabase");


// ----------------------
//  Middleware
// ----------------------
server.use(express.static(__dirname+"/public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// ----------------------
// Client Routes
// ----------------------
server.get("/", function(req, res){
  res.sendFile("public/index.html");
});


// ---------------------
// API Routes
// ---------------------
server.get("/api/todos", function(req, res){
  var todos = Todo.find({}, function(err, todos){
    if(err){
      console.log(err);
    }

    res.json(todos);
  })
});

server.post("/api/todos", function(req, res){
  var todo = new Todo({
    title: req.body.title,
    body: req.body.body,
    completed: req.body.completed
  });

  todo.save(function(err){
    if(err){
      console.log(err);
    }
    console.log(todo);
    res.json(todo);
  });

});

server.get("/api/todos/:name", function(req, res){
  Todo.find({name: req.params.name}, function(err, todo){
    if(err){
      console.log(err);
    }
    res.json(todo);
  });
});

server.delete("/api/todos/:id", function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    }

    res.json({message: "Successfully deleted todo"});
  });
});

server.listen(3000, function(){
  console.log("Now listening on port 3000");
});
