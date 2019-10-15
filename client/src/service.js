import { get } from "./client";

export const getMessage = async () => {
	const response = await get("/api");
	return response.message;
};
