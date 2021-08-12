import axios from 'axios';
import { SERVER_ENDPOINTS } from '../../config';
import { fetchRequest, fetchSuccess, fetchFailure } from './fetchActions';

export const fetchLogoutUser = (type, message) => {
  return {
    type: type,
    payload: 'Logged out successfully',
  };
};

export const sign = (url, values) => {
  return async function (dispatch) {
    dispatch(fetchRequest('FETCH_USER_REQUEST'));
    try {
      const response = await axios.post(
        `${SERVER_ENDPOINTS}/${url}`,
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
        { withCredentials: true }
      );

      const customizeUserData = {
        name: response.data.user.name,
        id: response.data.user._id,
        email: response.data.user.email,
        isAuth: response.data.token ? true : false,
      };
      dispatch(fetchSuccess('FETCH_USER_SUCCESS', customizeUserData));
    } catch (error) {
      dispatch(
        fetchFailure('FETCH_USER_FAILURE', error?.response?.data?.error)
      );
    }
  };
};

export const logout = () => {
  return async function (dispatch) {
    dispatch(fetchRequest('FETCH_USER_REQUEST'));
    try {
      const res = await axios.get(`${SERVER_ENDPOINTS}/logout`, {
        withCredentials: true,
      });

      dispatch(fetchLogoutUser('FETCH_LOGOUT_USER', res.data.message));
      dispatch(fetchLogoutUser('FETCH_CLEAN_SHORTSURL', res.data.message));
    } catch (error) {
      dispatch(
        fetchFailure('FETCH_USER_FAILURE', error?.response?.data?.error)
      );
    }
  };
};
