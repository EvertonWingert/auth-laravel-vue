import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/auth/LoginComponent";
import Register from "./views/auth/RegisterComponent";
import Evento from "./views/EventoComponent";
import NotFound from "./components/NotFoundComponent";
import CreateEvent from "./views/auth/admin/CreateEventComponent";
import EditEvent from "./views/auth/admin/EditEventComponent";
import Table from "./components/TableComponent";
import VueCookies from "vue-cookies";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
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
            },
            children: [
                {
                    path: "index",
                    name: "index",
                    component: Table,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "create",
                    name: "createEvent",
                    component: CreateEvent,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "edit/:id",
                    name: "editEvent",
                    component: EditEvent,
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
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
        if (VueCookies.get("token")) {
            next("/evento");
        }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!VueCookies.get("token")) {
            next("/login");
        }
    }
    next();
});

export default router;
