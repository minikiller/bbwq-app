<template src="./PlayPage.html"></template>
<script>
import MyGo from "../component/MyGo";
import Chat from "../component/Chat";
import MyVideo from "../component/MyVideo";
import WebRTC from "../component/webrtc";
import { gameService } from "../_services";
import { mapState, mapMutations } from "vuex";
import { EventBus } from "../index.js";
import {
  enable_board,
  initGameData,
  showScore,
  getResult,
  setPassedStatus,
  readyMove,
  gameResign,
  toggleCoordinates,
  showMarker,
} from "../_helpers";

// import { WebRTC } from "plugin";
import { find, head } from "lodash/core";
import Vue from "vue";
Vue.component(WebRTC.name, WebRTC);

export default {
  name: "playPage",
  computed: {
    ...mapState({
      account: (state) => state.account,
      games: (state) => state.games,
    }),
  },
  methods: {
    ...mapMutations("alert", ["success", "error", "clear"]),
    ...mapMutations("games", [
      "updateGame",
      "updateNavTitle",
      "setResult",
      "setTurn",
    ]),
    setButtonStatus() {
      this.btnText = "认输";
      this.canBegin = true;
      if (
        this.account.user.name == this.game.blackone_id ||
        this.account.user.name == this.game.whiteone_id
      ) {
        this.btnBeginDisable = false;
      } else {
        this.btnBeginDisable = true;
      }
      this.btnQuitDisable = true;
    },
    // 显示分数
    getScore() {
      if (this.endText == "开始数目") {
        this.endText = "结束数目";
        showScore();
      } else if (this.endText == "结束数目") {
        let _result = this.matchResult(this.games.result);
        // let _result="balck";
        this.$bvModal
          .msgBoxConfirm(_result, {
            title: "请确认",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确定",
            cancelTitle: "取消",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              //this.setResult(result);
              showScore();
              this.endText = "开始数目";
              this.canEnd = false;
              this.$socket.emit("resultGame", {
                userId: this.account.user.name,
                gameId: this.game_id,
                result: this.games.result,
                turn: this.games.turn,
              });
            }
          })
          .catch((err) => {
            // An error occurred
          });
      }

      // this.score_selected = !this.score_selected;
    },
    test() {
      // this.$refs["modal"].show();
      // alert(testStore());
      this.$socket.emit("hello", {
        userId: this.account.user.name,
        gameId: this.game_id,
      });
    },
    passed() {
      setPassedStatus();
      this.setResult("passed");
      this.btnPassedDisable = true;
      this.$socket.emit("passedGame", {
        userId: this.account.user.name,
        gameId: this.game_id,
      });
    },
    begin() {
      if (this.btnText == "开始") {
        console.log("game is begin,text is {}".format(this.btnText));
        this.btnText = "准备中";
        this.success("等待其他对局者进入对局！");
        this.$refs.quit.disabled = true;
        this.$socket.emit("prepareGame", {
          userId: this.account.user.name,
          gameId: this.game_id,
        });
      } else if (this.btnText == "认输") {
        this.$bvModal
          .msgBoxConfirm("你想认输吗？", {
            title: "请确认",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "确定",
            cancelTitle: "取消",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              var result = getResult();
              this.setResult(result);
              this.$socket.emit("resignGame", {
                userId: this.account.user.name,
                gameId: this.game_id,
                result: result,
              });
            }
          })
          .catch((err) => {
            // An error occurred
          });
      }
    },
    exit() {
      console.log(`${this.account.user.name} is me`);
      this.$socket.emit("logout", {
        userId: this.account.user.name,
        gameId: this.game_id,
      });
      this.$router.push({ path: "/" });
    },

    checkResult(msg) {
      //判断是黑还是白，需要确定
      var result = this.matchResult(msg.result);
      this.$bvModal
        .msgBoxConfirm(result, {
          title: "请确认",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "确定",
          cancelTitle: "取消",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            //同意数子结果，对局结束
            this.$socket.emit("finishGame", {
              userId: this.account.user.name,
              gameId: this.game_id,
              result: result,
            });
          } else {
            //不同意结果，继续数子
            this.$socket.emit("noagreeGame", {
              userId: this.account.user.name,
              gameId: this.game_id,
              result: "数子结果未达成一致，继续数目",
            });
            this.success("数子结果未达成一致，继续数目");
            this.canEnd = true;
            this.endText = "开始数目";
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    matchResult(value) {
      //正则表达式返回对局结果
      var _result = value.match(">([黑白]胜.*)<");
      if (_result) return _result[1];
      else return "";
    },
    //对局结束，保存棋谱
    finishGame(msg) {
      this.error("对局结束： " + msg.result);
      console.log("game is over,result is {}".format(msg.result));
      this.btnQuitDisable = false;
      this.btnBeginDisable = true;
      // this.score_selected = false;
      this.canEnd = false;
      this.canBegin = false;
      if (this.isOpponent) {
        let save_data = {
          black_info: this.game.blackone_id + "&" + this.game.blacktwo_id,
          white_info: this.game.whiteone_id + "&" + this.game.whitetwo_id,
          kifu_data: this.games.game.kifu,
          result: msg.result,
        };

        gameService.saveKifu(save_data).then((data) => {
          this.success(data.message);
        });

        gameService.completeGame(this.game_id).then((msg) => {
          console.log(msg);
        });
      }
    },
    toggleMarker(checked) {
      showMarker(checked);
    },
    toggleAll(checked) {
      toggleCoordinates(checked);
    },
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onJoin() {
      this.$refs.webrtc.join();
    },
    onLeave() {
      this.$refs.webrtc.leave();
    },
    onShareScreen() {
      this.img = this.$refs.webrtc.shareScreen();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
    hello(msg) {
      alert(msg);
      // removeUser(msg);
    },
  },
  sockets: {
    move(game) {
      readyMove(game);
      this.updateGame(game);
    },
    //棋手对局进入准备状态
    prepare(msg) {
      this.success(msg);
    },

    //棋局正式开始
    beginGame(game) {
      this.success("对局正式开始");
      this.setButtonStatus();
      gameService.beginGame(this.game_id).then((msg) => {
        console.log(msg);
      });
      initGameData(this.account.user.name, game);
      enable_board();
    },

    //棋局数目开始,黑1开始数目
    endGame(msg) {
      console.log("begin to end game");
      this.success(msg);
      if (this.account.user.name == this.game.blackone_id) {
        this.canEnd = true; //启用数目按钮
        this.endText = "开始数目";
      } else {
        this.canEnd = false;
      }
    },

    //是否同意对局结果
    resultGame(msg) {
      this.setTurn();
      this.success(msg.userId + "=>" + msg.result);
      if (
        this.games.turn == "white" && //需要白确认并且是白1
        this.account.user.name == this.game.whiteone_id
      ) {
        this.checkResult(msg);
      } else if (
        this.games.turn == "black" &&
        this.account.user.name == this.game.blackone_id //需要黑确认并且是黑1
      ) {
        this.checkResult(msg);
      }
    },

    //数子结束
    finishGame(msg) {
      this.finishGame(msg);
      console.log("game is over! result is " + msg.result);
    },

    //test
    helloMsg(msg) {
      alert("game is helloMsg " + msg);
    },

    //数子结果未得到双方认可
    noagreeGame(msg) {
      this.success(msg.result);
      this.setTurn();
      if (
        this.games.turn == "white" && //需要白确认并且是白1
        this.account.user.name == this.game.whiteone_id
      ) {
        this.canEnd = true; //启用数目按钮
        this.endText = "开始数目";
      } else if (
        this.games.turn == "black" &&
        this.account.user.name == this.game.blackone_id //需要黑确认并且是黑1
      ) {
        this.canEnd = true; //启用数目按钮
        this.endText = "开始数目";
      }
    },

    //棋局进入计算最终结果状态
    passed(msg) {
      this.success(msg);
    },

    //棋局正式结束
    resign(msg) {
      // this.success(msg);
      gameResign(msg.result);
      this.finishGame(msg);
    },
  },
  props: ["game_id"],
  data() {
    return {
      status: "not_accepted",
      btnBeginDisable: false, //开始按钮的控制状态
      btnQuitDisable: false, //退出按钮的控制状态
      btnPassedDisable: false, //终局按钮的控制状态
      // score_selected: false, //数目按钮的控制状态
      btnText: "开始",
      isOpponent: false, //是否为对局者
      game: null, //本对局的对局信息
      gameUser: [], //本对局的对手信息
      userStatus: {}, //对局用户的准备状态
      currentUsers: [], //进入对局室的所有人
      canBegin: false, //是否可以开始新对局
      canEnd: false, //是否可以开始数目
      endText: "开始数目",
      kifu: "", //棋谱
      img: null,
      status: false,
    };
  },
  beforeDestroy() {
    console.log("destroy is called");
    // this.$socket.removeListener("helloMsg", this.hello);
  },
  created() {
    //数子结束，双方达成一致
  },
  mounted() {
    // this.$socket.on("helloMsg", this.hello);
    gameService.getById(this.game_id).then((data) => {
      this.game = data;
      this.gameUser.push(this.game.blackone_id);
      this.gameUser.push(this.game.blacktwo_id);
      this.gameUser.push(this.game.whiteone_id);
      this.gameUser.push(this.game.whitetwo_id);
      /* this.userStatus[this.game.blackone_id] = false;
      this.userStatus[this.game.blacktwo_id] = false;
      this.userStatus[this.game.whiteone_id] = false;
      this.userStatus[this.game.whitetwo_id] = false; */
      //如果是对局者，给出提示信息
      this.isOpponent =
        this.gameUser.indexOf(this.account.user.name) != -1 ? true : false;
      if (this.isOpponent) {
        console.log("it is openent in game");

        if (this.game.status == "未开始") {
          this.success("对局者请点击开始按钮，进入对局！");
        } else if (this.game.status == "进行中") {
          this.success("对局成功恢复，请继续对局！");
          this.setButtonStatus();
        }
      } else {
        //观战者
        if (this.game.status == "未开始") {
          this.success("对局还未开始，准备中！");
        } else if (this.game.status == "进行中") {
          this.success("对局正在进行中，请欣赏对局！");

          this.$socket.emit("view", {
            userId: this.account.user.name,
            gameId: this.game_id,
          });
        } else {
          //已结束
          this.success("对局已经结束！");
        }
      }
      this.updateNavTitle(this.game.name);
      return data;
    });

    EventBus.$on("move", (game) => {
      this.$socket.emit("move", game);
      this.updateGame(game);
    });
    EventBus.$on("showScore", (msg) => {
      this.success(msg);
      this.setResult(msg);
    });
    //超时判负
    EventBus.$on("timeout", (msg) => {
      this.setResult(msg);
      this.error(msg);
      this.$socket.emit("resignGame", {
        userId: this.account.user.name,
        gameId: this.game_id,
        result: msg,
      }); //发送信息
    });
  },
  components: {
    MyGo,
    Chat,
    MyVideo,
  },
};
</script>
