<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange(
          $event.target.name, $event.target.files)"
      style="display:none"
    />
    <!-- error dialog displays any potential error messages -->
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{errorText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "image-input",
  data: () => ({
    errorDialog: null,
    errorText: "",
    uploadFieldName: "file",
    maxSize: 1024
  }),
  props: {
    // Use "value" to enable using v-model
    value: Object
  },
  methods: {
    getBase64Image(img) {
      // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    },
    getBase64Str(imgData) {
      return imgData.replace(/^data:image\/\w+;base64,/, "");
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },
    encodeImageFileAsURL(file) {
      // var file = element.files[0];
      var reader = new FileReader();
      let vm = this ;
      reader.onloadend = function() {
        //console.log("RESULT", reader.result);
        let imageData = reader.result;
        let imageURL = URL.createObjectURL(file);
        vm.$emit("input", { imageData,imageURL });
      };
      reader.readAsDataURL(file);
    },
    onFileChange(fieldName, file) {
      const { maxSize } = this;
      let imageFile = file[0];
      
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match("image.*")) {
          // check whether the upload is an image
          this.errorDialog = true;
          this.errorText = "Please choose an image file";
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            "Your file is too big! Please select an image under 1MB";
        } else {
            this.encodeImageFileAsURL(imageFile);
        }
      }
    }
  }
};
</script>
