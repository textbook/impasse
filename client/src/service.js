import { get } from "./client";

export const getPassword = async () => {
	const response = await get("/api");
	return response.password;
};
