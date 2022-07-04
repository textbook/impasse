module.exports = {
	moduleNameMapper: {
		"\\.(png|svg|jpe?g|gif|s[ac]ss)$": "<rootDir>/__mocks__/fileMock.js",
	},
	setupFilesAfterEnv: [
		"<rootDir>/src/setupTests.js",
	],
	testEnvironment: "jsdom",
};
