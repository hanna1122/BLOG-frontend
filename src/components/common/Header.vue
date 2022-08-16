<template>
    <div>
        <v-toolbar dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-app-bar-nav-icon @click="drawer = !drawer"/>
        <v-navigation-drawer app v-model="drawer">
            <template v-if="isLogin">
            <router-link style=text-decoration:none; :to="{ path: '/board/list'}"> <v-btn color="info" class="button">LIST</v-btn> </router-link>
             <v-spacer></v-spacer>
            <router-link style=text-decoration:none; :to="{ path: '/board/write'}"><v-btn color="info" class="button">WRITE</v-btn> </router-link>
            <v-spacer></v-spacer>
            <router-link style=text-decoration:none; :to="{ name: 'ProfileView'}"><v-btn color="info" class="white" >profile</v-btn> </router-link>
            </template>
            <template v-else>
            <router-link style=text-decoration:none; :to="{ path: '/board/list'}"> <v-btn color="info" class="button">Signup</v-btn> </router-link>
            </template>
        </v-navigation-drawer>
        <v-spacer></v-spacer>
        
        <v-toolbar-items>
            
            <router-link
              v-if="isLogin===false"
              :to="{ name: 'LoginView'}"
              active-class="active"
              class="nav-link">
              로그인
            </router-link>
            <button
              v-if="isLogin===true"
              type="button"
              @click="UserLogout"
              active-class="active"
              class="nav-link btn btn-primary btn-sm">
              로그아웃
            </button>

            <v-btn icon>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar-items>
   </v-toolbar>
   </div>
</template>


<script>
import VueCookies from 'vue-cookies';

export default {
   name:'HeaderView',
   data(){
    return{
        drawer:false,
        isLogin:false
    }
   },
   mounted() { 
		this.fnLoginCheck();
    },
   methods: {
    UserLogout() {
      this.$store.dispatch('logout')
    },
    fnLoginCheck(){
        console.log(VueCookies.get('accessToken'));
        if(VueCookies.get('accessToken')==null){
            this.isLogin=false;
        }else{
            this.isLogin=true;
        }
    }
  }
}
</script>

<style scoped>

</style>
