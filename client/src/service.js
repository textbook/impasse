import { get } from "./client";

export const getPassword = async (query = {}) => {
	const response = await get("/api", query);
	return response.password;
};
