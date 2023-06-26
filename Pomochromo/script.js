var seconds = 0;
var minutes = 25;
var interval;
const loop = ["work", "break", "work", "break", "work", "longbreak"];
var reps = 0;
var minutesInterval;
var secondsInterval;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  //document.getElementById("Pomodoro").style.backgroundColor = "rgb(108, 145, 118)"
  document.getElementById("reset").addEventListener("click", reset, true);
  document.getElementById("start").addEventListener("click", startTimer, true);
  document.getElementById("Pomodoro").addEventListener("click", switchModePomodoro, true);
  document.getElementById("ShortBreak").addEventListener("click", switchModeBreak, true);
  document.getElementById("LongBreak").addEventListener("click", switchModeLong, true);
}

function switchModePomodoro() {
    /*
    if (loop[reps] === "work"){

    } else {
        changeBackground("Pomodoro");
    }
    */
    clearInterval(minutesInterval);
    clearInterval(secondsInterval);
    if (loop[reps] === "work") {
        minutes = 25;
        seconds = 0;
    } else if (loop[reps] === "break") {
        reps = 0;
        minutes = 25;
        seconds = 0;
    } else {
        reps = 0;
        minutes = 25;
        seconds = 0;
    }
    document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
    document.getElementById("start").textContent = "Start";
}

function switchModeBreak() {
    /*
    if (loop[reps] === "break"){

    } else {
        changeBackground("ShortBreak");
    }
    */
    clearInterval(minutesInterval);
    clearInterval(secondsInterval);
    if (loop[reps] === "work"){
        reps = 1;
        minutes = "0" + 5;
        seconds = 0;
    } else if (loop[reps] === "break") {
        minutes = "0" + 5;
        seconds = 0;
    } else {
        reps = 1;
        minutes = "0" + 5;
        seconds = 0;
    }
    document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
    document.getElementById("start").textContent = "Start";
}

function switchModeLong() {
    /*
    if (loop[reps] === "longbreak"){
        
    } else {
        changeBackground("LongBreak");
    }
    */
    clearInterval(minutesInterval);
    clearInterval(secondsInterval);
    if (loop[reps] === "work"){
        reps = 5;
        minutes = 15;
        seconds = 0;
    } else if (loop[reps] === "break") {
        reps = 5;
        minutes = 15;
        seconds = 0;
    } else {
        minutes = 15;
        seconds = 0;
    }
    document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
    document.getElementById("start").textContent = "Start";
}

function minutesTimer() {
  if (minutes != 0) {
    minutes = minutes - 1;
  }
}

function secondsTimer() {
  seconds = seconds - 1;
  document.getElementById("timer").textContent =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  console.log(minutes + ":" + seconds);
  if (seconds <= 0) {
    if (minutes <= 0) {
      clearInterval(minutesInterval);
      clearInterval(secondsInterval);
      if (reps == 5) {
        reps = 0;
      } else {
        reps += 1;
      }
      pomodoro();
    }
    seconds = 60;
  }
}

function pomodoro() {
  //logic to determine pomodoro loop
  if (loop[reps] === "work") {
    document.getElementById("label").textContent = "Get to Work!";
    minutes = 24;
    seconds = 0;
    minutesInterval = setInterval(minutesTimer, 60000);
    secondsInterval = setInterval(secondsTimer, 1000);
  } else if (loop[reps] === "break") {
    document.getElementById("label").textContent = "Five Minute Break.";
    minutes = 4;
    seconds = 0;
    minutesInterval = setInterval(minutesTimer, 60000);
    secondsInterval = setInterval(secondsTimer, 1000);
  } else {
    document.getElementById("label").textContent = "Fifteen Minute Break.";
    minutes = 14;
    seconds = 0;
    minutesInterval = setInterval(minutesTimer, 60000);
    secondsInterval = setInterval(secondsTimer, 1000);
  }
}

function start() {
  minutes -= 1;
  seconds = 59;
  //method to update time on the screen
  document.getElementById("timer").textContent = minutes + ":" + seconds;

  minutesInterval = setInterval(minutesTimer, 60000);
  secondsInterval = setInterval(secondsTimer, 1000);
}

function pause() {
  clearInterval(minutesInterval);
  clearInterval(secondsInterval);
}

function reset() {
  clearInterval(minutesInterval);
  clearInterval(secondsInterval);
  reps = 0;
  minutes = 25;
  seconds = 0;
  document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
  document.getElementById("start").textContent = "Start";
}

function resume() {
  minutesInterval = setInterval(minutesTimer, 60000);
  secondsInterval = setInterval(secondsTimer, 1000);
}

function alternate() {
  if (
    document.getElementById("start").textContent === "Start" ||
    document.getElementById("start").textContent === "Resume"
  ) {
    document.getElementById("start").textContent = "Pause";
  } else {
    document.getElementById("start").textContent = "Resume";
  }
}

function startTimer() {
  if (document.getElementById("start").textContent === "Start") {
    start();
    alternate();
  } else if (document.getElementById("start").textContent === "Resume") {
    resume();
    alternate();
  } else {
    pause();
    alternate();
  }
}


/*   really broken, i should fix this sometime.
function changeBackground(id) {
    var flag;
    var buttons = document.getElementsByClassName("option");
    for (let i = 0; i < buttons.length; i++){
        if (buttons.item(i).style.backgroundColor = "rgb(108, 145, 118)"){
            flag = true;
        }
    }
    if (flag){

    } else {
        if (document.getElementById(id).style.backgroundColor === "transparent"){
            document.getElementById(id).style.backgroundColor = "rgb(108, 145, 118)"; 
        } else {
            document.getElementById(id).style.backgroundColor = "transparent";
        }
    }
}
*/
