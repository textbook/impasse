import { rest } from "msw";
import { setupServer } from "msw/node";

import { getPassword } from "./passwordService";

describe("service integration", () => {
	const password = "opensesame";

	const server = setupServer(
		rest.get("/api", (req, res, ctx) => {
			return res(ctx.status(200), ctx.json({ password }));
		})
	);

	beforeAll(() => server.listen());

	beforeEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it("makes a simple request", async () => {
		const result = await getPassword();

		expect(result).toEqual({ password });
	});

	it("makes a request with query parameters", async () => {
		server.use(rest.get("/api", (req, res, ctx) => {
			expect(req.url.searchParams.get("min")).toBe("7");
			expect(req.url.searchParams.get("max")).toBe("7");
			return res(ctx.status(200), ctx.json({ password }));
		}));

		const result = await getPassword({ min: 7, max: 7 });

		expect(result).toEqual({ password });
	});

	it("exposes error messages on failure", async () => {
		const errors = [
			{ description: "pranged it", fields: ["foo"] },
			{ description: "also an issue", fields: ["bar"] },
		];
		server.use(rest.get("/api", (req, res, ctx) => {
			return res(ctx.status(400), ctx.json({ errors }));
		}));

		await getPassword().catch(({ descriptions, fields }) => {
			expect(fields).toContain("foo");
			expect(fields).toContain("bar");
			expect(descriptions).toContain("pranged it");
			expect(descriptions).toContain("also an issue");
		});
	});

	it("tolerates 5xx errors", async () => {
		server.use(rest.get("/api", (req, res, ctx) => {
			return res(ctx.status(500));
		}));

		await getPassword().catch(({ descriptions, fields }) => {
			expect(fields).toEqual([]);
			expect(descriptions).toContain("Something went wrong");
		});
	});
});
