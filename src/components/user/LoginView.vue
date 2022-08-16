<template>
  <v-app id="login">
    <h1>Login page</h1>
    <v-container style="padding-top:20%; max-width: 450px" fill-height>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="doLogin2">
  
      <v-text-field v-model="email" :rules = "emailRules" label="아이디" required>
      </v-text-field>
     
      <v-text-field
        v-model="password"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        :counter="20"
        :rules="passwordRules"
        label="비밀번호"
        @click:append="passwordShow = !passwordShow"
        required>
      </v-text-field>
      <br>
      
      <v-btn @click="doLogin" color="#1CFD9F">로그인</v-btn>

     
    </v-form>
    </v-container>
  </v-app>
</template>

<script>

  export default{
    name:'LoginView',
    data: () => ({
      valid: true,
      email: '',
      password: '',
      passwordShow: false,
      emailRules:[
        v => !!v || '이메일을 입력해주세요.',
        v => { 
          const replaceV = v.replace(/(\s*)/g, '')
          const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        }
      ],
      passwordRules:[
        v => !!v || '비밀번호를 입력해주세요.',
        v => {
          const replaceV = v.replace(/(\s*)/g, '')
          return replaceV.length <=20 || '8자리 이상 입력해주세요.'
        }
      ]
    }),
    methods: {
      doLogin: function(){
        let loginRequest ={};
        loginRequest.email = this.email;
        loginRequest.password = this.password;
        this.$store.dispatch('login', loginRequest)
          .then((res) => {
            console.log(res);
            window.history.length > 2 ? this.$router.go(-1) :  this.$router.push('/')
          })
          .catch(() => (alert("회원정보가 없습니다.")));
      },
     },
    
  };
</script>