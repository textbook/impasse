import request from "supertest";

import app from "./app";

describe("password API", () => {
	it("allows the password word length to be configured", async () => {
		await request(app)
			.get("/api").query({ min: 7, max: 7 })
			.expect(200).then((res) => {
				expect(res.body.password).toMatch(/[a-z]{7}\d{2}[a-z]{7}[!@#$%^&*]/);
			});
	});

	it("allows the password number length to be configured", async () => {
		await request(app)
			.get("/api").query({ digits: 3 })
			.expect(200).then((res) => {
				expect(res.body.password).toMatch(/[a-z]{8,10}\d{3}[a-z]{8,10}[!@#$%^&*]/);
			});
	});

	it("rejects inappropriate word length configuration", async () => {
		await request(app)
			.get("/api").query({ min: 10, max: 5 })
			.expect(400, {
				errors: [
					{ description: "Maximum length cannot be less than minimum length", fields: ["max", "min"] },
				],
			});
	});

	it("rejects inappropriate digit configuration", async () => {
		await request(app)
			.get("/api").query({ digits: -2 })
			.expect(400, {
				errors: [
					{ description: "Number of digits must be positive", fields: ["digits"] },
				],
			});
	});

	it("returns 500 on unexpected errors", async () => {
		jest.resetModules();
		jest.mock("./password/service", () => ({ getPassword: jest.fn().mockRejectedValue("oh no!") }));
		const module = await import("./app");

		await request(module.default).get("/api").expect(500);
	});
});
