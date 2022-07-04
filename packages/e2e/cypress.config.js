const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000",
		// eslint-disable-next-line no-unused-vars
		setupNodeEvents(on, config) {
			on("task", {
				log(message) {
					console.log(message);
					return null;
				},
				table(message) {
					console.table(message);
					return null;
				},
			});
		},
		specPattern: "integration/**/*.test.js",
		supportFile: "support/index.js",
	},
	fixturesFolder: "fixtures",
	screenshotsFolder: "screenshots",
	video: false,
	videosFolder: "videos",
});
