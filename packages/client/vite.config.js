import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../../dist/static",
	},
	plugins: [react()],
	server: {
		port: parseInt(process.env.PORT ?? "3000", 10),
		proxy: {
			"/api": "http://localhost:3100",
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: [
			"./src/setupTests.js",
		],
	},
});
