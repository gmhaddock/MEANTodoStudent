var express = require("express");
var server = express();


server.use(express.static(__dirname+"/public"));


server.get("/", function(req, res){
  res.sendFile("public/index.html");
});


server.listen(3000, function(){
  console.log("Now listening on port 3000");
});
