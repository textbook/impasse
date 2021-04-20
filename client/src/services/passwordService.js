import { get } from "./apiClient";

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
		return await get("/api", query);
	} catch ({ errors }) {
		if (errors) {
			throw {
				descriptions: errors.map(({ description }) => description),
				fields: summariseFields(errors),
			};
		}
		throw { descriptions: ["Something went wrong"], fields: [] };
	}
};
