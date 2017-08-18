$(document).ready(function() {

//Variables-----------------------------
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionsUnanswered = 0;
var time = 30;
var tempIndex = 0;
var questionIndex = 0; //to know which question we should render
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

renderQuestion();

function renderQuestion () {
  var newArray = [];
  newArray.push(questions[questionIndex].correctAnswer);
  newArray.push(questions[questionIndex].incorrectAnswer[0]);
  newArray.push(questions[questionIndex].incorrectAnswer[1]);
  newArray.push(questions[questionIndex].incorrectAnswer[2]);
  // console.log(newArray);
  newArray = shuffle(newArray); //shuffle array
  // console.log(newArray);

  $('.answer-section').empty();

  for (var i = 0; i < newArray.length; i++) {

    //checks if correct answer is in the same index and skips ahead 1 index
    console.log(newArray[i]);

    if (newArray[i] === questions[questionIndex].correctAnswer) {
      console.log("successfully targetted correct answer");
      var a = $('<li>');
      a.addClass('correctAnswer');
      a.text(newArray[i]);
      $('.answer-section').append(a);
    }
    else{
      console.log("this is the wrong answer");
      var a = $('<li>');
      a.addClass('incorrectAnswer');
      a.text(newArray[i]);
      $('.answer-section').append(a);
    }
  }
  //add on click event to list items, kept inside function in order for appended items to get click event
  $('.answer-section li').on('click', function() {
  //check if correct answer was clicked
    if ($(this).attr('class') === 'correctAnswer') {
      correctAnswers++;
      console.log('Correct Answers: ' + correctAnswers);
      questionIndex++;
      if (questionIndex >= questions.length) {
        console.log ("end of game screen");
      }
      else {
        renderQuestion();
      } 
    }
    else {
      incorrectAnswers++;
      console.log('Incorrect Answers: ' + incorrectAnswers);
      questionIndex++;
      if (questionIndex >= questions.length) {
        console.log ("end of game screen");
      }
      else {
        renderQuestion();
      } 
    }
  });
}

//shuffle array function
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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


//generate random number not including one already used
function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 2) ? generateRandom(min, max) : num;
}

var test = generateRandom(0, 3)


});