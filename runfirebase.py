import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import subprocess
import re
import time
import signal
import os


class FirebaseLocalhost:
    def __init__(self):
        self.init_firebase()
        self.process = None
       
    def init_firebase(self):
        certificate = {
						"type": "service_account",
						"project_id": "rotator-antena",
						"private_key_id": "5c07dbb6f2e2e6c986a43ba3deb2e50d41359604",
						"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfYl0+XXNTigNt\nQIXV+2+5opsZ6N7CXpt9sTqgXLbUe29/uJvG0r5gd1cCcWHy4tqb7zylNvTKLETo\n2tB/wiy7HhVkMouaqqwYFsXNeB3KAtNajh1SJ28uNKEaSoyMUz0+/QHQt306fa4e\nLHscc55evLb7Sm+LSTXQZWeCTEmfRkkw+HCqvq1qiauZRkTN5d1IoWUWmWnPRJi3\ncpISpf2doLVFS4aXS1St17N8896eilQYsGWgzYXnWwUH50HJzwodPJFqq3t6Aqfn\nG5syrN61SjGpw8RYl0U1a+qSnNklGf14mh044sVCdKbao9EjGJjuA4HNtCKc69mS\nUifMbwTDAgMBAAECggEADDJDvlz6UT8zae3REAHQl9z4j3ABc9A3h9PDD7hoiTP0\n4UooKXvA87LOJrK0cxim793LvzzIWJwwnbz4zX33XE4+Bs/TXP+IccN0WXfCl83F\njJ1pYvr/iAKg/VkNDkPkYOiNdgJEg/BQHaD7vr6eNNOuEOauSHNOuea4mADsdVKV\npVP+AT7HFnLD+T2t9yVAzn+VAXzlJ/J8yjLJyVrxXOluqSOnNf2EGgtOlqi27wm3\nGzvHB0Cr6cpBdGFNa8lkfesp4fyRgcoBgDLm7wFnRk4WFL2CGOt2NubRpL241XTw\nXoTrSnqreGlFeTyD1ZYYpwXYKgbgrLyoH+w3OJD74QKBgQDOS4c+f2s1NYiSHSUb\nYEIrQQhj9iVpGQ96hR9YLgomL1Wmso1sCPOnoCpE/UdzgvpRCKa5dqJCUAZwbTms\nksfIwzjZP1yaII26yRQErcYzuK2Z2yJliVWZX22kuGIOH75QqcvLhFRL3oG/r8ou\nAKDa/3qlN/83nkQYxelHpGADEQKBgQDFyVV15XQ5go1NwaxOFr8cKzVi4MBwJ7Pu\niOwPq4BKZVHEERFK0EIHBTvfAfsNJJ2iVNrZZAU5xD41n+WxipoAMy96CZgbeTuV\n+EkTBvOEdhW1He1WHBrERNB0vGZOgi3lFtF+ZuqQtvbW6JeHJ+HbLPCHPbMlg52N\nAeOv4JUikwKBgQCtLwbo1rs/viNa1pDSPKsP+NZ8ZKXfZyRxbNR1iKEIkXBMM1U6\nPwGd1X3m0OJs/KX75VFiHU/2b4wYUfm7ALYruog9CU5KLc4N4sSlcOUVgpJquWZU\n60grK8u2Hvxicw+oVAM8ZWkHEFLIg2Et4WUotJVXonzlSj5MtckzVbEsoQKBgQCF\nq6A6Yay/AWCGYJIW5ICchQc7oDHumqacW6VOodW+ceNk4zQQn9c/72WbPjdxloGC\nqF6P9W0isWJp03rlFosl/3HixIEscC65GGgql9QUfcoF8gfo3m2on+lSO9HY1Vo3\nLci/6MY2r7D7ZY6jJW0bN7AHdseQXvcnyVMcFmg0SQKBgCBsVYI7j6B/wYRNB5Jy\nWTlSVpKy3tGHral5o9tEALacYZartV/DOu5KRwm2DMtxKTXBsVrge1MbZZi62lfD\n36EkhlWqNgLraMtoCahVqNVgyrzknZtTBuL55IjxmuFzv5XPjft6l/1yGHsp7bxX\nCEx1FgyOOSYn6+08PGz6xtn9\n-----END PRIVATE KEY-----\n",
						"client_email": "firebase-adminsdk-gl3ag@rotator-antena.iam.gserviceaccount.com",
						"client_id": "113103775624449184445",
						"auth_uri": "https://accounts.google.com/o/oauth2/auth",
						"token_uri": "https://oauth2.googleapis.com/token",
						"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
						"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gl3ag%40rotator-antena.iam.gserviceaccount.com",
						"universe_domain": "googleapis.com"
					}
        cred = credentials.Certificate(certificate)
        self.online_host = firebase_admin.initialize_app(cred, {
                            'databaseURL': 'https://rotator-antena-default-rtdb.firebaseio.com/'
                            }, name="online_host")
        self.localhost = firebase_admin.initialize_app(cred, {
                            'databaseURL': 'http://127.0.0.1:9000/?ns=rotator-antena'
                            }, name="localhost")
        self.ref_host = db.reference(app=self.online_host)
        self.ref_localhost = db.reference(app=self.localhost)
    def run(self):
        try:
            os.chdir("/home/pi/localhost/rotator_antena_localhost")
            process = subprocess.Popen(["/home/pi/.npm-global/bin/firebase emulators:start"], shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1, universal_newlines=True)
            print("start firebase")
            while True:
                output = process.stdout.readline()
                if process.poll() is not None:
                    break
                if output:
                    print(output.strip())
                    

                    # Menggunakan regular expression untuk mengecek status Firebase Emulator
                    if re.search(r'✔  All emulators ready!', output):
                        print("Firebase Emulator is ready")
                        #self.status_initialized = True

                        previous_input_degree = self.ref_host.child('input_degree').get()
                        self.ref_localhost.update({
                            'degree': 0,
                            'input_degree': previous_input_degree,
                            'kanan': "false",
                            'kiri': "false",
                            'stop': "false",
                        
                        })
                        process_2 = subprocess.Popen(["python /home/pi/localhost/rotator_antena_localhost/anthenamonitor.py"], shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1, universal_newlines=True)
                        output_2 = process_2.stdout.readline()
                        if process_2.poll() is not None:
                            break
                        if output_2:
                            print(output_2.strip())
                        #TODO:
                        #run anthenamonitor.py
                        #but this program is still running too so  justlike run anthenamonitor in other terminal
        except Exception as e:
            print("Error:", e)
            self.stop_firebase_emulator()
            
            
    def stop_firebase_emulator(self):
        try:
            if self.process:
                self.process.send_signal(signal.SIGINT)  # Send a SIGINT signal to gracefully stop the emulator
        except Exception as e:
            print("Error stopping Firebase Emulator:", e)
			
if __name__ == "__main__":
    print("test")
    firebaselocal = FirebaseLocalhost()
    firebaselocal.run()
