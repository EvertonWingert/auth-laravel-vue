import { api } from "./services";

export default {
    state: {
        login: false
    },
    mutations: {
        UPDATE_LOGIN(state, payload) {
            state.login = payload;
        }
    },
    actions: {
         async loginUser(context, payload) {
            const response = await api.post("/login", payload);
            if (response.data['status_code'] == 200) {
                context.commit("UPDATE_LOGIN", true);
                $cookies.set("token", response.data.token);
            }
            return response;
           
        },
        registerUser(context, payload){
            api.post("/register", payload).then(response => {
                if (response.data['status_code'] == 200) {
                    context.commit("UPDATE_LOGIN", true);
                    $cookies.set("token", response.data.token);

                    
                }
            });
        },
        logoutUser(context) {
            context.commit("UPDATE_LOGIN", false);
            $cookies.remove("token");
          
        }
    }
};
