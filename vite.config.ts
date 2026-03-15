import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/good-flag-great-flag/",
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, "index.html"),
				quiz: resolve(__dirname, "quiz.html"),
				watch: resolve(__dirname, "watch.html"),
				about: resolve(__dirname, "about.html"),
			},
		},
	},
});
