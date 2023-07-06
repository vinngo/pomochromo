var minutes = 26;
var seconds = 0;
var interval;
const loop = ["work", "break", "work", "break", "work", "longbreak"];
var reps = 0;
var secondsInterval;
var curAction;
var breakTime = 5;
var workTime = 25;
var longBreakTime = 15;

document.addEventListener("DOMContentLoaded", init, false);
document.addEventListener("DOMContentLoaded", getValues, false);
document.addEventListener("blur", function(){
  chrome.runtime.sendMessage("exit");
  console.log("FUCKKKKK");
}, false);

function init() {
  chrome.action.setBadgeBackgroundColor(  
  {color: '#73a580'}, 
  () => { /* ... */ },)
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
    clearInterval(secondsInterval);
    if (loop[reps] === "work") {
        minutes = workTime;
        seconds = 0;
    } else if (loop[reps] === "break") {
        reps = 0;
        minutes = workTime;
        seconds = 0;
    } else {
        reps = 0;
        minutes = workTime;
        seconds = 0;
    }
    document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
    document.getElementById("start").textContent = "Start";
    document.getElementById("label").textContent = "Time to Work!";
    curAction = document.getElementById("start").textContent;
    chrome.storage.local.set({'minutes': minutes, 'seconds': seconds, 'reps': reps, 'curAction': curAction});
}

function switchModeBreak() {
    clearInterval(secondsInterval);
    if (loop[reps] === "work"){
        reps = 1;
        minutes = "0" + breakTime;
        seconds = 0;
    } else if (loop[reps] === "break") {
        minutes = "0" + breakTime;
        seconds = 0;
    } else {
        reps = 1;
        minutes = "0" + breakTime;
        seconds = 0;
    }
    document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
    document.getElementById("start").textContent = "Start";
    document.getElementById("label").textContent = "Short Break.";
    curAction = document.getElementById("start").textContent;
    chrome.storage.local.set({'minutes': minutes, 'seconds': seconds, 'reps': reps, 'curAction': curAction});
}

function switchModeLong() {
    clearInterval(secondsInterval);
    if (loop[reps] === "work"){
        reps = 5;
        minutes = longBreakTime;
        seconds = 0;
    } else if (loop[reps] === "break") {
        reps = 5;
        minutes = longBreakTime;
        seconds = 0;
    } else {
        minutes = longBreakTime;
        seconds = 0;
    }
    document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
    document.getElementById("start").textContent = "Start";
    document.getElementById("label").textContent = "Long Break.";
    chrome.storage.local.set({'minutes': minutes, 'seconds': seconds, 'reps': reps, 'curAction': curAction});
}


function secondsTimer() {
  seconds -= 1;
  chrome.action.setBadgeText({ text: (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)});
  document.getElementById("timer").textContent =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  chrome.storage.local.set({'minutes': minutes, 'seconds': seconds}, function(){
    console.log(minutes+":"+seconds)
  });
  if (seconds <= 0) {
    if (minutes <= 0) {
      clearInterval(secondsInterval);
      if (reps == 5) {
        reps = 0;
      } else {
        reps += 1;
      }
      chrome.storage.local.set({'reps': reps});
      pomodoro();
      pause();
      alternate();
    }
    seconds = 60;
    minutes -=1;
  }
}

function pomodoro() {
  //logic to determine pomodoro loop
  if (loop[reps] === "work") {
    document.getElementById("label").textContent = "Get to Work!";
    minutes = workTime--;
    seconds = 0;
    secondsInterval = setInterval(secondsTimer, 1000);
  } else if (loop[reps] === "break") {
    document.getElementById("label").textContent = "Short Break.";
    minutes = breakTime;
    seconds = 0;
    secondsInterval = setInterval(secondsTimer, 1000);
  } else {
    document.getElementById("label").textContent = "Long Break.";
    minutes = longBreakTime--;
    seconds = 0;
    secondsInterval = setInterval(secondsTimer, 1000);
  }
}

