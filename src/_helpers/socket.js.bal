/**
 * 处理websocket相关的业务方法
 */
import config from "config";
import io from "socket.io-client";
// export let socketServer = "dfdfdf";

export let socket ;
// export let socket = io.connect(`${config.socketUrl}`);

import { EventBus } from "../index.js";
import { readyMove, gameResign } from "./go";
// var connection = new RTCMultiConnection();

//////////////////////////////
// Socket.io handlers
//////////////////////////////
// socket.removeAllListeners();

socket.on("initGameUser", function(msg) {
  EventBus.$emit("initGameUser", msg);
});

//用户进入对局室
socket.on("joinlobby", function(msg) {
  EventBus.$emit("joinlobbye", msg);
  // addUser(msg);
});
//用户立刻对局室
socket.on("leavelobby", function(msg) {
  EventBus.$emit("leavelobby", msg);
  // removeUser(msg);
});
//用户准备开始对局
socket.on("prepare", function(msg) {
  EventBus.$emit("prepare", msg);
  // removeUser(msg);
});

//用户准备开始对局
socket.on("passed", function(msg) {
  EventBus.$emit("passed", msg);
  // removeUser(msg);
});

//全部用户准备开始对局
socket.on("beginGame", function(msg) {
  EventBus.$emit("beginGame", msg);
  // removeUser(msg);
});

//全部用户准备开始终局
socket.on("endGame", function(msg) {
  EventBus.$emit("endGame", msg);
  // removeUser(msg);
});

//数子双方未达成一致
socket.on("noagreeGame", function(msg) {
  EventBus.$emit("noagreeGame", msg);
  // removeUser(msg);
});

//数子结束，双方达成一致
socket.on("finishGame", function(msg) {
  EventBus.$emit("finishGame", msg);
  // removeUser(msg);
});

/* export function hello(msg) {
  EventBus.$emit("helloMsg", msg);
  // removeUser(msg);
}

//数子结束，双方达成一致
socket.on("helloMsg", hello);
 */
//确认数子结果
socket.on("resultGame", function(msg) {
  EventBus.$emit("resultGame", msg);
  // removeUser(msg);
});

socket.on("resign", function(msg) {
  gameResign(msg.result);
  EventBus.$emit("resign", msg);
});

socket.on("joingame", function(msg) {
  console.log("joined as game id: " + msg.game.id);
  playerColor = msg.color;
  game = msg.game;
  initGame(msg.game, playerColor);
  renderRoom(msg);
});

// socket.on("joingame", function(msg) {
//   console.log("joined as game id: " + msg.game.id);
//   playerColor = msg.color;
//   game = msg.game;
//   initGame(msg.game, playerColor);
// });

socket.on("view", function(msg) {
  console.log("viewed as game id: " + msg.gameId);
  EventBus.$emit("view", msg);
});

socket.on("move", function(msg) {
  readyMove(msg);
  EventBus.$emit("move", msg);
});

socket.on("logout", function(msg) {
  // removeUser(msg.username);
  console.log(msg.username + " logout");
});

//Listen on new_message
socket.on("get_message", function(msg) {
  EventBus.$emit("get_message", msg);
});

//Listen on new_message
socket.on("resume", function(msg) {
  EventBus.$emit("resume", msg);
});
