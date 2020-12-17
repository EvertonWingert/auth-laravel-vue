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
         loginUser(context, payload) {
            api.post("/login", payload).then(response =>{
            if (response.data['status_code'] == 200) {
                context.commit("UPDATE_LOGIN", true);
                console.log(response.data.token);
                $cookies.set("token", response.data.token);
            }
            });
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
