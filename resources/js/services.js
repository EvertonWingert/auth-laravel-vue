import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type': 'application/json'
      }
})

export const api = {
    get(endpoint){
        return axiosInstance.get(endpoint);
    },
    post(endpoint,body){
        return axiosInstance.post(endpoint,body);
    }
}