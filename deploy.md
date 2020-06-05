## how to deploy bibweiqi

```
sunlingfeng@hwsrv-719411:~$ tmux ls
falsk: 1 windows (created Mon May 18 11:25:13 2020) [179x36]
web: 1 windows (created Mon May 18 11:22:24 2020) [195x39]
webrtc-server: 1 windows (created Fri May  8 23:12:32 2020) [53x13]
websocket: 1 windows (created Mon May 18 11:23:10 2020) [179x36]
```

### web

```
tmux new -s web
cd project
git clone https://github.com/minikiller/vue-bibiweiqi
cd vue-bibiweiqi
yarn
npm run start
```

### websocket

```
tmux new -s websocket
cd project/vue-bibiweiqi
node app.js
```

### flask
```
tmux new -s flask
cd project
git clone https://github.com/minikiller/flask-app
cd falsk-app
python3 api.py
```

### webrtc-server

```
tmux new -s webrtc-server
cd project
git clone https://github.com/muaz-khan/RTCMultiConnection
cd RTCMultiConnection
```

#### copy certficate

```
 cp ~/project/privkey.pem .
 cp ~/project/cert.pem .
```

#### change config.json

```

  "socketURL": "/",
  "dirPath": "",
  "homePage": "/demos/index.html",
  "socketMessageEvent": "RTCMultiConnection-Message",
  "socketCustomEvent": "RTCMultiConnection-Custom-Message",
  "port": "9001",
  "enableLogs": "false",
  "autoRebootServerOnFailure": "false",
  "isUseHTTPs": "true",  <------------- need to change
  "sslKey": "./fake-keys/privkey.pem",   <------------- need to change
  "sslCert": "./fake-keys/cert.pem", <------------- need to change
  "sslCabundle": "",
  "enableAdmin": "true",
  "adminUserName": "username",
  "adminPassword": "password"

```

#### run rtcwebsocket

```
npm run serve
```