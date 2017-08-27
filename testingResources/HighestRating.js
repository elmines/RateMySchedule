/*document.write("Cherries! </br>");
document.write("Hello!");
*/
function Professor(name, avgRating)
{
    this.name = name;
    this.avgRating = avgRating;
}
var ProfessorA = new Professor('A', 2);
var ProfessorB = new Professor('B', 3);
var ProfessorC = new Professor('C', 4);
var ProfessorD = new Professor('D', 5);
var testing_array = [ProfessorA, ProfessorB, ProfessorC, ProfessorD];
function FindHighest(type){
  for (var i = 0; i < type.length; i++ ){
    var max = type[0].avgRating;
    var index = 0;
    if (max < type[i].avgRating){
      max = type[i].avgRating;
      index = i;
    }
  }
    document.write(type[index].name  + "</br>");
    document.write(type[index].avgRating);
}
FindHighest(testing_array);
