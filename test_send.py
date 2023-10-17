import firebase_admin
from firebase_admin import credentials
import random
import time
from firebase_admin import db

cred = credentials.Certificate("rotator-antena-firebase-adminsdk-gl3ag-532f19e764.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'http://127.0.0.1:9000/?ns=rotator-antena'
})
def updateData(data):
    # Mendapatkan referensi ke lokasi database yang diinginkan
    ref = db.reference('/')

    # Mengirim data update ke Firebase Realtime Database
    ref.update(data)
while True:
    data = random.randint(0,99)
    print("Send {} to firebase".format(data))
    updateData({"degree" : data})
    time.sleep(1)


