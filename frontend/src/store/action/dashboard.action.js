import { toast } from "react-toastify";
import axiosinstance from "../../config/axios";
import { convertMonthlyData } from "../../utils/index";

//listing Dashboard
export const getAll = (formdata) => {
  return async (dispatch) => {
    try {
      const URLSearchParams = window.URLSearchParams;
      let query = new URLSearchParams();
      if (formdata?.searchvalue) {
        query.append("search", formdata.searchvalue);
      }

      if (formdata?.page) {
        query.append("page", formdata.page);
      }

      if (formdata?.limit) {
        query.append("limit", formdata.limit);
      }

      if (formdata?.orderBy) {
        query.append("orderBy", formdata.orderBy);
      }

      if (formdata?.orderDirection) {
        query.append("orderDirection", formdata.orderDirection);
      }

      const url = "/admin/dashboard?" + query.toString();

      dispatch({ type: "SET_DASHBOARD_LOADER", loader: true });
      const { data } = await axiosinstance.get(url);
      dispatch({ type: "SET_DASHBOARD_LOADER", loader: false });
      dispatch({
        type: "RETRIEVE_DASHBOARD",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
};
