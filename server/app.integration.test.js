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

	it("rejects inappropriate configuration", async () => {
		await request(app)
			.get("/api").query({ min: 10, max: 5 })
			.expect(400, { error: "Maximum length cannot be less than minimum length" });
	});
});
