import { api } from "./services";

export default {
    state: {
        table: [],
        login: false,
        isLoading: false,
        error: []
    },
    mutations: {
        UPDATE_LOGIN(state, payload) {
            state.login = payload;
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
                .catch(err => {
                    if (err.response) {
                        console.log("Erro de response: " + err.response);
                    } else if (err.request) {
                        console.log("Erro de request: " + err.request);
                    } else {
                        console.log("Error", err.message);
                    }
                    context.commit("UPDATE_ERROR", err);
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
                    context.commit("UPDATE_ERROR", false);
                })
                .catch(err => {
                    if (err.response) {
                        console.log("Erro de response: " + err.response);
                    } else if (err.request) {
                        console.log("Erro de request: " + err.request);
                    } else {
                        console.log("Error", err.message);
                    }
                    context.commit("UPDATE_ERROR", err);
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
                    context.commit("UPDATE_ERROR", false);

                    return response;
                })
                .catch(err => {
                    if (err.response) {
                        console.log("Erro de response: " + err.response);
                    } else if (err.request) {
                        console.log("Erro de request: " + err.request);
                    } else {
                        console.log("Error", err.message);
                    }
                    context.commit("UPDATE_ERROR", err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
            return response;
        },
        deleteTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            api.delete(`/event/${payload}`)
                .catch(err => {
                    if (err.response) {
                        console.log("Erro de response: " + err.response);
                    } else if (err.request) {
                        console.log("Erro de request: " + err.request);
                    } else {
                        console.log("Error", err.message);
                    }
                    context.commit("UPDATE_ERROR", err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        updateTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            console.log(payload);
            api.put(`/event/${payload.id}`, payload)
                .then(response => {
                    context.commit("UPDATE_TABLE", response.data.content);
                    context.commit("UPDATE_ERROR", false);
                })
                .catch(err => {
                    if (err.response) {
                        console.log("Erro de response: " + err.response);
                    } else if (err.request) {
                        console.log("Erro de request: " + err.request);
                    } else {
                        console.log("Error", err.message);
                    }
                    context.commit("UPDATE_ERROR", err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        async loginUser(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api
                .post("/login", payload)
                .then(resp => {
                    context.commit("UPDATE_LOGIN", true);
                    $cookies.set("token", resp.data.token);
                })
                .catch(err => {
                    if (err.response) {
                        //console.log("Erro de response: " + err.response);
                        context.commit("UPDATE_ERROR", err.response);
                    } else if (err.request) {
                        //console.log("Erro de request: " + err.request);
                        context.commit("UPDATE_ERROR", err.request);
                    } else {
                        //console.log("Error", err.message);
                        context.commit("UPDATE_ERROR", err.message);
                    }
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        async registerUser(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api.post("/register", payload)
                .then(resp => {
                    context.commit("UPDATE_LOGIN", true);
                    $cookies.set("token", resp.data.token);
                })
                .catch(err => {
                    if (err.response) {
                        //console.log("Erro de response: " + err.response);
                        context.commit("UPDATE_ERROR", err.response.data.errors);
                    } else if (err.request) {
                        context.commit("UPDATE_ERROR", err.request);
                        //console.log("Erro de request: " + err.request);
                    } else {
                        context.commit("UPDATE_ERROR", err.message);
                        //console.log("Error", err.message);
                    }
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        logoutUser(context, _) {
            context.commit("UPDATE_LOGIN", false);
            $cookies.remove("token");
        }
    }
};
