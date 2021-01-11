import { api } from "./services";

export default {
    state: {
        login: false,
        table: [],
       
    },
    mutations: {
        UPDATE_LOGIN(state, payload) {
            state.login = payload;
        },
        UPDATE_TABLE(state, payload){
            state.table = payload;
        },
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
        async saveTable(payload){
            const response = await api.post("/evento", payload);
            return response;

        },
        async delTable(payload){
            const response = await api.delete(`/evento/${payload}`, );
            return response;
        },
        async updateTable(payload){
            const response = await api.put(`/evento/${payload.id}`, payload );
            return response;
        },
        


    }
};
