import { combineReducers } from 'redux';
import ProgramsReducer from './ProgramsReducer';

const rootReducer = combineReducers({
	programs: ProgramsReducer
});

export default rootReducer;