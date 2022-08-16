<template>
	<div id="app">
		
		<v-container v-for="(row, idx) in list" :key="idx">
			
					<v-card outlined title>
						<v-card-title>{{row.title}}</v-card-title>
						
						{{row.nickname}}
						{{row.regDt}}<br/>
						<img class="imgsrc" v-bind:src="row.fileSrc" @click="showModal(row.boardId)"/>
                            <DetailView  :detailBoardId="detailBoardId" v-if="isModalViewed" @close-modal="isModalViewed=false">
                            </DetailView>
						<br/>
						{{row.hit}}
						<span @click="likeUpdate(row.boardId, row.likeYn, row.likeId, idx)">
						
						<font-awesome-icon class="like" :icon="['fas','heart']" v-if="row.likeYn=='Y'" size="lg" :style="{ color: 'red' }" />	
						
						<font-awesome-icon :icon="['far','heart']" v-if="row.likeYn=='N'" size="lg" />
						</span>
						{{row.likeCount}}개
					</v-card>
			
		</v-container>

		
	</div>
</template>

<script>
import axios from 'axios';
import DetailView from "@/components/board/detail.vue"
import VueCookies from 'vue-cookies'

let config = {
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : VueCookies.get('accessToken')
    }
}
export default {
    name:'ListView',
	data() {
		return{
			list:'', 
			isModalViewed: false,
			detailBoardId: ''
		}
	},
	mounted() { 
		this.fnGetList();
	},
	components:{
        DetailView
    },
	methods:{
		fnGetList() {
			axios.get("http://localhost:3000/board/get", config)
			.then((res)=>{
				console.log(res);
				this.list = res.data;
			})
			.then((err)=>{
				console.log(err);
			})
		},
		likeUpdate(boardId, likeYn, likeId, idx){
			let likeRequest ={};
			likeRequest.boardId = boardId;
			if(likeYn == 'Y'){
				likeRequest.likeYn = 'N';

			}else{
				likeRequest.likeYn = 'Y';
			}
			if(likeId == null){
				axios.post("http://localhost:3000/like/post",  JSON.stringify(likeRequest), config)
				.then((res)=>{
					console.log(res);
					if(likeYn=='Y'){
						this.list[idx].likeCount--;
						this.list[idx].likeYn = 'N'
					}
					else{
						this.list[idx].likeCount++;
						this.list[idx].likeYn = 'Y'
					}
				})
				.then((err)=>{
					console.log(err);
				})
			}else{
				likeRequest.likeId=likeId;
				axios.put("http://localhost:3000/like/update",  JSON.stringify(likeRequest), config)
				.then((res)=>{
					console.log(res);
					if(likeYn=='Y'){
						this.list[idx].likeCount--;
						this.list[idx].likeYn = 'N'
					}
					else{
						this.list[idx].likeCount++;
						this.list[idx].likeYn = 'Y'
					}
				})
				.then((err)=>{
					console.log(err);
				})
			}

		},
		showModal(boardId){
			this.detailBoardId = boardId;
			this.isModalViewed=true
		}
	}
}
</script>
