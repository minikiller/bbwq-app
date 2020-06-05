<template>
  <b-row>
    <b-col sm="6">
      <b-card>
        <div>
          <div class="logo">
            <img src="/static/img/logo.png" width="240" />
          </div>
          <div>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="person-fill"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    type="text"
                    v-model="username"
                    name="username"
                    placeholder="用户"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && !username }"
                  />
                </b-input-group>
                <div v-show="submitted && !username" class="invalid-feedback">请输入登陆用户名</div>
              </div>
              <div class="form-group">
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="lock-fill"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    v-model="password"
                    name="password"
                    placeholder="密码"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && !password }"
                  />
                </b-input-group>
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
              </div>
              <div class="form-group">
                <!--<b-button block variant="success" :disabled="status.loggingIn">登录</b-button>-->
                <b-button type="submit" block variant="success" :disabled="status.loggingIn">登录</b-button>
              </div>
              <div>
                <router-link to="/register" class="btn btn-link">
                  <b-button variant="outline-info" class="mb-2">
                    <b-icon icon="person-plus-fill"></b-icon>&nbsp注册
                  </b-button>
                </router-link>

                <b-button variant="outline-info" class="mb-2" @click="test">
                  <b-icon icon="person-plus-fill"></b-icon>test
                </b-button>
              </div>
            </form>
          </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    },
    test() {
      if ("vibrate" in window.navigator) {
        // window.navigator.vibrate(100); 震动
        window.navigator.vibrate([200, 100, 200]); // 震动200停100再震动200，和qq的消息震动一样
      } else {
        console.log("浏览器不支持震动");
      }
    }
  }
};
</script>

<style scoped>
.logo {
  margin-bottom: 1rem;
  vertical-align: middle;
  text-align: center;
}
.col-sm-6 {
  margin: 15px;
}
</style>

