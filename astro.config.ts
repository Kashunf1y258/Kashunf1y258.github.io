// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://kashunf1y258.github.io',
	base: '/',
	integrations: [mdx(), sitemap()],
	vite: {
		build: {
			rollupOptions: {
				external: ['/pagefind/pagefind.js']
			}
		}
	}
});
