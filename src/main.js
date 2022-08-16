import {createApp} from 'vue'
import App from './App.vue'
import router from './routes'
import VueCookies from 'vue-cookies'
import store from './store/index'
import Vuetify from './plugins/vuetify'
import VueCardCarousel from "vue-card-carousel"

//fort-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'


library.add(fasHeart, farHeart)


createApp(App)
    .use(VueCookies, {
        expireTimes: "1y",
        secure: true
    })
    .use(store)
    .use(router)
    .use(Vuetify)
    .use(VueCardCarousel)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount("#app");