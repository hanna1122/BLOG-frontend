import axios from "axios";
import VueCookies from "vue-cookies";

export const login = {
    state : {
        host : 'http://localhost:3000',
        accessToken : null,
        refreshToken : null,
        isLogin:false
    },
    mutations : {
        loginToken (state, payload) {
            VueCookies.set('accessToken', payload.accessToken, '1y');
            VueCookies.set('refreshToken', payload.refreshToken, '1y');
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.isLogin=true;
        },
        refreshToken (state, payload) {
            VueCookies.set('accessToken', payload.accessToken, '1y');
            VueCookies.set('refreshToken', payload.refreshToken, '1y');
            state.accessToken = payload;
        },
        removeToken (state) {
            VueCookies.remove('accessToken');
            VueCookies.remove('refreshToken');
            state.isLogin=false;
        }
    },
    getters : {
        getToken (state) {
            console.log('state  ', state);
            let ac = VueCookies.get('accessToken');
            let rf = VueCookies.get('refreshToken');
            return {
                access : ac,
                refresh : rf,
                isLogin:true
            };
        }
    },
    actions : {
        login : ({commit}, params) => {
            console.log('login params  ', params);

            return new Promise((resolve, reject) => {
                axios.post('http://localhost:3000/auth/login', params)
                    .then(res => {
                        console.log(res);
                        commit('loginToken', res.data);
                        resolve(res);
                    })
                    .catch(err => {
                        console.log(err.message);
                        reject(err.message);
                    })
            })
        },
        logout : ({commit}) => {
            commit('removeToken');
            location.reload();
        }
    }
}