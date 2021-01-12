import { api } from "./services";

export default {
    state: {
        table: [],
        login: false,
        isLoading: false
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
        }
    },
    actions: {
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
        async readTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api.get("/evento", payload).then(response => {
                context.commit("UPDATE_LOADING", false);
                context.commit("UPDATE_TABLE", response.data.dados);
            });
            //return response;
        },
        async showTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            const response = await api.get("/evento/" + payload).then(response => {
                context.commit("UPDATE_LOADING", false);
                return response;
            });
            return response;
        },
        async createTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api.post("/evento", payload).then(response => {
                context.commit("UPDATE_LOADING", false);
            });
        },

        async deleteTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            await api.delete(`/evento/${payload}`).then(response => {
                context.commit("UPDATE_LOADING", false);
            });
        },

        async updateTable(context, payload) {
            context.commit("UPDATE_LOADING", true);
            console.log(payload);
            await api.put(`/evento/${payload.id}`, payload).then(response => {
                context.commit("UPDATE_TABLE", response.data.dados);
                context.commit("UPDATE_LOADING", false);
            });
        }
    }
};
