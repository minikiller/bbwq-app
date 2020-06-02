<template>
  <b-container fluid>
    <b-row sm="6">
      <b-col>
        <b-card>
          <b-container fluid>
            <b-row>
              <b-col cols="8"
                ><b-row
                  ><b-col>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <v-select
                        label="name"
                        :filterable="false"
                        :clearable="false"
                        :options="options"
                        @search="onSearch"
                      >
                        <template slot="no-options">請選擇棋友 </template>
                        <template slot="option" slot-scope="option">
                          <div class="d-center">{{ option.name }}</div>
                        </template>
                      </v-select>
                    </b-form></b-col
                  ></b-row
                ><b-row
                  ><b-col>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <v-select
                        label="name"
                        :filterable="false"
                        :clearable="false"
                        :options="options"
                        @search="onSearch"
                      >
                        <template slot="no-options">請選擇棋友 </template>
                        <template slot="option" slot-scope="option">
                          <div class="d-center">{{ option.name }}</div>
                        </template>
                      </v-select>
                    </b-form></b-col
                  ></b-row
                ><b-row
                  ><b-col>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <v-select
                        label="name"
                        :filterable="false"
                        :clearable="false"
                        :options="options"
                        @search="onSearch"
                      >
                        <template slot="no-options">請選擇棋友 </template>
                        <template slot="option" slot-scope="option">
                          <div class="d-center">{{ option.name }}</div>
                        </template>
                      </v-select>
                    </b-form></b-col
                  ></b-row
                ><b-row
                  ><b-col>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                      <v-select
                        label="name"
                        :filterable="false"
                        :clearable="false"
                        :options="options"
                        @search="onSearch"
                      >
                        <template slot="no-options">請選擇棋友 </template>
                        <template slot="option" slot-scope="option">
                          <div class="d-center">{{ option.name }}</div>
                        </template>
                      </v-select>
                    </b-form></b-col
                  ></b-row
                ></b-col
              >
              <b-col cols="4" align-self="center">
                <b-container>
                  <b-row
                    ><b-col class="avatars_l"
                      ><b-avatar
                        badge="1"
                        badge-variant="dark"
                        size="3rem"
                      ></b-avatar></b-col
                    ><b-col class="avatars_r"
                      ><b-avatar
                        badge="2"
                        badge-variant="light"
                        size="3rem"
                      ></b-avatar></b-col
                  ></b-row>
                  <b-row
                    ><b-col class="avatars_l"
                      ><b-avatar
                        badge="4"
                        badge-variant="light"
                        size="3rem"
                      ></b-avatar></b-col
                    ><b-col class="avatars_r"
                      ><b-avatar
                        badge="3"
                        badge-variant="dark"
                        size="3rem"
                      ></b-avatar></b-col
                  ></b-row>
                </b-container>
              </b-col>
            </b-row>
          </b-container> </b-card
      ></b-col>
      <b-col> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import "vue-select/dist/vue-select.css";
import _ from "lodash";
import { mapState, mapMutations } from "vuex";

export default {
  mounted() {
    this.updateNavTitle(this.name);
  },
  data() {
    return {
      name: "新建对局",
      selected: null, // this needs to be filled with the selected value (id or object), but it stays empty
      options: [],
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      show: true,
    };
  },
  methods: {
    ...mapMutations("games", ["updateGame", "updateNavTitle"]),

    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce((loading, search, vm) => {
      fetch(
        `https://localhost:5000/users/data?userName=${escape(search)}`
      ).then((res) => {
        res.json().then((json) => {
          vm.options = json;
        });
        loading(false);
      });
    }, 350),

    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.col {
  padding: 0.25rem 1rem;
}
.b-avatar {
  margin: 0.5rem;
}
.avatars_l {
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
}
.avatars_r {
  padding: 0.25rem 0.75rem 0.25rem 0.25rem;
}
</style>
