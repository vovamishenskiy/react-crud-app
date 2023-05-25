import axios from "axios";
import { Dispatch } from "redux";
import { setAdminAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { AdminActions } from "redux/types/admin";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "http://localhost:5000/api/v1/admin";
const USER_URI = "http://localhost:5000/api/v1/user";

// LOAD ADMIN
export const loadAdmin = () => async (dispatch: Dispatch<AdminActions>) => {
  if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);

  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-admin`, config);

    dispatch({ type: types.ADMIN_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.ADMIN_AUTH_ERROR });
  }
};

// LOGIN ADMIN
export const loginAdmin =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<AdminActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(`${URI}/login`, body, config);
      dispatch({
        type: types.ADMIN_LOGIN_SUCCESS,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "Успешный админ-вход",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadAdmin());
    } catch (error: any) {
      dispatch({ type: types.ADMIN_LOGIN_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// REGISTER ADMIN
export const registerAdmin =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(`${USER_URI}/register`, body, config);
      dispatch({
        type: types.ADMIN_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "Успешная регистрация",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadAdmin());
    } catch (error: any) {
      dispatch({ type: types.ADMIN_REGISTER_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/users`, config);
      dispatch({ type: types.GET_USERS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Произошла ошибка при получении пользователей",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE USER DATA
export const updateUser =
  (body: any, id: number, setSubmitting: any) =>
  async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.patch(`${URI}/users/${id}`, body, config);
      dispatch({
        type: types.UPDATE_USER,
        payload: data,
      });
      dispatch<any>(getUsers());
      dispatch<any>(
        setAlert({
          msg: "Информация о пользователе обновлена",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Произошла ошибка при обновлении информации о пользователе",
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// DELETE USER
export const deleteUser =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/users/${id}`, config);
      dispatch({ type: types.DELETE_USER, payload: id });
      dispatch<any>(
        setAlert({
          msg: "Пользователь удалён",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Произошла ошибка при удалении пользователя",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// LOGOUT ADMIN
export const logOutAdmin =
  () => (dispatch: Dispatch<AdminActions | AlertActions>) => {
    dispatch({ type: types.ADMIN_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Вы вышли",
        status: 200,
        alertType: "success",
      })
    );
  };
