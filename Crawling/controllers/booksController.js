// controller for books

//import scrape script
var scrape = require("../scripts/scrape");

module.exports = {
	fetch: function(cb) {
		//run scrape
		scrape(function(data){

			
			cb(data);

		});
	}
}