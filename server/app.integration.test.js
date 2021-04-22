import { rest } from "msw";
import { setupServer } from "msw/node";
import request from "supertest";

import app from "./app";

const server = setupServer(
	rest.get("https://api.pwnedpasswords.com/range/:range", (req, res, ctx) => {
		return res(ctx.status(200), ctx.text(""));
	}),
);

describe("password API", () => {
	beforeAll(() => server.listen());

	beforeEach(() => server.resetHandlers());

	afterAll(() => server.close());

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

	it("returns 500 on unexpected errors", async () => {
		jest.resetModules();
		jest.doMock("./password/password", () => ({ __esModule: true, default: () => Promise.reject("oh no!") }));
		const module = await import("./app");

		await request(module.default).get("/api").expect(500);
	});

	it("returns 400 on expected errors", async () => {
		jest.resetModules();
		jest.doMock("./password/password", () => ({ __esModule: true, default: () => Promise.reject(new Error("too few options...")) }));
		const module = await import("./app");

		await request(module.default)
			.get("/api")
			.expect(400)
			.then(({ body: { errors: [error] } }) => {
				expect(error.description).toBe("There are not enough words in the current configuration");
				expect(error.fields).toContain("max");
				expect(error.fields).toContain("min");
			});
	});

	it("exposes whether a password has been pwned", async () => {
		const password = "password123";
		server.use(rest.get("https://api.pwnedpasswords.com/range/CBFDA", (req, res, ctx) => {
			return res(ctx.status(200), ctx.text("C6008F9CAB4083784CBD1874F76618D2A97:13"));
		}));
		jest.resetModules();
		jest.doMock("./password/password", () => {
			return ({ __esModule: true, default: () => Promise.resolve(password) });
		});
		const module = await import("./app");

		await request(module.default).get("/api").expect(200, { password, pwned: true });
	});
});
