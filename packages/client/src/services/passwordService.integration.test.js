import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { getPassword } from "./passwordService";

describe("service integration", () => {
	const password = "opensesame";

	const server = setupServer(
		http.get("/api", () => {
			return HttpResponse.json({ password });
		}),
	);

	beforeAll(() => server.listen());

	beforeEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it("makes a simple request", async () => {
		const result = await getPassword();

		expect(result).toEqual({ password });
	});

	it("makes a request with query parameters", async () => {
		server.use(http.get("/api", ({ request }) => {
			const { searchParams } = new URL(request.url);
			expect(searchParams.get("min")).toBe("7");
			expect(searchParams.get("max")).toBe("7");
			return HttpResponse.json({ password });
		}));

		const result = await getPassword({ min: 7, max: 7 });

		expect(result).toEqual({ password });
	});

	it("exposes error messages on failure", async () => {
		const errors = [
			{ description: "pranged it", fields: ["foo"] },
			{ description: "also an issue", fields: ["bar"] },
		];
		server.use(http.get("/api", () => {
			return HttpResponse.json({ errors }, { status: 400 });
		}));

		await expect(getPassword()).rejects.toMatchObject({
			descriptions: expect.arrayContaining(["pranged it", "also an issue"]),
			fields: expect.arrayContaining(["foo", "bar"]),
		});
	});

	it("tolerates 5xx errors", async () => {
		server.use(http.get("/api", () => {
			return new HttpResponse(null, { status: 500 });
		}));

		await expect(getPassword()).rejects.toEqual({ descriptions: ["Something went wrong"], fields: [] });
	});
});
