import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authReducer';
import shortsReducer from '../reducers/shortsReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  shorts: shortsReducer,
});

export default persistReducer(persistConfig, rootReducer);
