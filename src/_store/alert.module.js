import Vue from 'vue'

const state = {
  message: null,
};
const time_out = 10000;
const actions = {
  success({ commit }, message) {
    commit("success", message);
    setTimeout(() => {
      commit("clear");
    }, time_out);
  },
  error({ commit }, message) {
    commit("error", message);
    setTimeout(() => {
      commit("clear");
    }, time_out);
  },
  clear({ commit }) {
    commit("clear");
  },
};

const mutations = {
  success(state, message) {
    state.message = message;
    // setTimeout(() => {
    //   state.type = null;
    //   state.message = null;
    // }, time_out);
    Vue.notify({
      group: 'foo',
      type: 'success',
      title: '消息提醒',
      text: message,
      duration: 5000,
      speed: 1000
    })
  },
  error(state, message) {
    state.message = message;
    Vue.notify({
      group: 'foo',
      type: 'warn',
      title: '消息提醒',
      text: message,
      duration: time_out,
    })
  },
  clear(state) {
    state.type = null;
    state.message = null;
  },
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations,
};
