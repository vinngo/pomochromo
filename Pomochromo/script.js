var minutes = 25;
var seconds = 0;
var interval;
const loop = ["work", "break", "work", "break", "work", "longbreak"];
var reps = 0;
var secondsInterval;
var curAction = "Start";
var breakTime = 5;
var workTime = 25;
var longBreakTime = 15;
var visible = false;
var blockedWebsites = [];
var taskList = [];
var savedWebsitesList = [];

chrome.action.setBadgeBackgroundColor({ color: "rgb(139, 187, 151)" });
document.addEventListener("DOMContentLoaded", init, false);
document.addEventListener("DOMContentLoaded", getValues, false);
document.addEventListener(
  "DOMContentLoaded",
  function () {
    visible = true;
    chrome.storage.local.set({ visible: visible });
  },
  false
);
document.onclose = function () {
  visible = false;
  chrome.storage.local.set({ visible: visible });
};

function init() {
  document.getElementById("reset").addEventListener("click", reset, true);
  document.getElementById("start").addEventListener("click", startTimer, true);
  document
    .getElementById("Pomodoro")
    .addEventListener("click", switchModePomodoro, true);
  document
    .getElementById("ShortBreak")
    .addEventListener("click", switchModeBreak, true);
  document
    .getElementById("LongBreak")
    .addEventListener("click", switchModeLong, true);
  document
    .getElementById("homebutton")
    .addEventListener("click", openHome, true);
  document
    .getElementById("scribe")
    .addEventListener("click", openScribe, true);
  document
    .getElementById("shield")
    .addEventListener("click", openBlocker, true);
  document
    .getElementById("tasklist")
    .addEventListener("click", openTasks, true);
  document
    .getElementById("settings")
    .addEventListener("click", openSettings, true);
  document.getElementById("time").addEventListener("click", openTimer, true);
  document.getElementById("push").addEventListener("click", addTask, true);
  document
    .getElementById("myRange")
    .addEventListener("mouseup", effectSlider, true);
  document
    .getElementById("myRange2")
    .addEventListener("mouseup", effectSlider, true);
  document
    .getElementById("myRange3")
    .addEventListener("mouseup", effectSlider, true);
  document
    .getElementById("effectBlocker")
    .addEventListener("click", addWebsite, true);
}

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
  chrome.storage.local.set({
    minutes: minutes,
    seconds: seconds,
    reps: reps,
    curAction: curAction,
  });
}

