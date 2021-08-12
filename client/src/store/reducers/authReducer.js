const initialState = {
  loading: false,
  user: '',
  error: false,
  message: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
        message: false,
      };
    case 'FETCH_USER_FAILURE':
      return {
        loading: false,
        message: false,
        user: '',
        error: action.payload,
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: false,
      };
    case 'FETCH_LOGOUT_USER':
      return {
        loading: false,
        user: '',
        error: false,
        message: 'Success logout',
      };
    default:
      return state;
  }
};

export default authReducer;
