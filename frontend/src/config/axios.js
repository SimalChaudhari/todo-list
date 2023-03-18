import axios from 'axios';
import { API_URL } from './Env';
import store from '../store';
import { LOG_OUT, SET_TOKEN } from '../store/constant/index';
const prevTOken = localStorage.getItem('jwt');

const axiosinstance = axios.create({
    baseURL: API_URL,
});

axiosinstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearear ${token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosinstance.interceptors.response.use((res) => {
    const token = localStorage.getItem("jwt");
    if (prevTOken !== token) {
        store.dispatch({ type: SET_TOKEN, payload: token });
    }
    return res;
}, (error) => {
    const status = error.response.status ? error.response.status : 401;
    if (status && status === 401) {
        localStorage.clear('token');
        store.dispatch({
            type: LOG_OUT
        })
    }
    return Promise.reject(error);
})

export default axiosinstance;