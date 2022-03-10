var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  userClickedPattern = []
  level++
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").html("Level " + level);
}

$(".btn").click(function() {
  var userChosenColour = event.target.id
  userClickedPattern.push(userChosenColour);
  $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(document).one("keydown", function() {
  $("#level-title").html("Level 1");
  nextSequence();
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    level = 0
    gamePattern = [];
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").html("Game Over, Press any key to restart!");
    setTimeout(function(){
      $("body").removeClass("game-over");
  }, 200);
  $(document).one("keydown", function() {
    $("#level-title").html("Level 1");
    nextSequence();
  });
}};
