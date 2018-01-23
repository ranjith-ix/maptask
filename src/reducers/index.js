import { combineReducers } from 'redux';
import LReducer from './LReducer';

export default combineReducers({
    loc: LReducer
});