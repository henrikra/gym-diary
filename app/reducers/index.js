import { combineReducers } from 'redux';
import ProgramsReducer from './ProgramsReducer';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: FormReducer,
	programs: ProgramsReducer
});

export default rootReducer;