import axios from "axios";

export const get = (url, params) => axios
	.get(url, { params })
	.then((res) => res.data)
	.catch((error) => {
		throw error.response.data;
	});
