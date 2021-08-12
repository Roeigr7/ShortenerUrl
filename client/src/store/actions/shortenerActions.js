import axios from 'axios';
import { SERVER_ENDPOINTS } from '../../config';
import { checkTokenAuthenticated } from '../../helpers';
import { fetchRequest, fetchSuccess, fetchFailure } from './fetchActions';

/////////get all user shorts
export const getUserShorts = (id) => {
  return async function (dispatch) {
    dispatch(fetchRequest('FETCH_SHORTS_REQUEST'));
    try {
      const response = await axios.get(
        `${SERVER_ENDPOINTS}/user-shorts/${id}`,
        {
          headers: {
            Authorization: `bearer ${checkTokenAuthenticated()}`,
          },
        }
      );

      dispatch(fetchSuccess('FETCH_ALL_SHORTSURL', response.data));
    } catch (error) {
      dispatch(
        fetchFailure('FETCH_SHORTS_FAILURE', error?.response?.data?.message)
      );
    }
  };
};
////////////////////add short url address
export const addShortUrl = (values, id) => {
  return async function (dispatch) {
    dispatch(fetchRequest('FETCH_SHORTS_REQUEST'));
    try {
      const response = await axios.post(
        `${SERVER_ENDPOINTS}/url-address/${id}`,
        {
          destination: values.destination,
        },
        {
          headers: {
            Authorization: `bearer ${checkTokenAuthenticated()}`,
          },
        }
      );

      dispatch(fetchSuccess('ADD_NEW_SHORTURL', response.data));
    } catch (error) {
      dispatch(
        fetchFailure('FETCH_SHORTS_FAILURE', error?.response?.data?.error)
      );
    }
  };
};

///////delete short url
export const deleteShortUrl = (shortId) => {
  return async function (dispatch) {
    dispatch(fetchRequest('FETCH_SHORTS_REQUEST'));
    try {
      const response = await axios.delete(
        `${SERVER_ENDPOINTS}/delete-short/${shortId}`,

        {
          headers: {
            Authorization: `bearer ${checkTokenAuthenticated()}`,
          },
        }
      );

      dispatch(fetchSuccess('DELETE_SHORTURL', response.data));
    } catch (error) {
      dispatch(
        fetchFailure(
          'FETCH_SHORTS_FAILURE',
          error?.response?.data?.message || error?.response?.data?.error
        )
      );
    }
  };
};

///////UPDATE SHORT URL
export const updateShortUrl = (shortUrl, updatedContent) => {
  return async function (dispatch) {
    dispatch(fetchRequest('FETCH_SHORTS_REQUEST'));

    try {
      const response = await axios.patch(
        `${SERVER_ENDPOINTS}/update-short/${shortUrl._id}`,
        {
          shortAddress: updatedContent,
        },
        {
          headers: {
            Authorization: `bearer ${checkTokenAuthenticated()}`,
          },
        }
      );
      dispatch(fetchSuccess('UPDATE_SHORTURL', response.data));
    } catch (error) {
      dispatch(
        fetchFailure(
          'FETCH_SHORTS_FAILURE',
          error?.response?.data?.error || error?.response?.data
        )
      );
    }
  };
};

/////////////add short image
export const addShortImage = (userId, values) => {
  return async function (dispatch) {
    if (values.imageFile === '')
      return dispatch(
        fetchFailure('FETCH_SHORTS_FAILURE', 'Must choose an image')
      );

    dispatch(fetchRequest('FETCH_SHORTS_REQUEST'));
    let formData = new FormData();
    formData.append('imageFile', values.imageFile);
    try {
      const response = await axios.post(
        `${SERVER_ENDPOINTS}/url-image/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `bearer ${checkTokenAuthenticated()}`,
          },
        }
      );
      dispatch(fetchSuccess('ADD_NEW_SHORTURL', response.data));
    } catch (error) {
      dispatch(
        fetchFailure(
          'FETCH_SHORTS_FAILURE',
          error?.response?.data?.error || error?.response?.data
        )
      );
    }
  };
};
