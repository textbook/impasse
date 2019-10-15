import request from "supertest";

import app from "./app";
import password from "./password";
import getWords from "./words";

jest.mock("./words");
jest.mock("./password");

describe("app", () => {
	it("serves from the (missing) static directory", async () => {
		await request(app).get("/").expect(404);
	});

	describe("/api", () => {
		it("exposes the password", async () => {
			const words = ["extremely", "excellent"];
			const fakePassword = "iamasecret";
			getWords.mockResolvedValue(words);
			password.mockReturnValue(fakePassword);

			await request(app).get("/api").expect(200, { password: fakePassword });
			expect(password).toHaveBeenCalledWith(words);
		});

		it("returns 500 on error", async () => {
			getWords.mockRejectedValue("bailing");
			await request(app).get("/api").expect(500);
		});
	});
});
