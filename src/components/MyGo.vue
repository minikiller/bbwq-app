<template>
  <div>
    <div style="width: 100%; margin: 0" ref="player"></div>
  </div>
</template>

<script>
import { initGame, initResumeGame, initGameData } from "../_helpers";
import { mapState, mapMutations } from "vuex";

export default {
  name: "mygo",
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users.all,
      games: (state) => state.games,
    }),
  },
  props: {
    total_time: String,
    blackOne: String,
    whiteOne: String,
    blackTwo: String,
    whiteTwo: String,
    gameStatus: String,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("games", ["updateGame", "updateNavTitle"]),
  },
  sockets: {
    view(msg) {
      // this.success(msg);
      this.updateGame(msg.game);

      //观战
      initGameData(this.account.user.name, this.games.game);
      initResumeGame(this.$refs.player, this.games.game, this.games.result);
      document.getElementById("wgo-control").style.display = "";
    },
  },
  mounted() {
    // document.getElementById("wgo-control").style.display = "none";
    if (this.$route.query.type == "resume") {
      initGameData(this.account.user.name, this.games.game);
      initResumeGame(this.$refs.player, this.games.game, this.games.result);
    } else if (this.gameStatus == "未开始") {
      initGame(this.$refs.player, {
        total_time: this.total_time,
        blackOne: this.blackOne,
        blackTwo: this.blackTwo,
        whiteOne: this.whiteOne,
        whiteTwo: this.whiteTwo,
      });
    }
  },
};
</script>
<style scoped>
@import "/static/wgo.player.css";
</style>
