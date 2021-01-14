import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json"
    },
});

axiosInstance.interceptors.request.use(
    function(config){
        const token = $cookies.get("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)


export const api = {
    //Read
    get(endpoint) {
        return axiosInstance.get(endpoint);
    },
    //Create
    post(endpoint, body) {
        return axiosInstance.post(endpoint, body);
    },
    //Update
    put(endpoint, body) {
        return axiosInstance.put(endpoint, body);
    },
    //Delete
    delete(endpoint, body) {
        return axiosInstance.delete(endpoint, body);
    },
};
