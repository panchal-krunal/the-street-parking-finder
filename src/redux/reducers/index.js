import {combineReducers} from 'redux';
import commonReducer from './commonReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
  commonReducer,
});

export default rootReducer;
