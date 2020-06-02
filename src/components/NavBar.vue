<template>
  <b-navbar v-if="account.user" toggleable="lg" type="dark" variant="info">
    <b-container>
      <b-navbar-brand href="#">{{ games.navTitle }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/creategame">新建對局</b-nav-item>
          <b-nav-item href="/">对局日程</b-nav-item>
          <b-nav-item href="/kifu">我的棋谱</b-nav-item>
          <b-nav-item href="/kifu">我的棋友</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text>
            <div v-if="account.user">
              <b-avatar variant="info" :src="account.user.avatar"></b-avatar>
              {{ account.user.name }}[6D]
            </div>
          </b-nav-text>
          <b-nav-item href="/profile">修改个人信息</b-nav-item>
          <b-nav-item @click="logout">退出</b-nav-item>
        </b-navbar-nav>
        <!--
              <template slot="button-content">
                {{ account.user.name }}
              </template>
              <b-dropdown-item>
                <router-link :to="{ path: '/' }" replace>首页</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link :to="{ path: '/game' }" replace
                  >创建新游戏</router-link
                >
              </b-dropdown-item>
              <b-dropdown-item href="/kifu">
                我的棋谱
              </b-dropdown-item>
              <b-dropdown-item @click="logout">退出</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        -->
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import { mapState } from "vuex";
import { userService } from "../_services";
export default {
  name: "navBar",
  computed: {
    ...mapState({
      account: state => state.account,
      games: state => state.games
    })
  },
  data() {
    return {
      meal: ""
    };
  },
  methods: {
    getMeal() {
      //   ...
    },
    logout() {
      userService.logout();
      location.reload(true);
    }
  }
};
</script>

<style scoped>
.li.navbar-text {
  padding: 8px;
}
</style>
