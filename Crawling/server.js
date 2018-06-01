
//require dependencies
var express = require("express");
var bodyParser = require("body-parser");

//use host port or port 3000
var PORT = process.env.PORT || 3000;

//start express
var app = express();

//set up express router
var router = express.Router();

//require routes file
require("./config/routes")(router);

//static directory
app.use(express.static(__dirname + "/public"));

//use bodyparser
app.use(bodyParser.urlencoded({
	extended: false
}));

//send requests through router
app.use(router);

//listen on port
app.listen(PORT, function() {
	console.log("Listing on port: " + PORT);
});