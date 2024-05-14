import sendRequest from "./send-request";
const BASE_URL = '/api/bikes';

export async function add(bike) {
  return sendRequest(BASE_URL, 'POST',  bike );
}

export async function getAll() {
  return sendRequest(BASE_URL)
}