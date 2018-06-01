var books = require("../data/books"); 
var booksController = require("../controllers/booksController");

module.exports = function(router) {

//Default route
	router.get("/", function(req, res){
		res.sendFile(path.join(public, 'index.html'));
	});

//scrape route
	router.get("/api/fetch", function(req, res){
		//start scrape
		booksController.fetch(function(books){
			
			//send results to page (print in browser console)
			res.send(books);
		})
	});

	//api route
	router.get("/api",function(req, res){

		//send json to page
		res.json(books);
	});

};