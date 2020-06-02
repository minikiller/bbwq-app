<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">下载</b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import config from "config";
import { authHeader, handleResponse } from "../_helpers";
import { userService } from "../_services";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  data() {
    return {
      name: "我的棋谱",
      fields: [
        {
          key: "black_info",
          label: "黑方信息"
          // sortable: true,
        },
        {
          key: "white_info",
          label: "白方信息"
        },
        {
          key: "result",
          label: "结果"
        },
        {
          key: "create_date",
          label: "创建时间",
          class: "my-class"
        },
        { key: "actions", label: "Actions" }
      ],
      items: []
    };
  },
  mounted() {
    this.getall();
    this.updateNavTitle(this.name);
  },
  methods: {
    ...mapMutations("games", ["updateGame", "updateNavTitle"]),
    info(item, index, event) {
      console.log(item, index, event);
      let id = item.id;
      let filename;
      const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
      fetch(`${config.apiUrl}/kifus/${id}`, requestOptions)
        .then(response => {
          if (response.status === 200) {
            filename = response.headers.get("x-suggested-filename");

            return response.blob();
          } else {
            return;
          }
        })
        .then(blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); //afterwards we remove the element again
        });
    },
    getall() {
      const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
      let _data = fetch(`${config.apiUrl}/kifus/`, requestOptions)
        .then(handleResponse)
        .then(data => {
          this.items = data.kifus;
          return data;
        });
    }
  }
};
</script>
<style>
.my-class {
  max-width: 300px;
}
</style>
