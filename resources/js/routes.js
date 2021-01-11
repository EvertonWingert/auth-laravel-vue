import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/auth/LoginComponent";
import Register from "./views/auth/RegisterComponent";
import Evento from "./views/EventoComponent";
import Welcome from "./views/WelcomeComponent";
import NotFound from "./components/NotFoundComponent";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "entrada",
            component: Welcome,
            meta: {
                guest: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/evento",
            name: "evento",
            component: Evento,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/:catchAll(.*)",
            name: "NotFound",
            component: NotFound
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
