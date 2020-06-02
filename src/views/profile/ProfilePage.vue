<template>
  <v-app id="app" class="mt-0">
    <v-container grid-list-xl>
      <image-input v-model="avatar">
        <div slot="activator">
          <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
            <span>Click to add avatar</span>
          </v-avatar>
          <v-avatar size="150px" v-ripple v-else class="mb-3">
            <img :src="avatar.imageURL" alt="avatar">
          </v-avatar>
        </div>
      </image-input>
      <v-slide-x-transition>
        <div v-if="avatar && saved == false">
          <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
        </div>
      </v-slide-x-transition>
    </v-container>
  </v-app>
</template>

<script>
import ImageInput from '../component/ImageInput.vue';
import { userService } from "../_services";
import { mapState, mapActions } from "vuex";
export default {
  name: 'app',
  data () {
    return {
      avatar: null,
      saving: false,
      saved: false,
      user : null
    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      games: state => state.games
    }),
    
  },
  components: {
    ImageInput
  },
  watch:{
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.account.user.avatar_base_64_str = this.getBase64Str(this.avatar.imageData)
      userService.change_avatar(this.account.user);
      this.saving = false
      this.saved = true
    },
    getBase64Str(imgData) {
      return imgData.replace(/^data:image\/\w+;base64,/, "");
    },
    init(){
      console.log(this.account.user)
      this.avatar = {};
      this.avatar.imageURL = this.account.user.avator;
    }
  },
  mounted() {
		this.init()
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
