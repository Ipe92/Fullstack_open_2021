import axios from "axios";

// wanha
// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "https://immense-stream-60921.herokuapp.com/api/notes";

const getAll2 = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const getAll = () => {
	const request = axios.get(baseUrl);
	const nonExisting = {
		id: 10000,
		content: "This note is not saved to server",
		data: "2019-05-30T17:30:31.098Z",
		important: true,
	};
	return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export default { getAll, create, update };
