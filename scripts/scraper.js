var request = require("request");
var cheerio = require("cheerio");


//Define Professor class
function Professor(name, avgRating)
{
    this.name = name;
    this.avgRating = avgRating;
}


var site = "https://www.ratemyprofessors.com";
var school = "harvard";
var professors = []; //Array to store professor objects

var getId = function(professorObject,  _processID){
	searchURL = site + "/search.jsp?query=";
	//console.log("professorObject.name = " + professorObject.name);

	request(searchURL + professorObject.name.replace(' ', '+'), function(error, response, body){
		if (error) console.log(error);
		var $ = cheerio.load(body);
		var found = false;

		$("li.PROFESSOR").each(function(index){

			if (!found){

				var harvardProfessor = $(this).find("span.sub").text().toLowerCase().startsWith(school); 
				if (harvardProfessor){
					found = true;

					var link = $(this).find("a").attr("href"); 
					var id = link.substr(link.indexOf('=') + 1);
					_processID(professorObject, id);
				}
			}
		});
	});
}



var addRating = function(professorObject, id/*, _callback*/)
{

	//console.log("addRating: Made request for professorObject.name = " + professorObject.name + ", id = " + id);

	ratingPageURL = site + "/ShowRatings.jsp?tid=";

	request(ratingPageURL + id, function(error, response, body){


			if (error) console.log(error);
			var $ = cheerio.load(body);

			$("div.quality div.grade").each(function(index){
				//console.log("Found a grade item on the screen.");
				var rating = parseFloat($(this).text());
				if (rating == NaN) rating = -1.0;
				//console.log(rating);
				professorObject.rating = rating;

				debugProfessors();

			});
	});

}


var debugProfessors = function()
{
	for (var i = 0; i < professors.length; ++i)
	{
		console.log("professors[" + i + "]: name=" + professors[i].name + ", rating=" + professors[i].rating);
	}
}

//Takes in the professors array, and converts it from an array of names to an array of professor objects?
var loadProfessorObjects = function(professorNames){
	for (var i  = 0; i < professorNames.length; ++i)
	{
		professors.push(new Professor(professorNames[i], -1.0));
		getId(professors[i], addRating);
	}

}

var baseFunction = function(professorNames){
	loadProfessorObjects(professorNames);
	return professors;
}

var professorNames = ["Michael Porter", "Howard Gardner"];//["David Cordes", "Brandon Dixon"];
outputtedProfs = baseFunction(professorNames);


for (var i = 0; i < outputtedProfs.length; ++i)
{
	console.log(outputtedProfs[i].name + "-->" + outputtedProfs[i].rating);
}
