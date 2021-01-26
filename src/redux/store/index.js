import { createStore, combineReducers } from 'redux';
import { setUserInfoReducer } from '../reducers/setUserInfoReducer';

const rootReducer = combineReducers({ setUserInfo: setUserInfoReducer });

export default createStore(rootReducer);
