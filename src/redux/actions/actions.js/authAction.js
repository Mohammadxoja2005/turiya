import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_PATH, USER_TOKEN } from "../../../tools/constats";
import { UPDATE_AUTH } from "../types/auth";

export const updateAuth = (state) => {
  return {
    type: UPDATE_AUTH,
    payload: state,
  };
};

export const test = () => async (dispatch) => {
  try {
    console.log("Test");
  } catch (err) {
    console.log(err);
  }
};
export const REGISTER = (phone, password, nav) => async (dispatch) => {
  try {
    await axios
      .post(API_PATH + "user/register/", { phone, password })
      .then((res) => {
        console.log(res);
        dispatch(updateAuth({ isVerify: true }));
        nav("/verify/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const REGISTERVERIFY =
  (phone, code, password, nav) => async (dispatch) => {
    try {
      await axios
        .post(API_PATH + "user/verify-register/", { phone, code, password })
        .then((res) => {
          console.log(res);
          dispatch(updateAuth({ isVerify: false, isLogin: true }));
          nav("/login/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

export const LOGIN = (phone, password, nav) => async (dispatch) => {
  try {
    await axios
      .post(API_PATH + "user/login/", { phone, password })
      .then((res) => {
        // console.log(res);
        localStorage.setItem(USER_TOKEN, res.data.token);
        nav("/profile/", { replace: true });
      })
      .catch((err) => {
        // console.log(err);
      });
  } catch (err) {
    // console.log(err);
  }
};
