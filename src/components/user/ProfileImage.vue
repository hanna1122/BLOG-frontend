<template>
  <v-app id="modal">
    <v-container>
        <div class="modal" style="padding:120px;">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="modal-card">
            <slot />
             <v-card elevation="10" outlined width="100%" class="mx-auto">
                <v-card-text>
                    <v-file-input label="File input" v-model="file" @change="previewFile(file)">
                    </v-file-input>
                    <v-row class="justify-center">
                            <div class="img" style="background:#BDBDBD;" >
                                <img class="userImg" :src="preview"/>
                            </div>
                    </v-row>
                </v-card-text>
                <v-btn class="mr-6 mb-2" @click="$emit('close-modal')" >닫기</v-btn>
                <v-btn class="ml-5 mb-2" @click="saveProfileImg()">저장</v-btn>
             </v-card>
        </div>
        </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

let config = {
    headers:{
        'Content-Type' : 'multipart/form-data',
        'Authorization' : VueCookies.get('accessToken')
    }
}

export default {
  name: 'profileImage',
  data:()=>({
    preview: '',
    file:'',
    saveFile: null
  }),
  methods: {
    handleWrapperClick(){
      this.$emit('update:visible', false)
    },
     previewFile(file){
     
      console.log("file    ", file[0]);
      const fileData = (data) => {
        this.preview = data
      }
      const reader = new FileReader()
      reader.readAsDataURL(file[0])
      reader.addEventListener("load", function () {
        fileData(reader.result)
      }, false);
    },
    saveProfileImg(){
        const formData = new FormData();

        formData.append("files", this.file[0]);
        axios.post("http://localhost:3000/profile/img-put", formData, config)
        .then((res)=>{
				console.log(res);
        })
        .then((err)=>{
          console.log(err);
        })
    }
  },
}
</script>
