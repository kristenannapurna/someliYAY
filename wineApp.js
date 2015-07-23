var wineApp = {};

//create a counter to retrieve a new page when user presses the try again button
wineApp.page = 1;
// console.log(wineApp.page);

wineApp.init = function(){
	//code to kick off app goes here
	wineApp.getwine();
	//event listener that refreshes quiz on click
	$('.tryAgain').on('click', function(e){
		e.preventDefault();
		$('h1').removeClass('tada');
		if(wineApp.page > 149){
			wineApp.page = 1;
		} else{
			wineApp.page +=1;
			
		}
		wineApp.getwine();
		// console.log(wineApp.page);
	});

}

wineApp.getwine = function(){
	//ajax call to get wine object
	$.ajax({
		url: 'http://lcboapi.com/products',
		type: 'GET',
		dataType: 'jsonp',
		headers: {
			'Authorization': "'Token MDoxZmJiOTcxOC1mOGI0LTExZTQtYjBmNS1hMzQwYjc4ODRhYTk6anlqS1VqcnFkcUFLRnVkMFZCdnJNcGR1Qnp4NlVyeUI3SmhW"
		},
		data: {
			'q': 'wine',
			'page': wineApp.page,
			'per_page': 50
		},
		success: function(result) {
			wineApp.allwine = result.result;
			wineApp.setupQuiz();
			// console.log(wineApp.allwine)
		}
	});
}

wineApp.setupQuiz = function() {
	//clear the html of previous answers
	$('.questions ul, .answers ul').html('');
	wineApp.randomWines = wineApp.refineResults(wineApp.allwine, 5);
	wineApp.shuffledAnswers = wineApp.shuffleAnswers(wineApp.randomWines.slice());
	// console.log(wineApp.randomWines);
	wineApp.buildQuestions();
	
	// wineApp.printQuiz();
}

