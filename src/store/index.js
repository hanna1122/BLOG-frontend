import {createStore} from 'vuex';
import { login } from './module/login'; //로그인 모듈
import '@/assets/css/reset.css'

export default createStore({
  modules: {login}
});
