/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import router from './routes';
import Vuex from 'vuex';
import storeData from "./store";
import VueCookies from 'vue-cookies';
import Vuelidate from 'vuelidate';



Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(Vuelidate);


const store = new Vuex.Store(
   storeData
)

Vue.component('register-component', require('./views/auth/RegisterComponent.vue').default);
Vue.component('login-component', require('./views/auth/LoginComponent.vue').default);
Vue.component('navbar', require('./components/NavBarComponent.vue').default);
Vue.component('evento', require('./views/EventoComponent.vue').default);
Vue.component('app', require('./App.vue').default);
Vue.component('notfound', require('./components/NotFoundComponent.vue').default);


const app = new Vue({
    el: '#app',
    //router: new VueRouter(routes),
    router,
    store,
});
