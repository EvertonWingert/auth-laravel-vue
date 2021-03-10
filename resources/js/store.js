import { api } from "./services";
import router from "./routes";

export default {
    state: {
        table: [],
        isAuthenticated: false,
        isLoading: false,
        error: []
    },
    mutations: {
        UPDATE_LOGIN(state, payload) {
            state.isAuthenticated = payload;
        },
        UPDATE_TABLE(state, payload) {
            state.table = payload;
        },
        UPDATE_LOADING(state, payload) {
            state.isLoading = payload;
        },
        UPDATE_ERROR(state, payload) {
            state.error = payload;
        }
    },
    actions: {
        createTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.post("/event", payload)
                .then(_ => {
                    context.commit("UPDATE_ERROR", []);
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        readTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.get("/event", payload)
                .then(response => {
                    context.commit("UPDATE_TABLE", response.data.content);
                    context.commit("UPDATE_ERROR", []);
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })

                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        showTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            const response = api
                .get("/event/" + payload)
                .then(response => {
                    context.commit("UPDATE_ERROR", []);
                    return response;
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })

                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
            return response;
        },
        deleteTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.delete(`/event/${payload}`)
                .then(_ => {
                    context.commit("UPDATE_ERROR", []);
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })

                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        updateTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.put(`/event/${payload.id}`, payload)
                .then(response => {
                    context.commit("UPDATE_TABLE", response.data.content);
                    context.commit("UPDATE_ERROR", []);
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })

                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        loginUser(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.post("/login", payload)
                .then(_ => {
                    context.commit("UPDATE_LOGIN", true);
                    context.commit("UPDATE_ERROR", []);
                    Vue.$cookies.set("token", resp.data.token);
                    router.push({ name: "index" });
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        registerUser(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.post("/register", payload)
                .then(resp => {
                    context.commit("UPDATE_LOGIN", true);
                    context.commit("UPDATE_ERROR", []);
                    Vue.$cookies.set("token", resp.data.token);
                    router.push({ name: "index" });
                })
                .catch(err => {
                    console.log(err);
                    context.commit("UPDATE_ERROR", err.response.data.errors);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        logoutUser(context, _) {
            api.post(`/logout`)
                .then(_ => {
                    context.dispatch("removeCredentials");
                })
                .catch(_ => {
                    context.dispatch("removeCredentials");
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },

        removeCredentials() {
            Vue.$cookies.remove("token");
            router.push({ name: "login" });
        }
    }
};
