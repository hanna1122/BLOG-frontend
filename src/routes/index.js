// import Vue from 'vue';
import {createWebHistory, createRouter} from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import List from '../components/board/List.vue';
import LoginView from '../components/user/LoginView.vue';
import VueCookies from 'vue-cookies'
import { useStore } from 'vuex';
import Write from '../components/board/write.vue';
import Profile from '../components/user/ProfileView.vue'

// Vue.use(Router);

const routes=[
    {
        path:'/',
        component:HelloWorld
    },
    {
        path:'/board/list',
        component:List
    },
    {
        path:'/user/login',
        name:'LoginView',
        component:LoginView
    },
    {
        path:'/board/write',
        component:Write
    },
    {
        paht:'/user/profile',
        name:'ProfileView',
        component:Profile
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

router.beforeEach( async(to, from, next) => {

    const store = useStore();
    console.log('to  ', to);
    console.log('from  ', from);
    console.log('router accessToken  ', VueCookies.get('accessToken'));
    console.log('router refreshToken  ', VueCookies.get('refreshToken'));
    if (VueCookies.get('accessToken') == null && VueCookies.get('refreshToken' != null)) {
        await store.dispatch('refreshToken');
    }
    if (VueCookies.get('accessToken') != null) {
        return next();
    }
    return next();

})

export default router;

// export default new Router({
//     routes:[
//         {
//             path:'/',
//             name:HelloWorld,
//             component:HelloWorld
//         },
//         {
//             path:'/board/list',
//             name:List,
//             component:List
//         }
//     ]
// })