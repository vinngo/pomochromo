import time 
import datetime

def countdown(m,s):

    total_seconds = m * 60 + s

    while total_seconds > 0:

        timer = datetime.timedelta(seconds = total_seconds)
        print(timer)
        time.sleep(1)
        total_seconds -= 1
    
    print('The timer is finished')

countdown(15,0)





while total_seconds > 0:
    timer = datetime.timedelta(seconds= total_seconds)
    print(timer)
    time.sleep(1)
    total_seconds -= 1

    print('Your break has finished')

fbreak = int(input("amount of time needed for break: "))
countdown(fbreak, 0)