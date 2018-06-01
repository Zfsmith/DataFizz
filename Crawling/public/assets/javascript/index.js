$(document).ready(function() {

//scrape button
	$(document).on("click", "#scrape", function(){
		$("#apiButton").html("<img src='./assets/images/Spinner-1s-122px.svg'>")
		startScrape();
	});

	function startScrape(){

		$.get("/api/fetch")
		.then(function(data){



			console.log(data);

			//add api button after scrape is finished
			$("#apiButton").html("<a type='button' class='btn btn-primary' href='/api'>view api</a>");

		});
	}	
});