import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Home from "./components/HomeComponent";
import Welcome from "./components/WelcomeComponent";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Welcome,
            meta: {
                guest: true
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/home",
            component: Home,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        if ($cookies.get("token")) {
            next("/home");
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
