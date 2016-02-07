import axios from 'axios';

export const FETCH_PROGRAMS = 'FETCH_PROGRAMS';
export const CREATE_PROGRAM = 'CREATE_PROGRAM';

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