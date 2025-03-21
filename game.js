var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];
var start = false;
var level = 0;
$(document).keypress(function(){
    if(!start)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("right");
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){nextSequence()},1000); 
        }
    }   
    else
    {
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart.");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        startOver();
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);   
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver()
{
    level = 0;
    gamePattern=[];
    start = false;
}