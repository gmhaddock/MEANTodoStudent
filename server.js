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
server.get("/api/todos", function(req, res){});

server.post("/api/todos", function(req, res){});

server.get("/api/todos/:id", function(req, res){});

server.delete("/api/todos/:id", function(req, res){});

server.listen(3000, function(){
  console.log("Now listening on port 3000");
});
