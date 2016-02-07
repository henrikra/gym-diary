import { FETCH_EXERCISES } from '../actions';

const INITIAL_STATE = { all: [], active: null };

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_EXERCISES:
			return { ...state, all: action.payload.data }
		default:
			return state;
	}
}