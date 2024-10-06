import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

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
});
