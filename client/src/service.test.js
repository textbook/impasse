import { get } from "./client";
import { getPassword } from "./service";

jest.mock("./client");

describe("service", () => {
	describe("getPassword", ()  => {
		const password = "Take me to your leader";

		beforeEach(() => {
			get.mockResolvedValue({ password });
		});

		it("makes a request", async () => {
			await getPassword();

			expect(get).toHaveBeenCalledWith("/api");
		});

		it("exposes the data", async () => {
			await expect(getPassword()).resolves.toEqual(password);
		});
	});
});
