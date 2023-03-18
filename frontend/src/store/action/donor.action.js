import { toast } from "react-toastify";
import axiosinstance from "../../config/axios";
import { convertMonthlyData } from "../../utils/index";

//listing donor
export const getAll = (formdata = null) => {
  return async (dispatch) => {
    try {

      const URLSearchParams = window.URLSearchParams;
      let query = new URLSearchParams();
      if (formdata?.searchvalue) {
        query.append("search", formdata.searchvalue);
      }

      if (formdata?.isDeleted) {
        query.append("isDeleted", true);
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

      const url = "/todo?" + query.toString();

      dispatch({ type: "SET_TODO_LOADER", loader: true });
      const { data } = await axiosinstance.get(url);
      dispatch({ type: "SET_TODO_LOADER", loader: false });
      dispatch({
        type: 'RETRIEVE_TODO',
        payload: data.data,
      });

    } catch (error) {
      dispatch({ type: "SET_TODO_LOADER", loader: false });
      toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
    }
  };
};

//Create
export const create = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_TODO_LOADER", loader: true });
      await axiosinstance.post('/todo/create', data);
      toast.success("todo has been created successfully!");
      dispatch({ type: "SET_TODO_LOADER", loader: false });
      return true;
    } catch (error) {
      dispatch({ type: "SET_TODO_LOADER", loader: false });
      toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
    }
  }
}

//Update
export const update = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_TODO_LOADER', loader: true });
      await axiosinstance.put(`/todo/update/${id}`, data);
      dispatch({ type: 'SET_TODO_LOADER', loader: false });
      toast.success("data has been updated successfully");
      return true;
    } catch (error) {
      dispatch({ type: 'SET_TODO_LOADER', loader: false });
      toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
    }
  }
}

//view
export const viewData = (formdata) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_TODO_LOADER', loader: true });
      const data = await axiosinstance.get(`/todo/${formdata.id}`, {});
      dispatch({ type: 'SET_TODO_LOADER', loader: false });
      return data.data;
    } catch (error) {
      dispatch({ type: 'SET_TODO_LOADER', loader: false });
      toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
    }
  }
}

//delete
export const DeleteData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_TODO_LOADER', loader: true });
      await axiosinstance.delete(`/todo/delete/${id}`, {});
      dispatch({ type: 'SET_TODO_LOADER', loader: false });
      toast.success("Data has been Deleted successfully!");
      return true;
    } catch (error) {
      dispatch({ type: 'SET_TODO_LOADER', loader: false })
      toast.error((error.response.data && error.response.data.error && error.response.data.error.message) || "Something went wrong");
    }
  }
}
