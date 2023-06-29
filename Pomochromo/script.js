'use strict';
var seconds = 0;
var minutes = 25;
var interval;
const loop = ["work", "break", "work", "break", "work", "longbreak"];
var reps = 0;
var minutesInterval;
var secondsInterval;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  document.getElementById("demo").value = 25;
  document.getElementById("demo2").value = 5;
  document.getElementById("demo3").value = 15;
  document.getElementById("reset").addEventListener("click", reset, true);
  document.getElementById("start").addEventListener("click", startTimer, true);
  document.getElementById("Pomodoro").addEventListener("click", switchModePomodoro, true);
  document.getElementById("ShortBreak").addEventListener("click", switchModeBreak, true);
  document.getElementById("LongBreak").addEventListener("click", switchModeLong, true);
  document.getElementById("homebutton").addEventListener("click", openHome, true);
  document.getElementById("shield").addEventListener("click", openBlocker, true);
  document.getElementById("tasklist").addEventListener("click", openTasks, true);
  document.getElementById("settings").addEventListener("click", openSettings, true);
  document.getElementById("time").addEventListener("click", openTimer, true);
  document.getElementById("push").addEventListener("click", effectTask, true);
  document.getElementById("myRange").addEventListener("mouseup", effectSlider, true);
  document.getElementById("myRange2").addEventListener("mouseup", effectSlider, true);
  document.getElementById("myRange3").addEventListener("mouseup", effectSlider, true);
};

function switchModePomodoro() {
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
    document.getElementById("label").textContent = "Time to Work!";
}

function switchModeBreak() {
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
    document.getElementById("label").textContent = "Five Minute Break.";
}

function switchModeLong() {
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
    document.getElementById("label").textContent = "Fifteen Minute Break.";
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
  chrome.storage.sync.set({'minutes': minutes}, function(){
  });
  chrome.storage.sync.set({'seconds': seconds}, function(){
    console.log(minutes+":"+seconds)
  });
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
      pause();
      alternate();
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
  chrome.storage.sync.set({'minutes' : minutes});
  chrome.storage.sync.set({'seconds' : seconds});
  //method to update time on the screen
  document.getElementById("timer").textContent = minutes + ":" + seconds;

  minutesInterval = setInterval(minutesTimer, 60000);
  secondsInterval = setInterval(secondsTimer, 1000);
  chrome.storage.sync.set({'minutesInterval' : minutesInterval});
  chrome.storage.sync.set({'secondsInterval' : secondsInterval});
}

function pause() {
  clearInterval(minutesInterval);
  clearInterval(secondsInterval);
  chrome.storage.sync.set({'minutesInterval' : minutesInterval});
  chrome.storage.sync.set({'minutesInterval' : minutesInterval});
}

function reset() {
  clearInterval(minutesInterval);
  clearInterval(secondsInterval);
  chrome.storage.sync.set({'minutesInterval' : minutesInterval});
  chrome.storage.sync.set({'minutesInterval' : minutesInterval});
  reps = 0;
  minutes = 25;
  seconds = 0;
  chrome.storage.sync.set({'reps': reps})
  chrome.storage.sync.set({'minutes' : minutes});
  chrome.storage.sync.set({'seconds' : seconds});
  document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
  document.getElementById("start").textContent = "Start";
  document.getElementById("label").textContent = "Time to Work!";
}

function resume() {
  minutesInterval = setInterval(minutesTimer, 60000);
  secondsInterval = setInterval(secondsTimer, 1000);
  chrome.storage.sync.set({minutesInterval:minutesInterval}, function(){
    console.log("timer started");
  });
  chrome.storage.sync.set({minutesInterval:minutesInterval}, function(){
  });
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

//methods for changing windows
function openTimer() {
  var i;
  var x = document.getElementsByClassName("window");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("Timer").style.display = "block";
}

function openSettings() {
  var i;
  var x = document.getElementsByClassName("window");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("Settings").style.display = "block";
}

function openTasks() {
  var i;
  var x = document.getElementsByClassName("window");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("Checklist").style.display = "block";
}

function openHome() {
  var i;
  var x = document.getElementsByClassName("window");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("Home").style.display = "block";
}

function openBlocker() {
  var i;
  var x = document.getElementsByClassName("window");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("Blocker").style.display = "block";
}

//method for entering tasks
function effectTask() {
  document.querySelector('#push').onclick = function () {
    if (document.querySelector('#newtask input').value.length == 0) {
      alert("Enter a fucking task, you little shit!");
    }

    else {
      document.querySelector('#tasks').innerHTML += ` 
          <div class="task">
              <span id="taskname">
                  ${document.querySelector('#newtask input').value}
              </span>
              <span class="delete"> 
                <img style = "height: 40px; width: 40px" src = "images/close-circle.png">
              </span>
          </div>
      `;

      var current_tasks = document.querySelectorAll(".delete");
      for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
          this.parentNode.remove();
        }
      }
    }
  }
}

//method for changing slider
function effectSlider (){
  var slider = document.getElementById("myRange");
  var slider2 = document.getElementById("myRange2");
  var slider3 = document.getElementById("myRange3");
  var output = document.getElementById("demo");
  var output2 = document.getElementById("demo2");
  var output3 = document.getElementById("demo3");
  output.innerHTML = slider.value;
  output2.innerHTML = slider2.value;
  output3.innerHTML = slider3.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  }

  slider2.oninput = function () {
    output2.innerHTML = this.value;
  }

  slider3.oninput = function () {
    output3.innerHTML = this.value;
  }
}

