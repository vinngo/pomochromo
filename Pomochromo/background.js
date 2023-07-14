var minutes;
var seconds;
var reps;
var curAction;
var secondsInterval;
var visible;
var workTime;
var breakTime;
var longBreakTime;
const loop = ["work", "break", "work", "break", "work", "longbreak"];



chrome.alarms.onAlarm.addListener(alarm => {
    chrome.storage.local.get(['minutes', 'seconds', 'reps', 'curAction', 'secondsInterval', 'visible', 'workTime', 'breakTime', 'longBreakTime'], function(data){
        minutes = data.minutes;
        seconds = data.seconds;
        reps = data.reps;
        curAction = data.curAction;
        secondsInterval = data.secondsInterval;
        visible = data.visible;
        workTime = data.workTime;
        breakTime = data.breakTime;
        longBreakTime = data.longBreakTime;
    });
    if (alarm.name === "myTimer" && curAction === "Pause") {
        console.log(loop[reps]);
        if (seconds <= 0){
            if (minutes <= 0){
              if (reps == 5) {
              reps = 0;
              } else {
              reps += 1;
              }
              chrome.storage.local.set({'reps': reps});
              pomodoro();
            } else {
              seconds = 59;
              minutes -= 1;  
            }
        } else {
          seconds -= 2;
        }
        chrome.storage.local.set({'minutes': minutes, 'seconds': seconds}, function(){
        console.log(minutes+":"+seconds);
        });
        chrome.storage.local.set({'minutes': minutes, 'seconds': seconds, 'reps': reps});

    }
});


chrome.alarms.create("myTimer", {
    periodInMinutes: (1/240),
});

function startTimer() {
    curAction = "Pause";
    chrome.storage.local.set({'curAction': curAction});
}

function pomodoro() {
    //logic to determine pomodoro loop
    if (loop[reps] === "work") {
      minutes = workTime--;
      seconds = 0;
    } else if (loop[reps] === "break") {
      minutes = breakTime--;
      seconds = 0;
    } else {
      minutes = longBreakTime--;
      seconds = 0;
    }
  }