//take the wine object and return only 5 random objects 
wineApp.refineResults = function(wines, maxWine){
	//create a new array to store 5 random index values
	var randomIndex = [];
	var newWines = [];
	//while the array is less than maxwine, push unique random numbers to it. 
	while(newWines.length < maxWine){
		//generate a random number from the length of our wine array
		var rando = Math.floor(Math.random()*wines.length);
			//add the new random number to the array
			if(randomIndex.indexOf(rando) == -1 && wines[rando]['tasting_note'] != null && wines[rando]['varietal'] != null	){
				randomIndex.push(rando);
				wines[rando].questionIndex = newWines.length;
				newWines.push(wines[rando]);

			}
		}	
		return newWines;
	}

	wineApp.buildQuestions = function(){
		for (i = 0; i < wineApp.randomWines.length; i++){
			var wine_name = wineApp.randomWines[i]['name'];
			var tasting_note = wineApp.shuffledAnswers[i]['tasting_note'];
			var varietal = wineApp.randomWines[i]['varietal'];
			var origin = wineApp.randomWines[i]['origin'];
			var answerClass = wineApp.shuffledAnswers[i]['questionIndex'];


		//make different colour wine svg based on some keywords
		if(varietal.indexOf('Pinot Grigio') != -1 || wine_name.indexOf('Pinot Grigio') != -1 || varietal.indexOf('Sauvignon Blanc') != -1 || wine_name.indexOf('White') != -1 || varietal.indexOf('Chardonnay') != -1 || varietal.indexOf('Vidal') != -1 || wine_name.indexOf('Blanc') != -1 || varietal.indexOf('Riesling') != -1 || varietal.indexOf('Soave') != -1 || varietal.indexOf('Sparkling') != -1||varietal.indexOf('Prosecco') != -1 ||wine_name.indexOf('Hochtaler') != -1 ||varietal.indexOf('Gewürztraminer') != -1 ){
			var svg = '<svg id="Layer_1" x="0px" y="0px" width="100.0px" height="100px" viewBox="25.6 -51.2 512.0 691.2" enable-background="new 0 0 512 512" xml:space="preserve"><path class="wine" fill="#EFE8AE" d="M351.994,480h-80V318.469c34.938-3.563,67.656-17.906,93.219-42.594  c60.313-58.297,64.375-207.5,7.375-270.594L367.807,0H144.15l-4.766,5.281C82.4,68.375,86.494,217.594,146.807,275.875  c25.531,24.688,58.25,39.031,93.188,42.594V480h-80c-8.844,0-16,7.156-16,16s7.156,16,16,16h80h32h80c8.844,0,16-7.156,16-16  S360.838,480,351.994,480z M158.76,32h194.453c41.063,53.766,36.406,175.797-10.25,220.859  c-46.844,45.266-127.047,45.328-173.906,0.016C122.4,207.797,117.697,85.766,158.76,32z M180.182,241.375  c-23.313-22.531-34.594-68.828-33.313-113.375h218.25c1.313,44.563-9.969,90.844-33.281,113.359  C293.119,278.813,218.916,278.813,180.182,241.375z"/></svg>';
		} else if (varietal.indexOf('Merlot') != -1 || varietal.indexOf('Cabernet Sauvignon') != -1 || varietal.indexOf('Sangiovese') != -1 || wine_name.indexOf('Red') != -1 || varietal.indexOf('Montepulciano') != -1 || varietal.indexOf('Ripasso') != -1 || varietal.indexOf('Chianti') != -1 || wine_name.indexOf('Rouge') != -1 || varietal.indexOf("Grenache") != -1 || varietal.indexOf("Shiraz") != -1||  wine_name.indexOf('Cabernet') != -1||  wine_name.indexOf('Merlot') != -1 || varietal.indexOf('Moscato') != -1 || wine_name.indexOf('Rosso') != -1 || varietal.indexOf('Pinot Noir') != -1 ){
			var svg = '<svg id="Layer_1" x="0px" y="0px" width="100.0px" height="100px" viewBox="25.6 -51.2 512.0 691.2" enable-background="new 0 0 512 512" xml:space="preserve"><path class="wine" fill="#B53E3E" d="M351.994,480h-80V318.469c34.938-3.563,67.656-17.906,93.219-42.594  c60.313-58.297,64.375-207.5,7.375-270.594L367.807,0H144.15l-4.766,5.281C82.4,68.375,86.494,217.594,146.807,275.875  c25.531,24.688,58.25,39.031,93.188,42.594V480h-80c-8.844,0-16,7.156-16,16s7.156,16,16,16h80h32h80c8.844,0,16-7.156,16-16  S360.838,480,351.994,480z M158.76,32h194.453c41.063,53.766,36.406,175.797-10.25,220.859  c-46.844,45.266-127.047,45.328-173.906,0.016C122.4,207.797,117.697,85.766,158.76,32z M180.182,241.375  c-23.313-22.531-34.594-68.828-33.313-113.375h218.25c1.313,44.563-9.969,90.844-33.281,113.359  C293.119,278.813,218.916,278.813,180.182,241.375z"/></svg>';
		} else if (varietal.indexOf('Rosé') != -1 ||  wine_name.indexOf('Wild Vines') != -1 || varietal.indexOf('Flavoured Wine') != -1 ){
			var svg = '<svg id="Layer_1" x="0px" y="0px" width="100.0px" height="100px" viewBox="25.6 -51.2 512.0 691.2" enable-background="new 0 0 512 512" xml:space="preserve"><path class="wine" fill="#E6A6CB" d="M351.994,480h-80V318.469c34.938-3.563,67.656-17.906,93.219-42.594  c60.313-58.297,64.375-207.5,7.375-270.594L367.807,0H144.15l-4.766,5.281C82.4,68.375,86.494,217.594,146.807,275.875  c25.531,24.688,58.25,39.031,93.188,42.594V480h-80c-8.844,0-16,7.156-16,16s7.156,16,16,16h80h32h80c8.844,0,16-7.156,16-16  S360.838,480,351.994,480z M158.76,32h194.453c41.063,53.766,36.406,175.797-10.25,220.859  c-46.844,45.266-127.047,45.328-173.906,0.016C122.4,207.797,117.697,85.766,158.76,32z M180.182,241.375  c-23.313-22.531-34.594-68.828-33.313-113.375h218.25c1.313,44.563-9.969,90.844-33.281,113.359  C293.119,278.813,218.916,278.813,180.182,241.375z"/></svg>';
		} else{
			var svg = '<svg id="Layer_1" x="0px" y="0px" width="100.0px" height="100px" viewBox="25.6 -51.2 512.0 691.2" enable-background="new 0 0 512 512" xml:space="preserve"><path class="wine" fill="#000000" d="M351.994,480h-80V318.469c34.938-3.563,67.656-17.906,93.219-42.594  c60.313-58.297,64.375-207.5,7.375-270.594L367.807,0H144.15l-4.766,5.281C82.4,68.375,86.494,217.594,146.807,275.875  c25.531,24.688,58.25,39.031,93.188,42.594V480h-80c-8.844,0-16,7.156-16,16s7.156,16,16,16h80h32h80c8.844,0,16-7.156,16-16  S360.838,480,351.994,480z M158.76,32h194.453c41.063,53.766,36.406,175.797-10.25,220.859  c-46.844,45.266-127.047,45.328-173.906,0.016C122.4,207.797,117.697,85.766,158.76,32z M180.182,241.375  c-23.313-22.531-34.594-68.828-33.313-113.375h218.25c1.313,44.563-9.969,90.844-33.281,113.359  C293.119,278.813,218.916,278.813,180.182,241.375z"/></svg>';
		}

		//print the data from the random wines in the appropriate sections on the page
		$('.questions ul').append("<li id='" + i + "'>"+svg +"<h2>"+wine_name+ "</h2><h3>"+varietal+"</h3><h4> Origin: "+origin+"</h4></li>");
		$('.answers ul').append("<li id='" + answerClass + "'>" + tasting_note + "</li>");

	}
	// wineApp.shuffleAnswers();
	wineApp.gamePlay();
	
}

wineApp.shuffleAnswers = function(array){
	var arrayLength = array.length, t, i;
	//While there are still elements to shuffle...
	while (arrayLength){
		//pick a remaining element
		i = Math.floor(Math.random()*arrayLength--);
		//and swap it with the current element.
		t = array[arrayLength];
		array[arrayLength] = array[i];
		array[i] = t;
	}

	// console.log(array);	
	return array;
	
}


//jquery UI stuff

wineApp.gamePlay = function(){
	$('.answers ul li').draggable({
		cursor: 'move'
	});

	$('.questions ul li').droppable({
		accept: '.answers ul li',
		tolerance: "pointer",
		hoverClass: 'drop-hover',
		drop: function(event, ui){
			$(this).addClass('dropped');
			var questionIndex = $(this).attr('id');
			var answerIndex = ui.draggable.attr('id');
			if (questionIndex === answerIndex){
				ui.draggable.addClass('correct');
			}


		}
	});

		//check for win each time a card is placed somewhere
		$('.answers ul li').on('dragstop', function(){
			var points = $('.correct').length;
			if(points === 5){
				console.log("WIN!")
				$('.change').text('YAY!');
				$('h1').addClass('tada')
			} 
		});
}


$(function(){
	// console.log('yo');
	wineApp.init();
});