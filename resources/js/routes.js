import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Evento from "./components/EventoComponent";
import Welcome from "./components/WelcomeComponent";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: 'entrada',
            component: Welcome,
            meta: {
                guest: true
            }
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/register",
            name: 'register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/evento",
            name: 'evento',
            component: Evento,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        if ($cookies.get("token")) {
            next("/evento");
        } else {
            next();
        }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!$cookies.get("token")) {
            next("/login");
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
