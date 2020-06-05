<template>
  <div>
    show me
    <b-button @click="test">click</b-button>
  </div>
</template>
<script>
export default {
  name: "hello",
  methods: {
    test() {
      this.$socket.emit("hello", "客户端需要帮助了");
    }
  },
  sockets: {
    //查看socket是否渲染成功
    connect() {
      console.log("链接成功");
    },
    disconnect() {
      console.log("断开链接");
    }, //检测socket断开链接
    reconnect() {
      console.log("重新链接");
    },
    helloMsg(msg) {
      console.log(msg);
    },
    //客户端接收后台传输的socket事件
    message(data) {
      console.log("data", data); //接收的消息
    }
  }
};
</script>