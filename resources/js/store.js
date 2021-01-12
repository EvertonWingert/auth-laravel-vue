import { api } from "./services";

export default {
    state: {
        table: [],
        login: false,
        isLoading: false,
        error: false
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
        async createTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api
                .post("/event", payload)
                .catch(err => {
                    context.commit("UPDATE_ERROR", err);
                    console.log(err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        async readTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api
                .get("/event", payload)
                .then(response => {
                    context.commit("UPDATE_TABLE", response.data.content);
                    context.commit("UPDATE_ERROR", false);
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err);
                    console.log(err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        async showTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            const response = await api
                .get("/event/" + payload)
                .then(response => {
                    context.commit("UPDATE_ERROR", false);

                    return response;
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err);
                    console.log(err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
            return response;
        },
        async deleteTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api
                .delete(`/event/${payload}`)
                .catch(err => {
                    context.commit("UPDATE_ERROR", err);
                    console.log(err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        },
        async updateTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            console.log(payload);
            await api
                .put(`/event/${payload.id}`, payload)
                .then(response => {
                    context.commit("UPDATE_TABLE", response.data.content);
                    context.commit("UPDATE_ERROR", false);
                })
                .catch(err => {
                    context.commit("UPDATE_ERROR", err);
                    console.log(err);
                })
                .finally(_ => {
                    context.commit("UPDATE_LOADING", false);
                });
        }
    }
    /*
        async loginUser(context, payload) {
            const response = await api.post("/login", payload);
            if (response.data['status_code'] == 200) {
                context.commit("UPDATE_LOGIN", true);
                $cookies.set("token", response.data.token);
            }
            return response;
           
        },
        async registerUser(context, payload){
            const response = await api.post("/register", payload);
            if (response.data['status_code'] == 200) {
                context.commit("UPDATE_LOGIN", true);
                $cookies.set("token", response.data.token);
            }
            return response;     
        },
                logoutUser(context) {
            context.commit("UPDATE_LOGIN", false);
            $cookies.remove("token");
          
        },
        */
};
