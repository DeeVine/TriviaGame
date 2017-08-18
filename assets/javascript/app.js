$(document).ready(function() {

//Variables-----------------------------
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionsUnanswers = 0;
var time = 30;

var questions = [
  {
    'question': 'This is question #1',
    'correctAnswer': 'This is the correct answer',
    'incorrectAnswer': [
       'incorrect1',
       'incorrect2',
       'incorrect3',
    ]
  },
  {
    'question': 'This is question #2',
    'correctAnswer': 'This is the correct answer',
    'incorrectAnswer': [
       'incorrect1',
       'incorrect2',
       'incorrect3',
    ]
  }
]; 

//dynamically create questions from array
function renderQuestions () {

  console.log(questions[0].correctAnswer);

  for (var i = 0; i < questions[0].incorrectAnswer.length; i++) {
  console.log(questions[0].incorrectAnswer[i]);
  }
}

$('.answerSection li').eq(0).html('testing this out');

renderQuestions();

timer();

//timer countdown from 30 at each question
function timer () {
    setInterval(function(){count(); }, 1000);
}

function count() {
  if (time > 0) {
    time--;
    $('.timer').html('Time Remaining: ' + time);
  }
}

//click function for as
$('.answerSection li').on('click', function() {
  console.log('you clicked on ' + this);
  });

//generate random number not including one already used
function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 2) ? generateRandom(min, max) : num;
}

var test = generateRandom(0, 3)
console.log(test);

var correctIndex = Math.floor(Math.random() * 4);
console.log(correctIndex);

});