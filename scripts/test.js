var request = require("browser-request");
var cheerio = require("cheerio");

var form = document.getElementById("main");
var button = document.getElementById("submit");

//Generate Button
button.onclick = function() {
  console.log("I SLE:FEKF");
  var class1 = document.getElementById("class1").value;
  var class2 = document.getElementById("class2").value;
  var class3 = document.getElementById("class3").value;
  var class4 = document.getElementById("class4").value;
  var class5 = document.getElementById("class5").value;

  var courses = [class1, class2, class3, class4, class5];
  var i;
  for (i = 0; i < 5; i++) {
    console.log(courses[i]);
  }
  //  for (i = 0; i < 5; i++){}
  var split = courses[0].split("-");
  var letters = split[0];
  var pageToVisit =
    "http://www.upenn.edu/registrar/timetable/" + letters + ".html";
  console.log(pageToVisit);
  request(pageToVisit, function(er, res) {
    if (er) {
      throw er;
      throw response;
      throw body;
      console.log("I hit the error." + er);
    }
    console.log("Status code:" + res.statusCode);
    console.log("Status code:" + res);
    if (res.statusCode == "200") {
      var $ = cheerio.load(body);
      console.log(body);
    }
  });
  console.log("past");
};
