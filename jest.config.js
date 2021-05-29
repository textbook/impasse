module.exports = {
	projects: [
		{
			displayName: "client",
			moduleNameMapper: {
				"\\.(png|svg|jpe?g|gif|s[ac]ss)$": "<rootDir>/__mocks__/fileMock.js",
			},
			setupFilesAfterEnv: [
				"<rootDir>/client/src/setupTests.js",
			],
			testEnvironment: "jsdom",
			testMatch: [
				"<rootDir>/client/**/*.test.js",
			],
		},
		{
			displayName: "server",
			testEnvironment: "node",
			testMatch: [
				"<rootDir>/server/**/*.test.js",
			],
		},
	],
	reporters: [
		"default",
		["jest-junit", { outputDirectory: "./reports/jest" }],
	],
	testPathIgnorePatterns: [
		"<rootDir>/e2e/",
		"<rootDir>/node_modules/",
	],
};
