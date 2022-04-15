const { merge } = require("webpack-merge");

const common = require("./common.config");

module.exports = merge(common, {
	devtool: "inline-source-map",
	devServer: {
		port: 3000,
		proxy: [
			{
				context: ["/api", "/docs"],
				target: "http://localhost:3100",
			},
		],
	},
	mode: "development",
});
