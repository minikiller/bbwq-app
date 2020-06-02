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
                <b-input-group prepend="U">
                  <b-form-input
                    type="text"
                    v-model="username"
                    name="username"
                    placeholder="用户名"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && !username }"
                  />
                </b-input-group>
                <div v-show="submitted && !username" class="invalid-feedback">
                  请输入登陆用户名
                </div>
              </div>
              <div class="form-group">
                <b-input-group prepend="P">
                  <b-form-input
                    type="password"
                    v-model="password"
                    name="password"
                    placeholder="密码"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && !password }"
                  />
                </b-input-group>
                <div v-show="submitted && !password" class="invalid-feedback">
                  Password is required
                </div>
              </div>
              <div class="form-group">
                <!--<b-button block variant="success" :disabled="status.loggingIn">登录</b-button>-->
                <b-button
                  type="submit"
                  block
                  variant="success"
                  :disabled="status.loggingIn"
                  >登录</b-button
                >
              </div>
              <div>
                <router-link to="/register" class="btn btn-link"
                  >注册</router-link
                >
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
import { BButton } from "bootstrap-vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
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
  },
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
}</style
>>
