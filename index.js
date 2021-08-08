
var arrColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level=0;



$(document).keypress(function() {
    if (!started){
      $(".title").text("Level " + level);
      nextSequence();
      started = true;
    } 
});

$(".set").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){

    userClickedPattern=[];
    level++;

    $(".title").text("Level " + level);

    if(level == 5){
        $(".title").text("You are doing Well.Now you are in Level" + level);
    }
    else if(level == 10){
        $(".title").text("Great! Rock On.Now you are in Level" + level);
    }
    else if(level == 15){
        $(".title").text("Awesome Performance 👏👏.Now you are in Level" + level);
    }
    
    else if(level>=20){
        $(".title").text("Genius !🤩. Level" + level);
    }

    var n = Math.floor(Math.random()*4);
    var randomChosenColour = arrColours[n];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("touched");
    setTimeout(function () {
      $("#" + currentColor).removeClass("touched");
    }, 100);
}


function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    
    else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $(".title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


