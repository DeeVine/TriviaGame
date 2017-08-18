$(document).ready(function() {

//Variables-----------------------------
var correctAnswers = 0;
var incorrectAnswers = 0;
var questionsUnanswered = 0;
var time;
var intervalId;
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

gameStart();

//start game
function gameStart () {
  var a = $('<button>');
  a.addClass('game-start');
  a.text('Start');
  $('.dynamic-section').append(a);

  $('.game-start').on('click', function() {
    renderQuestion();
  });
}

//display end game screen
function displayEndGame () {
  $('.dynamic-section').empty();

  var a = $('<p>');
  a.addClass('done');
  a.text('All done, here\'s how you did!')
  $('.dynamic-section').append(a);

  var b = $('<ul>');
  b.addClass('results-section');
  $('.dynamic-section').append(b);

  var c = $('<li>');
  c.addClass('results');
  c.text('Correct Answers: ' + correctAnswers);
  $('.results-section').append(c);
  
  var d = $('<li>');
  d.addClass('results');
  d.text('Incorrect Answers: ' + incorrectAnswers);
  $('.results-section').append(d);
  
  var e = $('<li>');
  e.addClass('results');
  e.text('Unanswered: ' + questionsUnanswered);
  $('.results-section').append(e);

  var f = $('<button>');
  f.addClass('start-over');
  f.text('Start Over?');
  $('.dynamic-section').append(f);

  $('.start-over').on('click', function() {
  //reset game
  correctAnswers = 0;
  incorrectAnswers = 0;
  questionsUnanswered = 0;
  time = 30;
  questionIndex = 0;
  renderQuestion();
  });
}

//display section if correct answer is selected
function displayCorrectAnswer () {
  $('.dynamic-section').empty();

  var a = $('<p>');
  a.addClass('correct-answer');
  a.text('Correct!')
  $('.dynamic-section').append(a);

  var c = $('<img>');
  c.attr('src', 'http://www.phonebrain.org.uk/assets/img/quiz/correct-male.png')  
  $('.dynamic-section').append(c);
}

//display section if wrong answer is selected
function displayWrongAnswer () {
  $('.dynamic-section').empty();

  var a = $('<p>');
  a.addClass('wrong');
  a.text('Nope!')
  $('.dynamic-section').append(a);

  var b = $('<p>');
  b.addClass('the-correct-answer');
  b.text('The Correct Answer Was: ' + questions[questionIndex].correctAnswer);
  $('.dynamic-section').append(b);

  var c = $('<img>');
  c.attr('src', 'http://www.phonebrain.org.uk/assets/img/quiz/correct-male.png')  
  $('.dynamic-section').append(c);
}

function displayOutOfTime () {
  $('.dynamic-section').empty();

  var a = $('<p>');
  a.addClass('out-of-time');
  a.text('Out Of Time!')
  $('.dynamic-section').append(a);

  var b = $('<p>');
  b.addClass('the-correct-answer');
  b.text('The Correct Answer Was: ' + questions[questionIndex].correctAnswer);
  $('.dynamic-section').append(b);

  var c = $('<img>');
  c.attr('src', 'http://www.phonebrain.org.uk/assets/img/quiz/correct-male.png')  
  $('.dynamic-section').append(c);
}

// renderQuestion();

function renderQuestion () {
  timer();
  var newArray = [];
  newArray.push(questions[questionIndex].correctAnswer);
  newArray.push(questions[questionIndex].incorrectAnswer[0]);
  newArray.push(questions[questionIndex].incorrectAnswer[1]);
  newArray.push(questions[questionIndex].incorrectAnswer[2]);
  newArray = shuffle(newArray); 

  // $('.answer-section').empty(); //clear section before appending
 
  $('.dynamic-section').empty();//clear section before appending
  //create section for questions and answers to be appended
  var b = $('<p>');
  b.attr('id','question');
  $('.dynamic-section').append(b);

  var c = $('<ul>');
  c.addClass('answer-section');
  $('.dynamic-section').append(c);
  $('#question').text(questions[questionIndex].question);

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
      clearInterval(intervalId); //stop timer
      correctAnswers++;
      console.log('Correct Answers: ' + correctAnswers);
      displayCorrectAnswer();
      questionIndex++;
      //check if any questions remain
      setTimeout(function(){endGame(); }, 2000);
    }
    else {
      clearInterval(intervalId); //stop timer
      incorrectAnswers++;
      console.log('Incorrect Answers: ' + incorrectAnswers);
      displayWrongAnswer();
      questionIndex++;
      //check if any questions remain
      setTimeout(function(){endGame(); }, 2000);
    }
  });
}

function endGame () {
  if (questionIndex >= questions.length) {
    console.log ("end of game screen with results");
    displayEndGame();
  }
  else {
    renderQuestion();
  } 
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

//timer countdown from 30 at each question
function timer () {
  $('.timer').html('Time Remaining: ' + 30);
  time = 30; //reset time
  intervalId = setInterval(function(){count(); }, 1000);

  // if (time = 0) {
  //   console.log('you\'re out of time');
  // }
}

function count() {
  if (time > 0) {
    time--;
    $('.timer').html('Time Remaining: ' + time);
  }
  //if time runs out
  if (time === 0) {
    clearInterval(intervalId); //stop timer
    questionsUnanswered++;
    console.log('Correct Answers: ' + correctAnswers);
    displayOutOfTime();
    questionIndex++;
    //check if any questions remain
    setTimeout(function(){endGame(); }, 2000);
  }
}

});