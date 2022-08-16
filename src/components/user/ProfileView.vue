<template>
    <v-app id="write">
        <v-container style="padding-top:20%;">
            <v-card elevation="10" outlined width="100%" class="mx-auto">
               
                <v-card-title>
                    <span class="mr-2">Write</span>
                </v-card-title>
                 
                <v-card-text>
                    <v-row class="justify-center">
                            <div class="img" style="background:#BDBDBD;" >
                                <img class="userImg" src="./noimg.png" v-if="fileSrc == null" v-bind:align="center"/>
                                <img class="userImg" v-bind:src="fileSrc" v-if="fileSrc != null" v-bind:align="center"/>
                            </div>
                    </v-row>
                            <v-btn @click="isModalViewed=true">프로필 사진 수정</v-btn>
                            <ProfileImage v-if="isModalViewed" @close-modal="isModalViewed=false">
                            </ProfileImage>
                        
                            <v-text-field
                                label="email"
                                v-model="email"
                            ></v-text-field>
                            <v-text-field
                                label="userName"
                                v-model="userName"
                            ></v-text-field>
                            <v-text-field
                                label="nickname"
                                v-model="nickname"
                            ></v-text-field>
                   
                </v-card-text>
                 
                <v-card-actions class="justify-center">
                    
                    <v-btn outlined id="save" @click="fnGetUser">Save</v-btn>
                    <Button
                        @click="movePage('/board/list')"
                        color="grey darken-1"
                        rounded
                        small
                        iconName="mdi-arrow-left"
                        btnName="Back"
                    ></Button>
                </v-card-actions>
                
            </v-card>
        </v-container>
    </v-app>
</template>


<script>
   import axios from 'axios';
   import ProfileImage from "@/components/user/ProfileImage.vue"
   import VueCookies from 'vue-cookies'

    let config = {
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : VueCookies.get('accessToken')
        }
    }
    export default {
        data() {
            return {
                email:'',
                userName:'',
                nickname:'',
                userImg:'',
                file:'',
                fileSrc:'',
                isModalViewed: false
            }
        },
        mounted() {
            this.fnGetUser();
        },
        components:{
            ProfileImage
        },
        methods:{
            fnGetUser(){
                axios.get("http://localhost:3000/profile/detail", config)
                .then((res)=>{
                    console.log(res);
                    this.email = res.data.email;
                    this.userName = res.data.userName;
                    this.nickname = res.data.nickname;
                    this.fileSrc = res.data.fileSrc;
                })
                .then((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>
