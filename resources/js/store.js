import Axios from "axios";
import {api} from "./services";

export default ({
    state:{
        login: false,
        usuario: {
            email: "",
            password: "",

        }
    },
    mutations : {
        UPDATE_LOGIN(state, payload){
            state.login = payload;
        },
    },
    actions: {
        getUsuario(context, payload){
            /*
            context.commit("UPDATE_USUARIO", {email: payload.email})
            Axios.post('http://127.0.0.1:8000/api/login',payload).then(response =>{
                console.log(response.data.status_code);
                console.log(response);
                /*
                if(response.status == 200){
                    context.commit("UPDATE_USUARIO", response.data);
                    context.commit("UPDATE_LOGIN", true);
                    console.log(response.data);
                    console.log(response.data['token']);
                    console.log(response.data.token);
                }
                
            })*/
           
                Axios.post("/api/login",{
                    "email": "teste@gmail.cofm",
                    "password":"1234"
                }).then((response) => {
                  //this.$router.push("/home");
                  console.log(response);
                });
              
        }
    },
});