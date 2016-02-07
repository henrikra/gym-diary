import axios from 'axios';

export const FETCH_PROGRAMS = 'FETCH_PROGRAMS';
export const CREATE_PROGRAM = 'CREATE_PROGRAM';
export const ACTIVATE_PROGRAM = 'ACTIVATE_PROGRAM';
export const FETCH_EXERCISES = 'FETCH_EXERCISES';
export const CREATE_EXERCISES = 'CREATE_EXERCISES';

const ROOT_URL = '/api/';

export function fetchPrograms(trainerId) {
	const request = axios.get(`${ROOT_URL}programs/${trainerId}`);
	return {
		type: FETCH_PROGRAMS,
		payload: request
	};
}

export function createProgram(data) {
	const request = axios.post(`${ROOT_URL}programs`, data);
	return {
		type: CREATE_PROGRAM,
		payload: request
	};
}

export function activateProgram(programId) {
	return {
		type: ACTIVATE_PROGRAM,
		payload: programId
	};
}

export function fetchExercises(programId) {
	const request = axios.get(`${ROOT_URL}exercises/${programId}`);
	return {
		type: FETCH_EXERCISES,
		payload: request
	};
}

export function createExercise(data) {
	const request = axios.post(`${ROOT_URL}exercises`, data);
	return {
		type: CREATE_EXERCISES,
		payload: request
	};
}