import { FETCH_PROGRAMS, ACTIVATE_PROGRAM } from '../actions';

const INITIAL_STATE = { all: [], active: null };

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_PROGRAMS:
			return { ...state, all: action.payload.data };
		case ACTIVATE_PROGRAM:
			return { ...state, active: action.payload };
		default:
			return state;
	}
}