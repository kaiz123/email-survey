import { combineReducers } from 'redux';
//import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
// import surveysReducer from './surveysReducer';

export default combineReducers({ //any action dispatched is passed to all the reducers
  auth: authReducer,
  // form: reduxForm,
  // surveys: surveysReducer
});