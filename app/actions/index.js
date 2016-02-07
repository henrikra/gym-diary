import axios from 'axios';

export const FETCH_PROGRAMS = 'FETCH_PROGRAMS';

const ROOT_URL = '/api/';

export function fetchPrograms(trainerId) {
	const request = axios.get(`${ROOT_URL}programs/${trainerId}`);
	return {
		type: FETCH_PROGRAMS,
		payload: request
	};
}