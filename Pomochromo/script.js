var seconds = 0;
var minutes = 25;
var interval;
const loop = ["work", "break", "work", "break", "work",
"longbreak"];
var reps = 0;
var minutesInterval;
var secondsInterval;

document.addEventListener('DOMContentLoaded', init, false);

function init(){
  document.getElementById('reset').addEventListener('click', reset, true);
  document.getElementById('start').addEventListener('click', startTimer, true);
};

function minutesTimer() {
    if (minutes != 0){
        minutes = minutes - 1;
    }
}

function secondsTimer() {
    seconds = seconds - 1;
    document.getElementById("timer").textContent = minutes + ":" + seconds;
    console.log(minutes + ":" + seconds);
    if (seconds <= 0){
        if (minutes <= 0){
            clearInterval(minutesInterval);
            clearInterval(secondsInterval);
            reps += 1;
            pomodoro();
        }
        seconds = 60;
    }
}

function pomodoro(){
    //logic to determine pomodoro loop
    if (loop[reps] === "work"){
        document.getElementById("label").textContent = "Get to Work!";
        minutes = 24;
        seconds = 0;
        minutesInterval = setInterval(minutesTimer, 60000);
        secondsInterval = setInterval(secondsTimer, 1000);
    } else if (loop[reps] === "break"){
        document.getElementById("label").textContent = "Five Minute Break."
        minutes = 4;
        seconds = 0;
        minutesInterval = setInterval(minutesTimer, 60000);
        secondsInterval = setInterval(secondsTimer, 1000);
    } else {
        document.getElementById("label").textContent = "Fifteen Minute Break."
        minutes = 14;
        seconds = 0;
        minutesInterval = setInterval(minutesTimer, 60000);
        secondsInterval = setInterval(secondsTimer, 1000);
    }      
}

function start() {    
    minutes = 24;
    seconds = 59;
    //method to update time on the screen
    document.getElementById("timer").textContent = minutes + ":" + seconds;

    minutesInterval = setInterval(minutesTimer, 60000)
    secondsInterval = setInterval(secondsTimer, 1000)
}

function pause(){
  clearInterval(minutesInterval);
  clearInterval(secondsInterval);
}

function reset(){
  clearInterval(minutesInterval);
  clearInterval(secondsInterval);
  reps = 0;
  minutes = 25;
  seconds = 0;
  document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
  document.getElementById("start").textContent = "Start";
}

function resume(){
  minutesInterval = setInterval(minutesTimer, 60000);
  secondsInterval = setInterval(secondsTimer, 1000);
}

function alternate(){
    if (document.getElementById("start").textContent === "Start" || document.getElementById("start").textContent === "Resume"){
        document.getElementById("start").textContent = "Pause";
    } else {
        document.getElementById("start").textContent = "Resume";
    }
}

function startTimer(){
    if (document.getElementById("start").textContent === "Start"){
        start();
        alternate();
    } else if (document.getElementById("start").textContent === "Resume"){
        resume();
        alternate();
    } else {
        pause();
        alternate();
    }
}

