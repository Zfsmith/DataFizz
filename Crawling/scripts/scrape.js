//scrape script
var books = require("../data/books"); 
//import requst and cheerio
var request = require("request");
var cheerio = require("cheerio");

//array for links to listing pages
var links = [];

//count for number of pages
var count = 1;

//scrape amazon for books
var scrape = function(cb) {

	//get the html body of amazon with request
	request("https://www.amazon.co.uk/b/ref=s9_acsd_hfnv_hd_bw_b189e_ct_x_ct01_w?_encoding=UTF8&node=14159921&pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=merchandised-search-4&pf_rd_r=2FFYWEDCD6Y15Z5RFBEV&pf_rd_t=101&pf_rd_p=b644d275-5fc9-5f41-b3ee-eb0f949fdba3&pf_rd_i=269678", function(err, res, body){

		//load into cheerio
		var $ = cheerio.load(body);	
		
		//loop for listing on page
		$(".s-result-item").each(function(i, element) {

		//store the listing url
		var listing = $(this).find(".a-link-normal").attr("href");

		//push listing url to array
		links.push(listing);

		});
		count = 1;
		//loop links array
		for(i=0;i<links.length;i++){
			//request on listing page
			request(links[i], function(err, res, bodyListing){
				//load into cheerio
				var $ = cheerio.load(bodyListing);
				
				//scrape title
				var title = $("#productTitle").text().trim();
				var neatTitle = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

				//console.log(title);

				//scrape price
				var price = $(".olp-new").text().trim();
				var neatPrice = price.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
				neatPrice = neatPrice.split(" ");
				neatPrice = neatPrice[neatPrice.length-1];
				neatPrice = neatPrice.slice(1);

				//scrape description
				var description = $("#productDescription").text().trim();
				var neatDescription = description.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
 
				//scrape dimensions
				var productDimensions = $('li:contains("Product Dimensions:")').text().trim();
				var neatProductDimensions = productDimensions.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
				neatProductDimensions = neatProductDimensions.split(':')[1];
				neatProductDimensions = neatProductDimensions.slice(1);

				//scrape image
				var mainImage = $(".frontImage").attr("data-a-dynamic-image");
				mainImage = mainImage.split('"')[3];

				//create json structure and store data
				var data = {
					id: count,
					title: neatTitle,
					price: neatPrice,
					description: neatDescription,
					product_dimensions: neatProductDimensions,
					images :{
						mainImage: mainImage
					}
			 	};

			 	//push data to books array
			 	books.push(data);

			 	count++;

			 	//send json when scrape complete
			 	send();

			});
		}

		//send json when scrape is complete
		var send = function(){
			
			if(count > links.length){

				cb(books);
			}
		}

		
		
	});
}

module.exports = scrape;