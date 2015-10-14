##MEANTodo

_First thing:_
```

npm init


```

which sets up our npm project. Just accept the default values to get a package.json
file created.


####Step 1: Getting our server up and running:
In order to get started, we need to get a few things up and running. Let's have
our server serve up some static files:

#####Obtain the appropriate node modules:

```

npm install express mongoose body-parser --save


```
This will use npm to go get the packages that you need for our server and install
those locally so that node can use them. The flag "--save" saves information
about those modules to package.json so others can know what you are using as well
as so you can restore your project if need be.
**If you have trouble about you may have to use "sudo"**.

#####Write a basic static file server:
Add the following code to the beginning of your **server.js** file.

```js

var express = require("express");
var server = express();


server.use(express.static(__dirname+"/public"));

server.get("/",function(req,res){
  res.sendFile("public/index.html");
});

server.listen(3000, function(){
  console.log("Now listening on port 3000...");
});

```

Now if we run:

```

node server.js

```

then we will be able to go to--> localhost:3000 and see an application.

Not everything works at current time. That is okay, we need to fix some of these
things.


####Step 2: Adding database accessibility...

#####Adding API routes for data.
Adding the following code into our server file will set up our API routes.
However, we are just going to use some dummy data to check things out.

```js


server.use(bodyParser.json());
server.use(bodyParse.urlencoded({extended: true}));

// ... code


// ----------
// API Routes
// -----------

server.get("/api/todos", function(req, res){
  res.json({message: "get some todos"}); //THIS LINE WILL BE REPLACED!
});

server.post("/api/todos", function(req, res){
  res.json(message: "posting todos!"); //THIS LINE WILL BE REPLACED!
});

server.get("/api/todos/:id", function(req, res){
  res.json({message: "get a specific todo", id: req.params.id}); //THIS LINE WILL BE REPLACED!
});

server.delete("/api/todos/:id", function(req, res){
  res.json({message:"deleting a specific todo", id: req.params.id});
});

server.listen(3000, function(){
  console.log("Now listening on port 3000...");
});


```

The above is an update to your server file. You should be able to use these routes
to "manipulate" data. Currently, they do nothing, but we could use these to do something
to the mongo DB that we are going to connect to:

**Let's check in with our current server.js file:**

```js

var express = require("express");
var server = express();


server.use(express.static(__dirname+"/public"));
server.use(bodyParser.json());
server.use(bodyParse.urlencoded({extended: true}));

// ----------------
// Client Routes
// ----------------

server.get("/",function(req,res){
  res.sendFile("public/index.html");
});

// ----------
// API Routes
// -----------

server.get("/api/todos", function(req, res){
  res.json({message: "get some todos"}); //THIS LINE WILL BE REPLACED!
});

server.post("/api/todos", function(req, res){
  res.json(message: "posting todos!"); //THIS LINE WILL BE REPLACED!
});

server.get("/api/todos/:id", function(req, res){
  res.json({message: "get a specific todo", id: req.params.id}); //THIS LINE WILL BE REPLACED!
});

server.delete("/api/todos/:id", function(req, res){
  res.json({message:"deleting a specific todo", id: req.params.id}); //THIS LINE WILL BE REPLACED!
});

server.listen(3000, function(){
  console.log("Now listening on port 3000...");
});


```
##### Adding the mongoose module and other things...

Let's update our server file to have the following contents:

```js

var express = require("express");
var server = express();
var bodyParser = require("body-parser");
//This is the node module that we will use to interact with MongoDB
var mongoose = require("mongoose");
//This is a functionality from mongoose that we will use to create a model
var Schema = mongoose.Schema;

// --------------------
// Models
// --------------------

//This is the "definition" of a Todo. This describes what a Todo is.
var todoSchema = new Schema({
  title: String,
  body: String
});

//We are using the Schema to create the Todo model. We are defining what our
// todo "looks and behaves" like
var Todo = mongoose.model("Todo", todoSchema);

// -------------------
// Database
// -------------------
//We are using mongoose to connect to the mongo database
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
  //We are querying the mongoDB to find all of the todos stored
  var todos = Todo.find({}, function(err, todos){
    if(err){
      console.log(err);
    }

    res.json(todos);
  })
});

server.post("/api/todos", function(req, res){
  //This is creating a new Todo using our mongoose model.
  var todo = new Todo({
    title: req.body.title,
    body: req.body.body
  });

  //The mongoose model has functions attached to it. We are calling save on the
  // model to the database that we are connected to
  todo.save(function(err){
    if(err){
      console.log(err);
    }
    console.log(todo);
    res.json(todo);
  });

});

server.get("/api/todos/:id", function(req, res){
  //We are now finding a specific todo with an id.
  Todo.find({id: req.params.id}, function(err, todo){
    if(err){
      console.log(err);
    }
    res.json(todo);
  });
});

server.delete("/api/todos/:id", function(req, res){
  //This is finding the specific todo and deleting it.
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


```

All of the code above allows us to interact with a Mongo database using the
HTTP routes. This is a brief introduction that you will need to dive into.





**You should take some time when you are complete with this to look back through
the front end of the application to make sure that you understand all of that is
happening.**
