<template>
  <b-row>
    <b-col sm="6">
      <b-card>
        <h2>用户注册</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <b-form-input
              type="text"
              v-model="user.name"
              v-validate="'required'"
              name="name"
              placeholder="用户名"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('name') }"
            >
            </b-form-input>
            <div
              v-if="submitted && errors.has('name')"
              class="invalid-feedback"
            >
              {{ errors.first("username") }}
            </div>
          </div>
          <div class="form-group">
            <b-form-input
              type="password"
              v-model="user.password"
              placeholder="密码"
              v-validate="{ required: true, min: 6 }"
              name="password"
              :class="{ 'is-invalid': submitted && errors.has('password') }"
            >
            </b-form-input>
            <div
              v-if="submitted && errors.has('password')"
              class="invalid-feedback"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <b-form-input
              type="text"
              v-model="user.mobile"
              v-validate="'required'"
              name="mobile"
              placeholder="手机号码"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('mobile') }"
            >
            </b-form-input>
            <div
              v-if="submitted && errors.has('mobile')"
              class="invalid-feedback"
            >
              {{ errors.first("mobile") }}
            </div>
          </div>
          <div class="form-group">
            <b-form-input
              v-model="user.email"
              name="email"
              v-validate="'required|email'"
              :class="{ 'is-invalid': submitted && errors.has('email') }"
              placeholder="电子邮件地址"
            >
            </b-form-input>
            <div
              v-if="submitted && errors.has('email')"
              class="invalid-feedback"
            >
              {{ errors.first("email") }}
            </div>
          </div>
          <div class="form-group">
            <b-form-select v-model="selected" :options="options">
            </b-form-select>
          </div>

          <div class="form-group">
            <b-button
              type="submit"
              block
              variant="success"
              :disabled="status.registering"
              >提交</b-button
            >
          </div>
          <div>
            <!--
                            <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            -->
            <router-link to="/login" class="btn btn-link">Cancel</router-link>
          </div>
        </form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        password: "",
        email: "",
        mobile: "",
      },
      selected: null,
      options: [
        { value: null, text: "选择您的棋力水平" },
        { value: "1", text: "业余1段" },
        { value: "2", text: "业余2段" },
        { value: "3", text: "业余3段" },
        { value: "4", text: "业余4段" },
        { value: "5", text: "业余5段" },
        { value: "6", text: "业余6段" },
        { value: "7", text: "业余7段" },
      ],
      submitted: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.register(this.user);
        }
      });
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.col-sm-6 {
  margin: 15px;
}
</style>
