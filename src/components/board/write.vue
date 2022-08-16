<template>
    <v-app id="write">
        <v-container style="padding-top:20%;">
            <v-card elevation="10" outlined width="100%" class="mx-auto">
                <v-card-title>
                    <span class="mr-2">Write</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        label="Title"
                        :rules="rules"
                        :counter="100"
                        v-model="title"
                    ></v-text-field>
                    <v-text-field
                        label="Content"
                        :rules="rules"
                        v-model="content"
                    ></v-text-field>
                    <v-file-input label="File input" multiple v-model="files">
                    </v-file-input>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined id="save" @click="fnSave">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'

let config = {
    headers:{
        'Content-Type' : 'multipart/form-data',
        'Authorization' : VueCookies.get('accessToken')
    }
}

export default {
    
    name:'WriteView',
    data: () => ({
		rules: [
			value => !!value || 'Required.',
			value => (value && value.length >= 3) || 'Min 3 characters',
		],
		title: '',
        content:'',
        files:[]
	}),
    methods:{
		fnSave() {
            const formData = new FormData();
            
            for (let index = 0; index < this.files.length; index++) {
                formData.append("files", this.files[index]);
            }
             formData.append('title', this.title);
             formData.append('content', this.content)
            
			axios.post("http://localhost:3000/board/post", formData, config)
			.then((res)=>{
				console.log(res);
                alert("저장되었습니다.");
			})
			.then((err)=>{
				console.log(err);
			})
		}
	}
}
</script>