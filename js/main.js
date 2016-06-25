// ========================================================
//
//   Title: Main JS for Quiz Game
//   Author: Drew Cook
//   Author URL: http://drewcook.net
//   Date Created: 6/24/16
//   Version: 1.0.0
//
// ========================================================

// variables
var $dataSet = [];
var $question;
var $choices = [];
var $correctAnswer;

var questionsAsked = 0;
var answeredCorrectly = 0;
var score = 0;

// store questions into $dataSet
$.getJSON('js/questions.json', function(data){
    $.each(data, function(index, value){
        $dataSet.push(value);
    });
});

// get a question set and assign parts
function getRandomQuestion() {
  var q = Math.floor(Math.random() * ($dataSet.length)) + 1;
  var randQ = $dataSet[q];
  $question = randQ.question;
  $choices = [];
  $choices.push(randQ.A, randQ.B, randQ.C, randQ.D);
  $correctAnswer = randQ.answer;
}

// display a random question from the dataset
function askQuestion() {
        questionsAsked++;
        getRandomQuestion();
        $("#c-wrapper p").removeClass("selected");
        $(".alert-box").hide();
        $(".q-number").html(questionsAsked);
        $('.question').html($question);
        $('.choice-a').html($choices[0]);
        $('.choice-b').html($choices[1]);
        $('.choice-c').html($choices[2]);
        $('.choice-d').html($choices[3]);
}

// setup a fresh quiz
function startQuiz() {
    questionsAsked = 0;
    answeredCorrectly = 0;
    score = 0;
    $("#tally span").html(score);
    $('#q-wrapper').show();
    $('#c-wrapper').show();
    askQuestion();
}

// show results
function showResults() {
    $('#q-wrapper').hide();
    $("#c-wrapper").hide();
    $("#r-wrapper").show();
    $("#results-btn").show();
}

// start quiz
$('#get-started').on('click', function() {
    $(this).fadeOut();
    $("#i-wrapper").hide();
    startQuiz();
});

//  selecting a choice
$('#c-wrapper p').on('click', function() {
    $('#c-wrapper p').removeClass('selected');
    $(this).addClass("selected");
    $('.alert-box').hide();
});

// next question
$('#next-btn').on('click', function() {
    // check to see if currntly on last question show results options
    if (questionsAsked === 10) {
        showResults();
    } else if ($(this).parent().find('.selected').length !== 1) {
        $('.alert-box').show();
    } else {
        // loop over selections
        $.each($('#c-wrapper p'), function() {
            // check if correct answer is selected and tally
            if ($(this).hasClass("selected") && $(this).attr('data-value') === $correctAnswer) {
                answeredCorrectly++;
                score += 100;
            }
        });
        // add to tally
        $("#tally span").html(score);
        // ask new question
        askQuestion();
    }
});


// show results and play again button
$("#results-btn").on('click', function() {
    $("#r-wrapper").hide();
    $(".score").html("You answered " + answeredCorrectly + " questions correctly!");
    $("#s-wrapper").show();
    $("#play-again-btn").show();
});

// restart game
$('#play-again-btn').on('click', function() {
    $(this).hide();
    $('#r-wrapper').hide();
    $('#s-wrapper').hide();
    startQuiz();
});