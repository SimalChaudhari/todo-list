import { SET_TOKEN, SET_LOGIN_ERROR } from "../constant/index";
import axiosinstance from "../../config/axios";
import { toast } from "react-toastify";

export const login = (User) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_AUTH_LOADER", payload: true });
      const { data } = await axiosinstance.post("/auth/login", User);
      localStorage.setItem("jwt", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.admin));
      dispatch({ type: SET_TOKEN, payload: data.data.token });
      dispatch({ type: "RETRIEVE_USER_DATA", payload: data.data?.admin });
     
      dispatch({
        type: "SET_AUTH_IMAGE",
        profile_image: data.data?.admin?.image,
      });
      dispatch({ type: "SET_AUTH_LOADER", payload: false });
      toast.success("Login Successfully");
      return true;
    } catch (error) {
      dispatch({ type: "SET_AUTH_LOADER", payload: false });
      if (
        error.response &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        if (
          error.response.data.error.message.includes("email") &&
          !error.response.data.error.message.includes("password")
        ) {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: { email: error.response.data.error.message, password: "" },
          });
          toast.error(
            (error.response.data &&
              error.response.data.error &&
              error.response.data.error.message)
         
          );
        } else if (
          error.response.data.error.message.includes("password") &&
          !error.response.data.error.message.includes("email")
        ) {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: { email: "", password: error.response.data.error.message },
          });
          toast.error(
            (error.response.data &&
              error.response.data.error &&
              error.response.data.error.message)

          );
        } else {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: { email: error.response.data.error.message, password: "" },
          });
          toast.error(
            (error.response.data &&
              error.response.data.error &&
              error.response.data.error.message) ||
              "Something went wrong"
          );
        }
        return false;
      }
    }
  };
};

//Forget Password
export const forgotPassword = (formData) => {
  return async (dispatch) => {
      try {
          dispatch({ type: "SET_AUTH_LOADER", payload: true });
          const { data } = await axiosinstance.post('/admin/auth/forget', formData);
          toast.success("Reset password link has been sent to your email");
          dispatch({ type: "SET_AUTH_LOADER", payload: false });
          return data.data;
      } catch (error) {
          dispatch({ type: "SET_AUTH_LOADER", payload: false });
          toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
      }

  }
}

export const ResetPassword = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_AUTH_LOADER", payload: true });
      const { data } = await axiosinstance.post(`/admin/auth/reset`, formData);
      toast.success("Password changed successfully!");
      dispatch({ type: "SET_AUTH_LOADER", payload: false });
      return data.success;
    } catch (error) {
      dispatch({ type: "SET_AUTH_LOADER", payload: false });
      toast.error(
        (error.response.data &&
          error.response.data.error &&
          error.response.data.error.message) ||
          "Something went wrong"
      );
    }
  };
};

export const ChangePassword = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_AUTH_LOADER", payload: true });
      const { data } = await axiosinstance.post(`/admin/auth/change-password`, formData);
      toast.success("Password changed successfully!");
      dispatch({ type: "SET_AUTH_LOADER", payload: false });
      return data.success;
    } catch (error) {
      dispatch({ type: "SET_AUTH_LOADER", payload: false });
      toast.error(
        (error.response.data &&
          error.response.data.error &&
          error.response.data.error.message) ||
          "Something went wrong"
      );
    }
  };
};

export const resetpasswordafterlogin = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADER", payload: true });

    await axiosinstance.post("/admin/auth/resetpassword", formdata);
    toast.success("Password reset successfully please login");
    dispatch({ type: "SET_LOADER", payload: false });

    return true;
  } catch (error) {
    dispatch({ type: "SET_LOADER", payload: false });
    toast.error(
      (error.response.data &&
        error.response.data.error &&
        error.response.data.error.message) ||
        "Something went wrong"
    );
    return null;
  }
};
