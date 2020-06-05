### ssh remote server and su
```
~$ su - sunlingfeng
sunlingfeng@hwsrv-719411:~$ tmux ls
falsk: 1 windows (created Mon May 18 11:25:13 2020) [179x36]
web: 1 windows (created Mon May 18 11:22:24 2020) [195x39]
webrtc-server: 1 windows (created Fri May  8 23:12:32 2020) [53x13]
websocket: 1 windows (created Mon May 18 11:23:10 2020) [179x36]
```
there are four sessions:
- falsk: python server for rest service
- web: frontend 
- websocket: chat websocket 
- webrtc-server: webrtc server(no need to update)

### update falsk
```
$ tmux a -t falsk
ctrl+c 
git pull
python3 api.py
```
### update web
```
$ tmux a -t web
ctrl+c 
git pull
npm run build # build dist and publish it to nginx
```
### update websocket

#### if you need to clear redis all key

```
redis-cli flushall
```

```
$ tmux a -t websocket
ctrl+c 
node api.js
```
