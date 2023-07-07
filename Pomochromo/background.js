var minutes;
var seconds;
var reps;
var curAction;
var secondsInterval;
var visible;


chrome.storage.local.get(['minutes', 'seconds', 'reps', 'curAction', 'secondsInterval', 'visible'], function(data){
    minutes = data.minutes;
    seconds = data.seconds;
    reps = data.reps;
    curAction = data.curAction;
    secondsInterval = data.secondsInterval;
    visible = data.visible;
});


chrome.alarms.onAlarm.addListener(alarm => {
    console.log(visible);
    if (alarm.name === "myTimer" && curAction === "Pause" && visible === false) {
        seconds -= 1;
        chrome.action.setBadgeBackgroundColor(  
            {color: '#73a580'}, 
            () => { /* ... */ },);
        chrome.action.setBadgeText({ text: (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)});
        chrome.storage.local.set({'minutes': minutes, 'seconds': seconds}, function(){
            console.log(minutes+":"+seconds);
        });
        if (seconds <= 0) {
            if (minutes <= 0) {
              if (reps == 5) {
                reps = 0;
              } else {
                reps += 1;
              }
              chrome.storage.local.set({'reps': reps});
            }
            seconds = 60;
            minutes -=1;
        }
    }
});


chrome.alarms.create("myTimer", {
    periodInMinutes: (1/60),
});

function startTimer() {
    curAction = "Pause";
    chrome.storage.local.set({'curAction': curAction});
}

function stopTimer() {
    curAction = "Stop";
    chrome.storage.local.set({'curAction': curAction});
    chrome.alarms.clear(timerAlarmName);
}