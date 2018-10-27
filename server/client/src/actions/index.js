import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {	//action creator is a function that returns an action like this one
  const res = await axios.get('/api/current_user');	//goes to server because of proxy in package.json of client

  dispatch({ type: FETCH_USER, payload: res.data });	//redux thunk looks for a function inside your action creator function and passes the dispacth function as a parameter to it which can be called
};


export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
