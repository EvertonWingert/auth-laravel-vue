/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';
import routes from './routes';
import Vuex from 'vuex';
import storeData from "./store";
import VueCookies from 'vue-cookies';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);

const store = new Vuex.Store(
   storeData
)

Vue.component('register-component', require('./components/RegisterComponent.vue').default);
Vue.component('login-component', require('./components/LoginComponent.vue').default);
Vue.component('navbar', require('./components/NavBarComponent.vue').default);
Vue.component('home', require('./components/HomeComponent.vue').default);
Vue.component('welcome', require('./components/WelcomeComponent.vue').default);
Vue.component('app', require('./components/App.vue').default);


const app = new Vue({
    el: '#app',
    router: new VueRouter(routes),
    store,
});
