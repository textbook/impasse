import { get } from "./client";

const summariseFields = (errors) => {
	const fields = [];
	(errors || []).forEach((error) => {
		error.fields.forEach((field) => {
			if (!fields.includes(field)) {
				fields.push(field);
			}
		});
	});
	return fields;
};

export const getPassword = async (query = {}) => {
	try {
		const response = await get("/api", query);
		return response.password;
	} catch (errors) {
		throw {
			descriptions: errors.map(({ description }) => description),
			fields: summariseFields(errors),
		};
	}
};
