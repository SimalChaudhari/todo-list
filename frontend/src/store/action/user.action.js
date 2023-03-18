import { toast } from "react-toastify";
import axiosinstance from "../../config/axios"

export const updateProfileImage = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "SET_AUTH_LOADER", loader: true });
            const { data } = await axiosinstance.put('/admin/admin/user-image', formData)
            dispatch({ type: "SET_AUTH_IMAGE", profile_image: data.data });
            dispatch({ type: "SET_AUTH_LOADER", loader: false });
            return data.data;
        } catch (error) {
            dispatch({ type: "SET_AUTH_LOADER", loader: false });
            toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
        }

    }
}

export const updateProfile = (formData, id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "SET_AUTH_LOADER", loader: true });
            const { data } = await axiosinstance.put(`/admin/admin/user-profile/${id}`, formData)
            toast.success("Profile updated successfully!");
            dispatch({ type: "RETRIEVE_USER_DATA", payload: data.data });
            dispatch({ type: "SET_AUTH_LOADER", loader: false });
            return data.success;
        } catch (error) {
            dispatch({ type: "SET_AUTH_LOADER", loader: false });
            toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
        }

    }
}

export const ResetUserPassword = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "SET_AUTH_LOADER", loader: true });
            const { data } = formData.id ?
            await axiosinstance.post(`/admin/auth/reset/${formData.id}`, { password: formData.password, repeat_password: formData.repeat_password }) :
            await axiosinstance.post('/admin/auth/reset', { password: formData.password, repeat_password: formData.repeat_password });
            dispatch({ type: "SET_AUTH_LOADER", loader: false });
            toast.success("Password changed successfully!");
            return data.success;
        } catch (error) {
            dispatch({ type: "SET_AUTH_LOADER", loader: false });
            toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
        }

    }
}

