import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {	//states default value will be null so until action is dispacthed after api call states value will stay null
	console.log(action);

	switch (action.type) {
	    case FETCH_USER:
	      return action.payload || false;	//if payload is empty string(which is a falsy value) return false
	    default:
	      return state;
	}
}