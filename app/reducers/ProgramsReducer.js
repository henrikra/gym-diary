import { FETCH_PROGRAMS } from '../actions';

const INITIAL_STATE = { all: [], active: null };

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_PROGRAMS:
			return { ...state, all: action.payload.data }
		default:
			return state;
	}
}