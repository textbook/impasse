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
		specPattern: "e2e/integration/**/*.test.js",
		supportFile: "e2e/support/index.js",
	},
	fixturesFolder: "e2e/fixtures",
	screenshotsFolder: "e2e/screenshots",
	video: false,
	videosFolder: "e2e/videos",
});
