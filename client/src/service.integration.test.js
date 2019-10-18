import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";
import nock from "nock";

import { getPassword } from "./service";

const baseUrl = "http://example.org";

axios.defaults.adapter = httpAdapter;
axios.defaults.baseURL = baseUrl;

describe("service integration", () => {
	const password = "opensesame";

	it("makes a simple request", async () => {
		const scope = nock(baseUrl)
			.get("/api")
			.reply(200, { password });

		const result = await getPassword();

		expect(result).toBe(password);
		scope.done();
	});

	it("makes a request with query parameters", async () => {
		const scope = nock(baseUrl)
			.get("/api")
			.query({ min: 7, max: 7 })
			.reply(200, { password });

		const result = await getPassword({ min: 7, max: 7 });

		expect(result).toBe(password);
		scope.done();
	});

	it("exposes error messages on failure", async () => {
		const errors = [
			{ description: "pranged it", fields: ["foo"] },
			{ description: "also an issue", fields: ["bar"] },
		];
		const scope = nock(baseUrl)
			.get("/api")
			.reply(400, { errors });

		await getPassword().catch(({ descriptions, fields }) => {
			expect(fields).toContain("foo");
			expect(fields).toContain("bar");
			expect(descriptions).toContain("pranged it");
			expect(descriptions).toContain("also an issue");
			scope.done();
		});
	});
});
