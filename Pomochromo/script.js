var seconds = 0;
var minutes = 25;
var interval;
const loop = ["work", "break", "work", "break", "work",
"longbreak"];
var reps = 0;
var minutesInterval;
var secondsInterval;

function start() {
    
    minutes = 24;
    seconds = 59;

    //method to update time on the screen
    document.getElementById("timer").textContent = minutes + ":" + seconds;

    minutesInterval = setInterval(minutesTimer, 60000)
    secondsInterval = setInterval(secondsTimer, 1000)

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
        if (loop[reps] === "work"){
            minutes = 24;
            seconds = 0;
            minutesInterval = setInterval(minutesTimer, 60000);
            secondsInterval = setInterval(secondsTimer, 1000);
        } else if (loop[reps] === "break"){
            minutes = 4;
            seconds = 0;
            minutesInterval = setInterval(minutesTimer, 60000);
            secondsInterval = setInterval(secondsTimer, 1000);
        } else {
            minutes = 14;
            seconds = 0;
            minutesInterval = setInterval(minutesTimer, 60000);
            secondsInterval = setInterval(secondsTimer, 1000);
        }      
    }
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
  document.getElementById("timer").textContent = minutes + ":" + seconds;
}

function resume(){
  minutesInterval = setInterval(minutesTimer, 60000);
  secondsInterval = setInterval(secondsTimer, 1000);
}
