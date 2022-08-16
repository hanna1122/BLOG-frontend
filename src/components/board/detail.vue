<template>
  <v-app id="modal">
    <v-container>
        <div class="modal" style="padding:120px;">
        <div class="overlay" @click="$emit('close-modal')"></div>
        <div class="modal-card">{{detailBoardId}}
            <VueCardCarousel
                class="vcc"
                :items="listOfTodos"
                :header-options="headerOpt"
                :footer-options="footerOpt"
            > 
            <template v-slot:header="slotProps">
                <strong>Header. Id: {{ slotProps.headerProp.id }}</strong>
            </template>
            <template v-slot:default="slotProps">
                <div v-for="n in 5" :key="n">
                {{ slotProps.bodyProp.cMainId }}. Hello from the Parent.
                </div>
            </template>
            <template v-slot:footer="slotProps">
                <strong>Footer. Id: {{ slotProps.footerProp.id }}</strong>
            </template>
            </VueCardCarousel>
            <slot />
             <!-- <v-card elevation="10" outlined width="100%" class="mx-auto">
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
             </v-card> -->
        </div>
        </div>
    </v-container>
  </v-app>
</template>
<script>
import { VueCardCarousel } from "vue-card-carousel";
import axios from 'axios';
import VueCookies from 'vue-cookies'

let config = {
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : VueCookies.get('accessToken')
    }
}

export default {
  name:'DetailView',
  components: {
    VueCardCarousel
  },
  data() {
    return {
      listOfTodos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      headerOpt: { isVisible: true, backgroundColor: "green" },
      footerOpt: { isVisible: false }
    };
  },
  props: ['detailBoardId'],
  created() {
    console.log('this.detailBoardId', this.detailBoardId);
  },
  mounted() { //페이지 시작하면은 자동 함수 실행
		this.fnGetDetail();
	},
  methods:{
		fnGetDetail() {
            let param ={};
            param.boardId = 1;
            axios.get("http://localhost:3000/board/detail?boardId="+this.detailBoardId, config)
			.then((res)=>{
				console.log(res);
			})
			.then((err)=>{
				console.log(err);
			})
        },
  }
};
</script>

<style scoped>
 
</style>