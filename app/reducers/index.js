import { combineReducers } from 'redux';
import ProgramsReducer from './ProgramsReducer';
import ExercisesReducer from './ExercisesReducer';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: FormReducer,
	programs: ProgramsReducer,
	exercises: ExercisesReducer
});

export default rootReducer;