function start() {
  minutes -= 1;
  seconds = 59;
  chrome.storage.local.set({'minutes' : minutes, 'seconds': seconds});
  //method to update time on the screen
  document.getElementById("timer").textContent = minutes + ":" + seconds;

  secondsInterval = setInterval(secondsTimer, 1000);
  chrome.storage.local.set({'secondsInterval' : secondsInterval});
}

function pause() {
  clearInterval(secondsInterval);
  chrome.storage.local.set({'secondsInterval' : secondsInterval});
}

function reset() {
  clearInterval(secondsInterval);
  chrome.storage.local.set({'secondsInterval' : secondsInterval});
  reps = 0;
  minutes = workTime;
  seconds = 0;
  document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
  document.getElementById("start").textContent = "Start";
  document.getElementById("label").textContent = "Time to Work!";
  curAction = document.getElementById("start").textContent;
  chrome.storage.local.set({'reps': reps});
  chrome.storage.local.set({'minutes' : minutes, 'seconds': seconds});
  chrome.action.setBadgeText({ text: (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)});
}

function resume() {
  secondsInterval = setInterval(secondsTimer, 1000);
  chrome.storage.local.set({'secondsInterval':secondsInterval}, function(){
    console.log("timer started");
  });
}

function alternate() {
  if (
    document.getElementById("start").textContent === "Start" ||
    document.getElementById("start").textContent === "Resume"
  ) {
    document.getElementById("start").textContent = "Pause";
    curAction = document.getElementById("start").textContent = "Pause";
    chrome.storage.local.set({"curAction": curAction});
  } else {
    document.getElementById("start").textContent = "Resume";
    curAction = document.getElementById("start").textContent = "Resume";
    chrome.storage.local.set({"curAction": curAction});
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
  workTime = slider.value;
  breakTime = slider2.value;
  longBreakTime = slider3.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  }

  slider2.oninput = function () {
    output2.innerHTML = this.value;
  }

  slider3.oninput = function () {
    output3.innerHTML = this.value;
  }

  if (loop[reps] === "work"){
    switchModePomodoro();
  } else if (loop[reps] === "break"){
    switchModeBreak();
  } else {
    switchModeLong();
  }
  chrome.action.setBadgeText({ text: (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)});
  chrome.storage.local.set({'workTime': workTime, 'breakTime': breakTime, 'longBreakTime': longBreakTime});
}

//API call to update all the user data when restarting app.
function getValues() {
  chrome.storage.local.get(['minutes', 'seconds', 'reps', 'curAction', 'workTime', 'breakTime', 'longBreakTime'], function(data){
    if (data.minutes != undefined) {
      minutes = data.minutes;
      seconds = data.seconds;
      reps = data.reps;
      curAction = data.curAction;
      workTime = data.workTime;
      breakTime = data.breakTime;
      longBreakTime = data.longBreakTime;

      if (minutes == 26){
        minutes -= 2;
      }

      if (curAction === "Start"){
        console.log("last recorded status: start");
        document.getElementById("start").textContent = "Start";
      } else if (curAction === "Pause"){
        console.log("last recorded status: pause");
        document.getElementById("start").textContent = "Resume";
      } else if (curAction === "Resume"){
        console.log("last recorded status: resume");
        document.getElementById("start").textContent = "Resume";
      }

      if (loop[reps] === "work"){
        document.getElementById("label").textContent = "Time to Work!";
      } else if (loop[reps] === "break"){
        document.getElementById("label").textContent = "Short Break."
      } else {
        document.getElementById("label").textContent = "Long Break.";
      }

      document.getElementById("myRange").value = workTime;
      document.getElementById("myRange2").value = breakTime;
      document.getElementById("myRange3").value = longBreakTime;

      document.getElementById("timer").textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      document.getElementById("start").textContent = curAction;
    }
  });
};

