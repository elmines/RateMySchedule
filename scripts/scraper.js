var request = require("request");
var cheerio = require("cheerio");


//Define Professor class
function Professor(name, avgRating)
{
    this.name = name;
    this.avgRating = avgRating;
}


var globalSite = "https://www.ratemyprofessors.com";


var globalProfessors = []; //Array to store professor objects
var globalProfessorsLoaded = 0;
var globalProfessorsToLoad = 0;

var getId = function(professorObject,  _processID){
	searchURL = globalSite + "/search.jsp?query=";
	var school = "massachusetts institute of technology";

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

	ratingPageURL = globalSite + "/ShowRatings.jsp?tid=";

	request(ratingPageURL + id, function(error, response, body){


			if (error) console.log(error);
			var $ = cheerio.load(body);

			$("div.quality div.grade").each(function(index){
				//console.log("Found a grade item on the screen.");
				var rating = parseFloat($(this).text());
				if (rating == NaN) rating = -1.0; //console.log(rating);
				professorObject.rating = rating;

				++globalProfessorsLoaded;
				if (globalProfessorsLoaded >= globalProfessorsToLoad) debugProfessors();

			});
	});

}


var debugProfessors = function()
{
	for (var i = 0; i < globalProfessors.length; ++i)
	{
		console.log("name=" + globalProfessors[i].name + ", rating=" + globalProfessors[i].rating);
	}
}

//Takes in the professors array, and converts it from an array of names to an array of professor objects?
var loadProfessorObjects = function(professorNames){
	for (var i  = 0; i < professorNames.length; ++i)
	{
		globalProfessors.push(new Professor(professorNames[i], -1.0));
		getId(globalProfessors[i], addRating);
	}

}

var baseFunction = function(professorNames){
	loadProfessorObjects(professorNames);
	return globalProfessors;
}


//SPENCER'S PLACE TO EDIT

console.log("MIT PROFESSOR RATINGS");
var professorNames = ["David Jerison", "Arthur Mattuck", "Cathy Drennan", "Stanley Kowalski", "Patrick Winston", "Gordon Freeman"];
globalProfessorsToLoad = professorNames.length;


outputtedProfs = baseFunction(professorNames);


