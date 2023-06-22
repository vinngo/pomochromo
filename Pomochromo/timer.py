import time 
import datetime

running = False
reps = 0
paused = False


def startTimer():
    global running 
    running = True

def pauseTimer():
    global paused
    paused = True

def resumeTimer():
    global paused
    paused = False


def worktime():

    total_seconds = 25 * 60

    while total_seconds > 0 or running:
        if not paused: 
            timer = datetime.timedelta(seconds = total_seconds)
            print(timer)
            time.sleep(1)
            total_seconds -= 1 
        else:
            time.sleep(1)

    if total_seconds == 0:
        print('The timer is finished')

def shortbreak(m):

    total_seconds = 60 * m

    while total_seconds > 0 and running == bool(1):
        timer = datetime.timedelta(seconds= total_seconds)
        print(timer)
        time.sleep(1)
        total_seconds -= 1

    print('Your break has finished')


#for i in range(4):
 #   if running != bool(1):
  #      break
   # worktime()
    #shortbreak()

while True:
    if (input("start timer? (y,n)") == 'y'):
        startTimer()
        worktime()

