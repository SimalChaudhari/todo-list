import jwt_decode from 'jwt-decode';
import { getToken } from '../../config/action'
import {  LOG_OUT, SET_TOKEN,CLEAR_LOGIN_ERRORS, SWITCH_NAV, SET_LOGIN_ERROR } from '../constant/index';

const initState = {
    loader: false,
    profile_image: null,
    token: null,
    user: null,
    loginerror: {email : "" , password : ""},
    isNav:false
}

const verifytoken = (token) => {
    try {
        const decodedToken = jwt_decode(token);
        const ExpireIn = new Date(decodedToken.exp * 1000);
        if (new Date() > ExpireIn) {
            localStorage.removeItem('jwt');
            return null;
        } else {
            return decodedToken;
        }
    } catch (error) {
        return null;
    }
};

let token = getToken();

const setToken = (token)=>{
    if (token) {
        const decodetoken = verifytoken(token);
        if (decodetoken) {
            initState.token = token;
            initState.user = decodetoken;
        }
    }
    return;    
}

setToken(token);

const AuthReducer = (state = initState, action) => {
    
    const { type, payload } = action;
    switch (type) {
        case "SET_AUTH_LOADER":
            return { ...state, loader: action.loader };
        case "SET_AUTH_IMAGE":
            return { ...state, profile_image: action.profile_image };
        case SET_TOKEN:
            setToken(payload);
            return { ...state, token: payload }
        case "RETRIEVE_USER_DATA":
            return { ...state, user: payload };
        case CLEAR_LOGIN_ERRORS:
            return { ...state, loginerror: {email : "", password :""} };
        case SWITCH_NAV:
            return { ...state, isNav: !state.isNav };
        case SET_LOGIN_ERROR:
            return {...state, loginerror :{email : payload.email, password : payload.password}};
        case LOG_OUT:
            return { ...state, user: '', token: '' }
        default:
            return state;
    }
}

export default AuthReducer;