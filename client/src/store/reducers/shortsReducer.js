const initialState = {
  loading: false,
  shorts: [],
  error: false,
  message: false,
};

const shortsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SHORTS_REQUEST':
      return { ...state, message: false, loading: true, error: false };
    case 'FETCH_SHORTS_FAILURE':
      return {
        ...state,
        loading: false,
        message: false,
        error: action.payload,
      };
    case 'FETCH_ALL_SHORTSURL':
      return {
        ...state,
        loading: false,
        shorts: action.payload,
        error: '',
      };
    case 'ADD_NEW_SHORTURL':
      return {
        loading: false,
        shorts: [action.payload, ...state.shorts],
        error: '',
        message: 'success!',
      };
    case 'DELETE_SHORTURL':
      return {
        loading: false,
        shorts: [
          ...state.shorts.filter((short) => short._id !== action.payload),
        ],
        error: '',
        message: 'deleted succesfully',
      };
    case 'UPDATE_SHORTURL':
      const filteredArray = state.shorts.filter(
        (item) => item._id !== action.payload._id
      );
      const newArray = [action.payload, ...filteredArray];
      return {
        loading: false,
        shorts: newArray,
        error: '',
        message: 'updated succesfully',
      };

    case 'INCREMENT_CLICK':
      const foundIdx = state.shorts.findIndex(
        (short) => short.shortAddress === action.payload
      );
      const newState = [...state.shorts];
      newState[foundIdx] = {
        ...state.shorts[foundIdx],
        clicks: (state.shorts[foundIdx].clicks += 1),
      };

      return {
        ...state,
        shorts: newState,
        // shorts: [...state.shorts, (state.shorts[foundShort].clicks += 1)],
      };

    case 'FETCH_CLEAN_SHORTSURL':
      return {
        message: false,
        loading: false,
        shorts: [],
        error: '',
      };
    default:
      return state;
  }
};

export default shortsReducer;