function switchModeBreak() {
  clearInterval(secondsInterval);
  if (loop[reps] === "work") {
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
  chrome.storage.local.set({
    minutes: minutes,
    seconds: seconds,
    reps: reps,
    curAction: curAction,
  });
}

function switchModeLong() {
  clearInterval(secondsInterval);
  if (loop[reps] === "work") {
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
  chrome.storage.local.set({
    minutes: minutes,
    seconds: seconds,
    reps: reps,
    curAction: curAction,
  });
}

function secondsTimer() {
  if (seconds == 0) {
  } else {
    seconds -= 1;
  }
  //chrome.action.setBadgeText({ text: (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)});
  document.getElementById("timer").textContent =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  chrome.storage.local.set({
    minutes: minutes,
    seconds: seconds,
    curAction: curAction,
  });
  if (seconds <= 0) {
    if (minutes <= 0) {
      clearInterval(secondsInterval);
      if (reps == 5) {
        reps = 0;
      } else {
        reps += 1;
      }
      chrome.storage.local.set({ reps: reps });
      pomodoro();
    }
    seconds = 60;
    minutes -= 1;
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
  chrome.storage.local.set({ minutes: minutes, seconds: seconds });
  //method to update time on the screen
  document.getElementById("timer").textContent = minutes + ":" + seconds;

  secondsInterval = setInterval(secondsTimer, 1000);
  chrome.storage.local.set({ secondsInterval: secondsInterval });
}

function pause() {
  clearInterval(secondsInterval);
  chrome.storage.local.set({ secondsInterval: secondsInterval });
}

function reset() {
  clearInterval(secondsInterval);
  chrome.storage.local.set({ secondsInterval: secondsInterval });
  reps = 0;
  minutes = workTime;
  seconds = 0;
  document.getElementById("timer").textContent = minutes + ":" + "0" + seconds;
  document.getElementById("start").textContent = "Start";
  document.getElementById("label").textContent = "Time to Work!";
  curAction = document.getElementById("start").textContent = "Start";
  chrome.storage.local.set({ curAction: curAction });
  chrome.storage.local.set({ reps: reps });
  chrome.storage.local.set({ minutes: minutes, seconds: seconds });
}

function resume() {
  secondsInterval = setInterval(secondsTimer, 1000);
  chrome.storage.local.set({ secondsInterval: secondsInterval }, function () {
    console.log("timer started");
  });
}

function alternate() {
  if (
    document.getElementById("start").textContent === "Start" ||
    document.getElementById("start").textContent === "Resume"
  ) {
    document.getElementById("start").textContent = "Pause";
    curAction = "Pause";
    chrome.storage.local.set({ curAction: curAction }, function () {
      console.log("set curAction to " + curAction);
    });
  } else {
    document.getElementById("start").textContent = "Resume";
    curAction = "Resume";
    chrome.storage.local.set({ curAction: curAction }, function () {
      console.log("set curAction to " + curAction);
    });
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

function openScribe() {
  var i;
  var x = document.getElementsByClassName("window");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById("Scribe").style.display = "block";
}
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

const updateView = () => {
  const tasksList = document.getElementById("tasks");

  var child = tasksList.lastChild;
  while (child) {
    tasksList.removeChild(child);
    child = tasksList.lastChild;
  }

  taskList.forEach((Element, index) => {
    const newTask = document.createElement("div");
    newTask.setAttribute("class", "task-div");

    const taskText = document.createElement("div");
    taskText.setAttribute("class", "task-text");
    taskText.innerHTML = Element.task;

    const taskControls = document.createElement("div");
    taskControls.setAttribute("class", "task-controls");

    const taskDelete = document.createElement("button");
    taskDelete.innerHTML = "Delete";
    taskDelete.setAttribute("id", index + "delete");
    taskDelete.setAttribute("class", "button2");
    taskDelete.addEventListener("click", (event) =>
      deleteTask(event.target.id)
    );

    taskControls.appendChild(taskDelete);

    newTask.appendChild(taskText);
    newTask.appendChild(taskControls);

    tasksList.appendChild(newTask);
  });
};

const addTask = () => {
  const task = document.getElementById("taskinput").value;
  if (task === null || task.trim() === "") return;
  taskList.push({ task });
  localStorage.setItem("savedTasks", JSON.stringify(taskList));
  updateView();

  const taskInput = document.getElementById("taskinput");
  taskInput.value = "";
};

const deleteTask = (id) => {
  const taskIndex = parseInt(id[0]);
  taskList.splice(taskIndex, 1);
  localStorage.setItem("savedTasks", JSON.stringify(taskList));
  updateView();
};

//method for changing slider
function effectSlider() {
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
  };

  slider2.oninput = function () {
    output2.innerHTML = this.value;
  };

  slider3.oninput = function () {
    output3.innerHTML = this.value;
  };

  if (loop[reps] === "work") {
    switchModePomodoro();
  } else if (loop[reps] === "break") {
    switchModeBreak();
  } else {
    switchModeLong();
  }
  chrome.storage.local.set({
    workTime: workTime,
    breakTime: breakTime,
    longBreakTime: longBreakTime,
  });
}

const updateViewBlocker = () => {
  const websiteList = document.getElementById("websites");

  var childWebsites = websiteList.lastChild;
  while (childWebsites) {
    websiteList.removeChild(childWebsites);
    childWebsites = websiteList.lastChild;
  }

  blockedWebsites.forEach((Element, index) => {
    const newWebsite = document.createElement("div");
    newWebsite.setAttribute("class", "website-div");

    const websiteText = document.createElement("div");
    websiteText.setAttribute("class", "website-text");
    websiteText.innerHTML = Element.website;

    const websiteControls = document.createElement("div");
    websiteControls.setAttribute("class", "website-controls");

    const websiteDelete = document.createElement("button");
    websiteDelete.innerHTML = "Delete";
    websiteDelete.setAttribute("id", index + "delete");
    websiteDelete.setAttribute("class", "button2");
    websiteDelete.addEventListener("click", (event) =>
      deleteWebsite(event.target.id)
    );

    websiteControls.appendChild(websiteDelete);

    newWebsite.appendChild(websiteText);
    newWebsite.appendChild(websiteControls);

    websiteList.appendChild(newWebsite);
  });
};

const addWebsite = () => {
  var website = document.getElementById("url").value;
  if (website === null || website.trim() === "") return;
  if (website.substring(0, 4) != "www.") {
    website = "www." + website;
  }
  blockedWebsites.push({ website });
  savedWebsitesList.push(website);
  console.log(blockedWebsites);
  console.log(savedWebsitesList);
  chrome.storage.local.set({ blockerList: savedWebsitesList });
  localStorage.setItem("savedWebsites", JSON.stringify(blockedWebsites));
  updateViewBlocker();

  const websiteInput = document.getElementById("url");
  websiteInput.value = "";
};

const deleteWebsite = (id) => {
  const websiteIndex = parseInt(id[0]);
  blockedWebsites.splice(websiteIndex, 1);
  savedWebsitesList.splice(websiteIndex, 1);
  chrome.storage.local.set({ blockerList: savedWebsitesList });
  localStorage.setItem("savedWebsites", JSON.stringify(blockedWebsites));
  updateViewBlocker();
};

window.onload  =  function() {
  chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
  }
)};

//API call to update all the user data when restarting app.
function getValues() {
  chrome.storage.local.get(
    [
      "minutes",
      "seconds",
      "reps",
      "curAction",
      "workTime",
      "breakTime",
      "longBreakTime",
    ],
    function (data) {
      if (data.minutes != undefined) {
        minutes = data.minutes;
      }
      if (data.seconds != undefined) {
        seconds = data.seconds;
      }
      if (data.reps != undefined) {
        reps = data.reps;
      }
      if (data.curAction != undefined) {
        curAction = data.curAction;
      }
      if (data.workTime != undefined) {
        workTime = data.workTime;
      }
      if (data.breakTime != undefined) {
        breakTime = data.breakTime;
      }
      if (data.longBreakTime != undefined) {
        longBreakTime = data.longBreakTime;
      }

      if (curAction === "Start") {
        console.log("last recorded status: start");
        document.getElementById("start").textContent = "Start";
      } else if (curAction === "Pause") {
        console.log("last recorded status: pause");
        document.getElementById("start").textContent = "Pause";
        console.log("timer resumed");
        secondsInterval = setInterval(secondsTimer, 1000);
      } else if (curAction === "Resume") {
        console.log("last recorded status: resume");
        document.getElementById("start").textContent = "Resume";
      }

      if (loop[reps] === "work") {
        document.getElementById("label").textContent = "Time to Work!";
      } else if (loop[reps] === "break") {
        document.getElementById("label").textContent = "Short Break.";
      } else {
        document.getElementById("label").textContent = "Long Break.";
      }

      document.getElementById("myRange").value = workTime;
      document.getElementById("myRange2").value = breakTime;
      document.getElementById("myRange3").value = longBreakTime;
      document.getElementById("demo").innerHTML = workTime;
      document.getElementById("demo2").innerHTML = breakTime;
      document.getElementById("demo3").innerHTML = longBreakTime;

      const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
      if (savedTasks !== null) taskList = [...savedTasks];
      updateView();

      const savedBlocker = JSON.parse(localStorage.getItem("savedWebsites"));
      if (savedBlocker !== null) blockedWebsites = [...savedBlocker];
      updateViewBlocker();

      document.getElementById("timer").textContent =
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
      document.getElementById("start").textContent = curAction;
    }
  );
}
