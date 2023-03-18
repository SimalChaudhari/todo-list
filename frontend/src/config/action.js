import axiosinstance from "./axios"
import { toast } from 'react-toastify';

// const history = useHistory();
export const setToken = (token) => {
    localStorage.setItem("jwt", token);
}

export const removeToken = () => {
    localStorage.setItem("jwt");
}

export const getToken = () => {
    return localStorage.getItem("jwt") ? localStorage.getItem("jwt") : null;
}



export const addQuery = async (data) => {
    try {
        await axiosinstance.post('/contact',data);
        toast.success("Thnakyou for contact us");
    } catch (error) {
        toast.error("Something went wrong try again");
    }
}
