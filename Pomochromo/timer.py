import time 
import datetime


def worktime():

    total_seconds = 25 * 60

    while total_seconds > 0:

        timer = datetime.timedelta(seconds = total_seconds)
        print(timer)
        time.sleep(1)
        total_seconds -= 1
    
    print('The timer is finished')

def shortbreak():

    total_seconds = 300

    while total_seconds > 0:
        timer = datetime.timedelta(seconds= total_seconds)
        print(timer)
        time.sleep(1)
        total_seconds -= 1

    print('Your break has finished')


for i in range(4):
    worktime()
    shortbreak()
