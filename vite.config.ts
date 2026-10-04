import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/good-flag-great-flag/",
	build: {
		rollupOptions: {
			input: {
				index: resolve(import.meta.dirname, "index.html"),
				quiz: resolve(import.meta.dirname, "quiz.html"),
				watch: resolve(import.meta.dirname, "watch.html"),
				about: resolve(import.meta.dirname, "about.html"),
			},
		},
	},
});
