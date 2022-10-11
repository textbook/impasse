export const get = async (url, params) => {
	const response = await fetch(`${url}?${new URLSearchParams(params)}`);
	const body = await response.json();
	if (response.ok) {
		return body;
	}
	throw body;
};
