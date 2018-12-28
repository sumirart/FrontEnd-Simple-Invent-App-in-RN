import axios from 'axios';

const IP = "http://192.168.0.16:3000/user/";

export const login = (user) => ({
    type : 'LOGIN',
    payload : axios.post(IP + 'login', user)
});

export const register = (user) => ({
    type : 'REGISTER',
    payload : axios.post(IP + 'signup', user)
});

export const logout = () => ({
    type : 'LOGOUT'
});