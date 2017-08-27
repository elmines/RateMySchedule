//var request = require("browser-request");
//var cheerio = require("cheerio");

//defining elements
var form = document.getElementById("main");
var button = document.getElementById("submit");

//setting courses
var c100 = ["J. Williams"];
var c101 = ["M. Buehler", "R. Gomez-Bombarelli"];
var c200 = ["A. H. Techet", "D. Newman"];
var c201 = ["G. Barbastathis", "A. E. Hosoi", "K. Kamrin"];
var c300 = ["W. C. Carter", "K. Keane"];
var c301 = ["Y. Chiang", "G. Beach", "J. Hu"];
var c400 = ["L. Bello Gomez", "J. Jih"];
var c401 = ["J. Jih"];
var c500 = ["J. Deutch"];
var c501 = ["M. Dinca", "Y. Surendranath"];
var c600 = ["J. V. Guttag"];
var c601 = ["R. H. Heiner"];
var database = [
  c100,
  c101,
  c200,
  c201,
  c300,
  c301,
  c400,
  c401,
  c500,
  c501,
  c600,
  c601
];

//Generate Button
button.onclick = function() {
  var class1 = [document.getElementById("class1").value];
  var class2 = [document.getElementById("class2").value];
  var class3 = [document.getElementById("class3").value];
  var class4 = [document.getElementById("class4").value];
  var class5 = [document.getElementById("class5").value];

  var courses = [class1, class2, class3, class4, class5];
  var i;
  var j;
  var k;
  for (i = 0; i < 5; i++) {
    for (j = 0; j < 12; j++) {
      if (courses[i] == database[j]) {
        for (k = 1; k < course[i].length; k++) {}
        courses[i][k] = database[j][k - 1];
      }
      break;
    }
  }
  for (i = 0; i < 5; i++) {
    console.log(courses[i]);
    for (j = 1; j < course[i].length; j++) {
      console.log(courses[i][j]);
    }
    console.log("---------------------");
  }
};
