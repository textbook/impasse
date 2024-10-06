import { jest } from "@jest/globals";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import request from "supertest";

import app from "../src/app";

const server = setupServer(
	http.get("https://api.pwnedpasswords.com/range/:range", () => {
		return HttpResponse.text("");
	}),
);

describe("password API", () => {
	beforeAll(() => server.listen({
		onUnhandledRequest: ({ url }, print) => {
			if (!new URL(url).pathname.startsWith("/api")) {
				print.error();
			}
		},
	}));

	beforeEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it("exposes the number of words available when creating the password", async () => {
		await request(app)
			.get("/api").query({ min: 27, max: 28 })
			.expect(200)
			.then((res) => {
				expect(res.body.words).toBe(3);
			});
	});

	it("allows the password word length to be configured", async () => {
		await request(app)
			.get("/api").query({ min: 7, max: 7 })
			.expect(200).then((res) => {
				expect(res.body.password).toMatch(/[a-z]{7}\d{2}[a-z]{7}[!@#$%^&*]/);
				expect(res.body.pwned).toBe(false);
			});
	});

	it("allows the password number length to be configured", async () => {
		await request(app)
			.get("/api").query({ digits: 3 })
			.expect(200).then((res) => {
				expect(res.body.password).toMatch(/[a-z]{8,10}\d{3}[a-z]{8,10}[!@#$%^&*]/);
				expect(res.body.pwned).toBe(false);
			});
	});

	it("rejects inappropriate word length configuration", async () => {
		await request(app)
			.get("/api").query({ min: 10, max: 5 })
			.expect(400)
			.then(({ body: { errors: [error] } }) => {
				expect(error.description).toBe("Maximum length cannot be less than minimum length");
				expect(error.fields).toContain("max");
				expect(error.fields).toContain("min");
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

	it("returns 400 on expected errors", async () => {
		await request(app)
			.get("/api").query({ min: 100, max: 100 })
			.expect(400)
			.then(({ body: { errors: [error] } }) => {
				expect(error.description).toBe("There are not enough words in the current configuration");
				expect(error.fields).toContain("max");
				expect(error.fields).toContain("min");
			});
	});

	it("returns 500 on unexpected errors", async () => {
		jest.resetModules();
		jest.unstable_mockModule("../src/password/password", () => ({
			default: () => {
				throw new Error("oh no!");
			},
		}));
		const module = await import("../src/app");

		await request(module.default).get("/api").expect(500);
	});

	it("exposes whether a password has been pwned", async () => {
		const password = "password123";
		server.use(http.get("https://api.pwnedpasswords.com/range/CBFDA", () => {
			return HttpResponse.text("C6008F9CAB4083784CBD1874F76618D2A97:13");
		}));
		jest.resetModules();
		jest.unstable_mockModule("../src/password/password", () => ({ default: () => password }));
		const module = await import("../src/app");

		await request(module.default)
			.get("/api")
			.expect(200)
			.then((res) => {
				expect(res.body).toMatchObject({ password, pwned: true });
			});
	});
});
