<template>
  <v-app id="app">

    <Header />
    
    <router-view></router-view>
    <!-- 추가된 풋터 컴포넌트 사용 -->
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/common/Header'; 
import Footer from './components/common/Footer'; 
import { useStore } from 'vuex';

export default {
  name: 'App',
  created() {
    const store = useStore();

    let token = store.getters.getToken;
    if (token.access == null && token.refresh == null) {
      this.$router.push({name:'LoginView'}).catch(() => {});
    }
  },
  components: {
    Header          
    ,Footer        
    
  }
}
</script>

<style>
html,body{padding:0; margin:0;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0; padding:0;
}
</style>
